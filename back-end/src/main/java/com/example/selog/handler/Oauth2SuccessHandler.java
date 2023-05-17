package com.example.selog.handler;

import com.example.selog.dto.member.TokenDto;
import com.example.selog.dto.oauth.OAuthAttributes;
import com.example.selog.entity.Member;
import com.example.selog.entity.Room;
import com.example.selog.jwt.TokenProvider;
import com.example.selog.repository.MemberRepository;
import com.example.selog.repository.RoomRepository;
import com.example.selog.service.GitHubService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Optional;

@Slf4j
@RequiredArgsConstructor
@Component
public class Oauth2SuccessHandler implements AuthenticationSuccessHandler {

    private final TokenProvider jwtTokenProvider;
    private final MemberRepository memberRepository;
    private final GitHubService gitHubService;
    private final AuthenticationManagerBuilder authenticationManagerBuilder;
    @Value("${social.login.redirectUrl}")
    private String redirectUrl;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request,
                                        HttpServletResponse response,
                                        Authentication authentication) throws IOException, ServletException {

        OAuthAttributes oAuthAttributes = (OAuthAttributes) authentication.getPrincipal();

        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(oAuthAttributes.getEmail(),"1234");

        log.info(authenticationToken.toString());

        Authentication auth = authenticationManagerBuilder.getObject().authenticate(authenticationToken);

        log.info("accessToken : {}",oAuthAttributes.getAccessToken());
        log.info("social login user email: {} ",oAuthAttributes.getEmail());

        Optional<Member> result = memberRepository.findByEmail(oAuthAttributes.getEmail());
        Member member = result.get();
        Long userId = member.getUserId();
        int newUser = 0;


        TokenDto tokenDto;
        //새로 등록한 유저
        if(member.getRoom() == null) {
            newUser = 1;
            tokenDto = jwtTokenProvider.createTokenDto(auth);
            member.updateRefreshToken(tokenDto.getRefreshToken());
            memberRepository.save(member);
        }else if(jwtTokenProvider.validateToken(member.getRefreshToken())){
            tokenDto = jwtTokenProvider.createAccessToken(auth, member.getRefreshToken());
        }else{
            //refresh가 만료되었다면
            tokenDto = jwtTokenProvider.createTokenDto(auth);
            member.updateRefreshToken(tokenDto.getRefreshToken());
            memberRepository.save(member);
        }

        //github등록이 된경우만
        if(member.getGithubToken() != null) {
            gitHubService.synchronize(member.getUserId());
        }

        StringBuilder sb = new StringBuilder();
        sb.append(redirectUrl).append("?refreshToken=")
                .append(tokenDto.getRefreshToken())
                .append("&accessToken=")
                .append(tokenDto.getAccessToken())
                .append("&userId=")
                .append(userId)
                .append("&newUser=")
                .append(newUser);

        response.sendRedirect(sb.toString());

    }
}
