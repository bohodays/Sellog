package com.example.selog.controller;

import com.example.selog.dto.member.MemberResponseDto;
import com.example.selog.dto.member.TokenDto;
import com.example.selog.dto.member.TokenRequestDto;
import com.example.selog.exception.CustomException;
import com.example.selog.exception.error.ErrorCode;
import com.example.selog.response.ErrorResponse;
import com.example.selog.response.SuccessResponse;
import com.example.selog.service.MemberService;
import com.example.selog.util.SecurityUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/user")
public class MemberController {
    private final MemberService memberService;

    @GetMapping("/{userId}")
    public ResponseEntity<?> findMemberInfoById(@PathVariable String userId) {
        try{
            MemberResponseDto memberResponseDto = memberService.findMemberInfoByUserId(Long.valueOf(userId));
            return new ResponseEntity<>(new SuccessResponse(memberResponseDto), HttpStatus.OK);
        } catch(CustomException e){
            return new ResponseEntity<>(new ErrorResponse(e.getErrorCode().getHttpStatus(),e.getMessage()), e.getErrorCode().getHttpStatus());
        } catch (Exception e){
            return new ResponseEntity<>(new ErrorResponse(ErrorCode.INTERNAL_SERVER_ERROR),HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/me")
    public ResponseEntity<?> findMemberInfoById() {
        try{
            MemberResponseDto memberResponseDto = memberService.findMemberInfoByUserId(SecurityUtil.getCurrentMemberId());
            return new ResponseEntity<>(new SuccessResponse(memberResponseDto), HttpStatus.OK);
        } catch(CustomException e){
            return new ResponseEntity<>(new ErrorResponse(e.getErrorCode().getHttpStatus(),e.getMessage()), e.getErrorCode().getHttpStatus());
        } catch (Exception e){
            return new ResponseEntity<>(new ErrorResponse(ErrorCode.INTERNAL_SERVER_ERROR),HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/access") // 토큰 재발급
    public ResponseEntity<?> reissue(@RequestBody TokenRequestDto tokenRequestDto) {
        try{
            TokenDto tokenDto = memberService.reissue(tokenRequestDto);
            return new ResponseEntity<>(new SuccessResponse(tokenDto), HttpStatus.OK);
        } catch(CustomException e){
            return new ResponseEntity<>(new ErrorResponse(e.getErrorCode().getHttpStatus(),e.getMessage()), e.getErrorCode().getHttpStatus());
        } catch (Exception e){
            return new ResponseEntity<>(new ErrorResponse(ErrorCode.INTERNAL_SERVER_ERROR),HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
