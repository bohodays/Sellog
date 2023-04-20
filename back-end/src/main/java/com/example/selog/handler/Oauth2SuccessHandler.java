package com.example.selog.handler;

import com.example.selog.dto.oauth.OAuthAttributes;
import com.example.selog.entity.Member;
import com.example.selog.repository.MemberRepository;
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

    private final MemberRepository memberRepository;
    private final AuthenticationManagerBuilder authenticationManagerBuilder;
    @Value("${social.login.redirectUrl}")
    private String redirectUrl;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request,
                                        HttpServletResponse response,
                                        Authentication authentication) throws IOException, ServletException {

        OAuthAttributes oAuthAttributes = (OAuthAttributes) authentication.getPrincipal();

        log.info("accessToken : {}",oAuthAttributes.getAccessToken());
        log.info("social login user email: {} ",oAuthAttributes.getEmail());

        Optional<Member> result = memberRepository.findByEmail(oAuthAttributes.getEmail());
        Member member = result.get();
        Long userId = member.getUserId();

        StringBuilder sb = new StringBuilder();
        sb.append(redirectUrl)
                .append("&userId=")
                .append(userId);

//        response.sendRedirect(sb.toString());

    }
}
