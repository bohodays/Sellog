package com.example.selog.service;

import com.example.selog.dto.oauth.OAuthAttributes;
import com.example.selog.entity.Member;
import com.example.selog.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserService;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Slf4j
@RequiredArgsConstructor
@Service
public class CustomOauth2UserService implements OAuth2UserService<OAuth2UserRequest, OAuth2User> {

    private final MemberRepository memberRepository;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {

        OAuth2UserService<OAuth2UserRequest, OAuth2User> delegate = new DefaultOAuth2UserService();
        OAuth2User oAuth2User = delegate.loadUser(userRequest);

        String registrationId = userRequest.getClientRegistration().getRegistrationId();

        String userNameAttributeName = userRequest.getClientRegistration().getProviderDetails()
                .getUserInfoEndpoint().getUserNameAttributeName();

        OAuthAttributes attributes = OAuthAttributes.of(userRequest.getAccessToken(), registrationId, userNameAttributeName,
                oAuth2User.getAttributes());

        save(attributes);

        return attributes;
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
