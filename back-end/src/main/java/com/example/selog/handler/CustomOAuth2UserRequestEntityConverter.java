package com.example.selog.handler;

import lombok.RequiredArgsConstructor;
import org.springframework.core.convert.converter.Converter;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.RequestEntity;
import org.springframework.security.oauth2.client.registration.ClientRegistration;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.endpoint.OAuth2ParameterNames;
import org.springframework.stereotype.Component;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;
import java.util.Collections;

@RequiredArgsConstructor
@Component
public class CustomOAuth2UserRequestEntityConverter implements Converter<OAuth2UserRequest, RequestEntity<?>> {

    @Override
    public RequestEntity<?> convert(OAuth2UserRequest userRequest) {
        ClientRegistration clientRegistration = userRequest.getClientRegistration();

        HttpHeaders headers = new HttpHeaders();
        headers.setAccept(Collections.singletonList(MediaType.APPLICATION_JSON));
        UriComponentsBuilder uriBuilder = UriComponentsBuilder
                .fromUriString(clientRegistration.getProviderDetails().getUserInfoEndpoint().getUri());

        RequestEntity<?> request;

        if(userRequest.getClientRegistration().getRegistrationId().equals("tistory")){
            URI uri = uriBuilder.queryParam(OAuth2ParameterNames.ACCESS_TOKEN, userRequest.getAccessToken().getTokenValue())
                    .build().toUri();
            request = new RequestEntity<>(headers, HttpMethod.GET, uri);
        }else {
            MultiValueMap<String, String> formParameters = new LinkedMultiValueMap<>();
            formParameters.add(OAuth2ParameterNames.ACCESS_TOKEN, userRequest.getAccessToken().getTokenValue());
            request = new RequestEntity<>(formParameters, headers, HttpMethod.POST, uriBuilder.build().toUri());
        }
        return request;
    }
}