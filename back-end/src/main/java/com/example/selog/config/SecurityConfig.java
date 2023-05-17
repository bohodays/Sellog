package com.example.selog.config;


import com.example.selog.exception.JwtAccessDeniedHandler;
import com.example.selog.exception.JwtAuthenticationEntryPoint;
import com.example.selog.handler.CustomRequestEntityConverter;
import com.example.selog.handler.CustomTokenResponseConverter;
import com.example.selog.handler.Oauth2FailHandler;
import com.example.selog.handler.Oauth2SuccessHandler;
import com.example.selog.jwt.JwtSecurityConfig;
import com.example.selog.jwt.TokenProvider;
import com.example.selog.repository.MemberRepository;
import com.example.selog.service.CustomOauth2UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.convert.converter.Converter;
import org.springframework.http.RequestEntity;
import org.springframework.http.converter.FormHttpMessageConverter;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.client.endpoint.DefaultAuthorizationCodeTokenResponseClient;
import org.springframework.security.oauth2.client.endpoint.OAuth2AccessTokenResponseClient;
import org.springframework.security.oauth2.client.endpoint.OAuth2AuthorizationCodeGrantRequest;
import org.springframework.security.oauth2.client.http.OAuth2ErrorResponseErrorHandler;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.http.converter.OAuth2AccessTokenResponseHttpMessageConverter;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.csrf.CsrfFilter;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CharacterEncodingFilter;

import java.util.Arrays;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final TokenProvider tokenProvider;
    private final JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint; // 유효한 자격 증명을 제공하지 않고 접근하려고 할때 401
    private final JwtAccessDeniedHandler jwtAccessDeniedHandler; // 필요한 권한이 존재하지 않은 경우 403 에러
    private final Oauth2SuccessHandler oauth2SuccessHandler;
    private final Oauth2FailHandler oauth2FailHandler;
    private final MemberRepository memberRepository;
    private final Converter<OAuth2UserRequest, RequestEntity<?>> requestEntityConverter;
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    // h2-console
    @Bean
    public WebSecurityCustomizer webSecurityCustomizer() {
        return (web) -> web.ignoring()
                .antMatchers("/h2-console/**", "/favicon.ico");
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        //인코딩
        CharacterEncodingFilter filter = new CharacterEncodingFilter();
        filter.setEncoding("UTF-8");
        filter.setForceEncoding(true);

        CustomOauth2UserService customOauth2UserService = new CustomOauth2UserService(memberRepository, requestEntityConverter, passwordEncoder());

        http
                .addFilterBefore(filter, CsrfFilter.class)
                .csrf().disable() // CSRF 설정 Disable (토큰을 사용하기 때문에)

                // exception handling
                .exceptionHandling()
                .authenticationEntryPoint(jwtAuthenticationEntryPoint)
                .accessDeniedHandler(jwtAccessDeniedHandler)

                .and()
                .headers()
                .frameOptions()
                .sameOrigin()

                .and()
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)

                .and()
                .authorizeRequests()
                .antMatchers("/oauth2/**","/api/user/signup","/api/webhook","/api/user/access").permitAll()
                .anyRequest().authenticated()
                .and()
                .apply(new JwtSecurityConfig(tokenProvider))

                // cors 설정 적용
                .and()
                .cors().configurationSource(corsConfigurationSource())

                //oauth2 관련 설정
                .and()
                .oauth2Login()
                .tokenEndpoint()
                .accessTokenResponseClient(this.accessTokenResponseClient())

                .and()
                .successHandler(oauth2SuccessHandler)
                .failureHandler(oauth2FailHandler)
                .userInfoEndpoint()
                .userService(customOauth2UserService);

        return http.build();
    }
    @Bean
    public OAuth2AccessTokenResponseClient<OAuth2AuthorizationCodeGrantRequest> accessTokenResponseClient() {
        var accessTokenResponseClient = new DefaultAuthorizationCodeTokenResponseClient();
        accessTokenResponseClient.setRequestEntityConverter(new CustomRequestEntityConverter());

        var tokenResponseHttpMessageConverter = new OAuth2AccessTokenResponseHttpMessageConverter();
        tokenResponseHttpMessageConverter.setTokenResponseConverter(new CustomTokenResponseConverter());

        RestTemplate restTemplate = new RestTemplate(Arrays.asList(
                new FormHttpMessageConverter(), tokenResponseHttpMessageConverter));
        restTemplate.setErrorHandler(new OAuth2ErrorResponseErrorHandler());

        accessTokenResponseClient.setRestOperations(restTemplate);
        return accessTokenResponseClient;
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource(){
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowCredentials(true);       // 서버의 json 응답을 JS로 처리가능하게 함
        config.addAllowedOriginPattern("*");    // springboot cors 설정 시, allowCredentials(true)와 allowedOrigin("*") 같이 사용 불가하게 업뎃
        config.addAllowedHeader("*");
        config.addAllowedMethod("*");
        source.registerCorsConfiguration("/**", config);
        return source;
    }

}