package com.example.selog.service;

import com.example.selog.dto.oauth.OAuthAttributes;
import com.example.selog.entity.Member;
import com.example.selog.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.convert.converter.Converter;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
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


import java.util.Map;
import java.util.Optional;

@Slf4j
@RequiredArgsConstructor
@Service
public class CustomOauth2UserService implements OAuth2UserService<OAuth2UserRequest, OAuth2User> {

    private final MemberRepository memberRepository;
    private final Converter<OAuth2UserRequest, RequestEntity<?>> requestEntityConverter;

    @Override
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
        save(attributes);

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

    private void save(OAuthAttributes attributes) {

        String email = attributes.getEmail();
        Optional<Member> member = memberRepository.findByEmail(email);

        //기존에 저장된 것이 없었다면
        if(!member.isPresent()) {
                memberRepository.save(
                    Member
                    .builder()
                    .email(attributes.getEmail()).nickname(attributes.getName()).points(0)
                    .build());
        }
    }
}
