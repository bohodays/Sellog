package com.example.selog.dto.oauth;

import com.example.selog.entity.Member;
import lombok.Builder;
import lombok.Getter;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.oauth2.core.OAuth2AccessToken;
import org.springframework.security.oauth2.core.user.OAuth2User;

import java.util.Collection;
import java.util.Map;

@Getter
@Slf4j
public class OAuthAttributes implements OAuth2User, Authentication {

    private Map<String, Object> attributes;
    private String registrationId;
    private String nameAttributeKey;
    private String name;
    private String email;
    private String accessToken;

    @Builder
    public OAuthAttributes(Map<String, Object> attributes, String nameAttributeKey, String name, String email, String registrationId, String accessToken) {
        this.attributes = attributes;
        this.registrationId = registrationId;
        this.nameAttributeKey = nameAttributeKey;
        this.name = name;
        this.email = email;
        this.accessToken = accessToken;
    }

    public static OAuthAttributes of(OAuth2AccessToken accessToken, String registrationId, String userNameAttributeName, Map<String, Object> attributes) {
        if(registrationId.equals("github")){
            return ofGithub(accessToken.getTokenValue(), userNameAttributeName, attributes);
        }
        log.info(userNameAttributeName);
        return ofGithub(accessToken.getTokenValue(), userNameAttributeName, attributes);
    }

    private static OAuthAttributes ofGithub(String accessToken, String userNameAttributeName, Map<String, Object> attributes) {
        log.info(attributes.toString());
        return OAuthAttributes.builder().name((String) attributes.get("name"))
                .email((String) attributes.get("login"))
                .accessToken(accessToken)
                .attributes(attributes)
                .nameAttributeKey(userNameAttributeName)
                .build();
    }
    @Override
    public Map<String, Object> getAttribute(String name) {
        return attributes;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return null;
    }

    @Override
    public Object getCredentials() {
        return null;
    }

    @Override
    public Object getDetails() {
        return null;
    }

    @Override
    public Object getPrincipal() {
        return this;
    }

    @Override
    public boolean isAuthenticated() {
        return false;
    }

    @Override
    public void setAuthenticated(boolean isAuthenticated) throws IllegalArgumentException {

    }
}
