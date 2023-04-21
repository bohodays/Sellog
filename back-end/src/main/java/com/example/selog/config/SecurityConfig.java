package com.example.selog.config;


import com.example.selog.handler.Oauth2SuccessHandler;
import com.example.selog.service.CustomOauth2UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.csrf.CsrfFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CharacterEncodingFilter;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final Oauth2SuccessHandler oauth2SuccessHandler;
    private final CustomOauth2UserService customOauth2UserService;

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

        http
                .addFilterBefore(filter, CsrfFilter.class)
                .csrf().disable() // CSRF 설정 Disable (토큰을 사용하기 때문에)

                // exception handling
                .exceptionHandling()

                .and()
                .headers()
                .frameOptions()
                .sameOrigin()

//                .and()
//                .sessionManagement()
//                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)

                .and()
                .authorizeRequests()
                .antMatchers("/oauth2/authorization").permitAll()
                .anyRequest().authenticated()

                // cors 설정 적용
                .and()
                .cors().configurationSource(corsConfigurationSource())

                //oauth2 관련 설정
                .and()
                .oauth2Login()
                .successHandler(oauth2SuccessHandler)
                .userInfoEndpoint()
                .userService(customOauth2UserService);

        return http.build();
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