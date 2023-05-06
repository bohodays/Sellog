package com.example.selog.service;

import com.example.selog.dto.oauth.OAuthAttributes;
import com.example.selog.entity.Authority;
import com.example.selog.entity.Member;
import com.example.selog.repository.MemberRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.convert.converter.Converter;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserService;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.OAuth2Error;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;
import org.springframework.core.ParameterizedTypeReference;


import javax.transaction.Transactional;
import java.util.Map;
import java.util.Optional;

@Slf4j
@Service
public class CustomOauth2UserService implements OAuth2UserService<OAuth2UserRequest, OAuth2User> {

    private final MemberRepository memberRepository;
    private final Converter<OAuth2UserRequest, RequestEntity<?>> requestEntityConverter;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public CustomOauth2UserService(MemberRepository memberRepository, Converter<OAuth2UserRequest, RequestEntity<?>> requestEntityConverter, PasswordEncoder passwordEncoder) {
        this.memberRepository = memberRepository;
        this.requestEntityConverter = requestEntityConverter;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    @Transactional
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {

        Map<String, Object> userAttributes = null;
        if(userRequest.getClientRegistration().getRegistrationId().equals("tistory")){
            RequestEntity<?> request = this.requestEntityConverter.convert(userRequest);
            ResponseEntity<Map<String, Object>> response = getResponse(userRequest, request);
            log.info(response.getBody().toString());
            userAttributes = (Map<String, Object>) ((Map<String, Object>) response.getBody().get("tistory")).get("item");
        }else{
            OAuth2UserService<OAuth2UserRequest, OAuth2User> delegate = new DefaultOAuth2UserService();
            OAuth2User oAuth2User = delegate.loadUser(userRequest);
            userAttributes = oAuth2User.getAttributes();
        }

        String registrationId = userRequest.getClientRegistration().getRegistrationId();

        String userNameAttributeName = userRequest.getClientRegistration().getProviderDetails()
                .getUserInfoEndpoint().getUserNameAttributeName();

        OAuthAttributes attributes = OAuthAttributes.of(userRequest.getAccessToken(), registrationId, userNameAttributeName,
                userAttributes);
        save(attributes, userRequest);

        return attributes;
    }

    private ResponseEntity<Map<String, Object>> getResponse(OAuth2UserRequest userRequest, RequestEntity<?> request) {
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<Map<String, Object>> responseEntity = null;
        try {
            ParameterizedTypeReference<Map<String, Object>> responseType = new ParameterizedTypeReference<Map<String, Object>>() {};
            responseEntity = restTemplate.exchange(request, responseType);
        } catch (RestClientException ex) {
            throw new OAuth2AuthenticationException(new OAuth2Error("invalid_request", "잘못된 요청", null), ex);
        }
        return responseEntity;
    }

    private void save(OAuthAttributes attributes, OAuth2UserRequest userRequest) {
        Optional<Member> optionalMember = memberRepository.findByEmail(attributes.getEmail());
        Member member;
        if (optionalMember.isPresent()) {
            member = optionalMember.get();
        } else {
            member = Member.builder()
                    .email(attributes.getEmail())
                    .nickname(attributes.getName())
                    .img("1")
                    .points(0)
                    .githubTarget("1-1")
                    .bojTarget("1-1")
                    .blogTarget("7-1")
                    .csTarget(false)
                    .feedTarget(false)
                    .authority(Authority.ROLE_USER)
                    .password(passwordEncoder.encode("1234"))
                    .build();
        }

        if(userRequest.getClientRegistration().getRegistrationId().equals("tistory")){
            member.updateTistoryToken(userRequest.getAccessToken().getTokenValue());
        }else if(userRequest.getClientRegistration().getRegistrationId().equals("github")){
            member.updateGithubToken(userRequest.getAccessToken().getTokenValue());
            if(!optionalMember.isPresent()) member.updateImg(attributes.getAttributes().get("avatar_url").toString());
        }
        memberRepository.save(member);
    }
}
