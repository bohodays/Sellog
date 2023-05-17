package com.example.selog.service;

import com.example.selog.dto.member.*;
import com.example.selog.entity.Member;
import com.example.selog.entity.Room;
import com.example.selog.exception.CustomException;
import com.example.selog.exception.error.ErrorCode;
import com.example.selog.jwt.TokenProvider;
import com.example.selog.repository.MemberRepository;
import com.example.selog.repository.RoomRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
public class MemberService {
    private final MemberRepository memberRepository;
    private final TokenProvider tokenProvider;
    private final RoomRepository roomRepository;
    private final S3Uploader s3Uploader;

    @Transactional(readOnly = true)
    public MemberDto findMemberInfoByUserId(Long userId) {
        return memberRepository.findById(userId)
                .map(MemberDto::of)
                .orElseThrow(() -> new CustomException(ErrorCode.NO_USER));
    }

    @Transactional
    public TokenDto reissue(TokenRequestDto tokenRequestDto) {
        TokenDto tokenDto = null;
        Member member = null;

        if (tokenProvider.validateToken(tokenRequestDto.getAccessToken())) {
            Authentication authentication = tokenProvider.getAuthentication(tokenRequestDto.getAccessToken());
            member = memberRepository.findById(Long.parseLong(authentication.getName()))
                    .orElseThrow(() -> new CustomException(ErrorCode.NO_LOGIN));
//            if (!member.getRefreshToken().equals(tokenRequestDto.getRefreshToken())) {
//                throw new CustomException(ErrorCode.NO_USER);
//            }
            tokenDto = tokenProvider.createTokenDto(authentication);
        }
        else {
            if (!tokenProvider.validateToken(tokenRequestDto.getRefreshToken())) {
                throw new CustomException(ErrorCode.NO_TOKEN);
            }
            member = memberRepository.findByRefreshToken(tokenRequestDto.getRefreshToken())
                    .orElseThrow(() -> new CustomException(ErrorCode.NO_USER));
            Authentication authentication = new UsernamePasswordAuthenticationToken(member.getUserId(), null, new ArrayList<>());
            tokenDto = tokenProvider.createTokenDto(authentication);
        }

        member.updateRefreshToken(tokenDto.getRefreshToken());
        memberRepository.save(member);

        return tokenDto;
    }

    @Transactional
    public MemberDto signup(SignUpDto signUpDto){
        Member member = memberRepository.findById(signUpDto.getUserId())
                .orElseThrow(() -> new CustomException(ErrorCode.NO_USER));

        Optional<Room> room = roomRepository.findByMember(member);
        if(room.isPresent()) new CustomException(ErrorCode.CONFLICT_ROOM);
        //방 생성
        roomRepository.save(Room
                .builder()
                .member(member)
                .build());

        member.updateSignUp(signUpDto);
        return MemberDto.of(memberRepository.save(member));
    }

    @Transactional
    public void logout(Long userId){
        Member member = memberRepository.findById(userId)
                .orElseThrow(() -> new CustomException(ErrorCode.NO_USER));
        member.updateRefreshToken(null);
        memberRepository.save(member);
    }

    @Transactional
    public void deleteMember(Long userId){
        memberRepository.delete(
                memberRepository.findById(userId).orElseThrow(() -> new CustomException(ErrorCode.NO_USER))
        );
    }

    @Transactional
    public void updateTarget(TargetDto targetDto, Long userId){
        Member member = memberRepository.findById(userId)
                .orElseThrow(() -> new CustomException(ErrorCode.NO_USER));
        member.updateTarget(targetDto);
        memberRepository.save(member);
    }

    @Transactional
    public MemberDto updateMember(MemberUpdateDto memberUpdateDto, MultipartFile multipartFile, Long userId) throws IOException {
        Member member = memberRepository.findById(userId)
                .orElseThrow(() -> new CustomException(ErrorCode.NO_USER));

        if(multipartFile !=null) {
            String storedFileName = s3Uploader.upload(multipartFile);
            member.updateImg(storedFileName);
        }

        member.updateMemberInfo(memberUpdateDto);
        return MemberDto.of(memberRepository.save(member));
    }
}
