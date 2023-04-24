package com.example.selog.handler;

import org.springframework.core.convert.converter.Converter;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.RequestEntity;
import org.springframework.security.oauth2.client.endpoint.OAuth2AuthorizationCodeGrantRequest;
import org.springframework.security.oauth2.client.endpoint.OAuth2AuthorizationCodeGrantRequestEntityConverter;
import org.springframework.security.oauth2.client.registration.ClientRegistration;
import org.springframework.security.oauth2.core.endpoint.OAuth2ParameterNames;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;


public class CustomRequestEntityConverter implements Converter<OAuth2AuthorizationCodeGrantRequest, RequestEntity<?>> {

    private OAuth2AuthorizationCodeGrantRequestEntityConverter defaultConverter;

    public CustomRequestEntityConverter() {
        defaultConverter = new OAuth2AuthorizationCodeGrantRequestEntityConverter();
    }

    @Override
    public RequestEntity<?> convert(OAuth2AuthorizationCodeGrantRequest req) {
        ClientRegistration clientRegistration = req.getClientRegistration();

        HttpHeaders headers = new HttpHeaders();
        headers.setBasicAuth(clientRegistration.getClientId(), clientRegistration.getClientSecret());
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

        URI uri = buildUriWithQueries(req);
        return new RequestEntity<>(headers, HttpMethod.GET, uri);
    }

    private URI buildUriWithQueries(OAuth2AuthorizationCodeGrantRequest req) {
        var clientRegistration = req.getClientRegistration();
        var authorizationExchange = req.getAuthorizationExchange();
        String redirectUri = authorizationExchange.getAuthorizationRequest().getRedirectUri();
        String state = authorizationExchange.getAuthorizationRequest().getState();

        return UriComponentsBuilder.fromUriString(clientRegistration.getProviderDetails().getTokenUri())
                .queryParam(OAuth2ParameterNames.GRANT_TYPE, req.getGrantType().getValue())
                .queryParam(OAuth2ParameterNames.CODE, authorizationExchange.getAuthorizationResponse().getCode())
                .queryParam(OAuth2ParameterNames.REDIRECT_URI, redirectUri)
                .queryParam(OAuth2ParameterNames.CLIENT_ID, clientRegistration.getClientId())
                .queryParam(OAuth2ParameterNames.CLIENT_SECRET, clientRegistration.getClientSecret())
                .queryParam(OAuth2ParameterNames.STATE, state)
                .build().toUri();
    }
}