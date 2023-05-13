package com.example.selog.controller;

import com.example.selog.dto.member.MemberDto;
import com.example.selog.dto.member.SignUpDto;
import com.example.selog.dto.member.TokenDto;
import com.example.selog.dto.member.TokenRequestDto;
import com.example.selog.entity.Member;
import com.example.selog.exception.CustomException;
import com.example.selog.exception.error.ErrorCode;
import com.example.selog.response.SuccessResponse;
import com.example.selog.service.MemberService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

import static java.time.LocalDateTime.now;
import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.doThrow;
import static org.mockito.Mockito.when;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(controllers = MemberController.class)
@WithMockUser(username = "1")
class MemberControllerTest {

    @MockBean
    private MemberService memberService;

    @Autowired
    private MockMvc mockMvc;

    private final MemberDto memberDto = MemberDto.builder()
            .userId(1L).nickname("nickname").img("img").email("email")
            .githubTarget("1-1").bojTarget("1-1").blogTarget("7-1").feedTarget(false).csTarget(false)
            .baekjoon("algo").blog("blog").github("github")
            .motto("motto").characterId(0).contact("contact").points(1000)
//            .github_start_date(now()).algo_start_date(now()).blog_start_date(now())
            .build();


    @Test
    void findMemberInfoById() throws Exception {
        when(memberService.findMemberInfoByUserId(any())).thenReturn(memberDto);

        MvcResult mvcResult = mockMvc.perform(get("/api/user"))
                .andExpect(status().isOk())
                .andReturn();

        SuccessResponse response = new ObjectMapper().readValue(mvcResult.getResponse().getContentAsString(), SuccessResponse.class);
        MemberDto result = new ObjectMapper().convertValue(response.getResponse(), MemberDto.class);

        assertThat(result.getEmail()).isEqualTo(memberDto.getEmail());
    }

    @Test
    void reissue() throws Exception {
        TokenDto tokenDto = TokenDto.builder()
                .grantType("ROLE_USER").accessTokenExpiresIn(2000L)
                .accessToken("accessToken").refreshToken("refreshToken").build();

        TokenRequestDto tokenRequestDto = TokenRequestDto.builder()
                .accessToken("accessToken").refreshToken("refreshToken")
                .build();

        when(memberService.reissue(any())).thenReturn(tokenDto);

        MvcResult mvcResult = mockMvc.perform(post("/api/user/access").with(csrf())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(new ObjectMapper().writeValueAsString(tokenRequestDto)))
                .andExpect(status().isOk())
                .andReturn();

        SuccessResponse response = new ObjectMapper().readValue(mvcResult.getResponse().getContentAsString(), SuccessResponse.class);
        TokenDto result = new ObjectMapper().convertValue(response.getResponse(), TokenDto.class);

        assertThat(result.getAccessToken()).isEqualTo(tokenDto.getAccessToken());

    }

    @Test
    void signup() throws Exception {
        SignUpDto signUpDto = SignUpDto.builder()
                .userId(1L).contact("contact").nickname("nickname").motto("motto").characterId(0).blog("blog").github("github")
                .build();
        when(memberService.signup(any())).thenReturn(memberDto);

        MvcResult mvcResult = mockMvc.perform(put("/api/user/signup").with(csrf())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(new ObjectMapper().writeValueAsString(signUpDto)))
                .andExpect(status().isOk())
                .andReturn();

        SuccessResponse response = new ObjectMapper().readValue(mvcResult.getResponse().getContentAsString(), SuccessResponse.class);
        MemberDto result = new ObjectMapper().convertValue(response.getResponse(), MemberDto.class);

        assertThat(result.getContact()).isEqualTo(signUpDto.getContact());
    }

    @Test
    void logout() throws Exception {
    }

    @Test
    void deleteMember() throws Exception {
    }

    @Test
    void updateTarget() throws Exception {
    }

    @Test
    void updateMember() throws Exception {
    }

    @Nested
    @DisplayName("MemberController ExceptionTest")
    class ExceptionTest {
        @Test
        void findMemberInfoById() throws Exception {
            doThrow(new CustomException(ErrorCode.NO_USER)).when(memberService).findMemberInfoByUserId(any());
            mockMvc.perform(get("/api/user"))
                    .andExpect(status().isNotFound())
                    .andReturn();

            doThrow(new RuntimeException()).when(memberService).findMemberInfoByUserId(any());
            mockMvc.perform(get("/api/user"))
                    .andExpect(status().isInternalServerError())
                    .andReturn();
        }

        @Test
        void reissue() throws Exception {
            TokenDto tokenDto = TokenDto.builder()
                    .grantType("ROLE_USER").accessTokenExpiresIn(2000L)
                    .accessToken("accessToken").refreshToken("refreshToken").build();

            TokenRequestDto tokenRequestDto = TokenRequestDto.builder()
                    .accessToken("accessToken").refreshToken("refreshToken")
                    .build();

            doThrow(new CustomException(ErrorCode.NO_TOKEN)).when(memberService).reissue(any());

            mockMvc.perform(post("/api/user/access").with(csrf())
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(new ObjectMapper().writeValueAsString(tokenRequestDto)))
                    .andExpect(status().isUnauthorized())
                    .andReturn();

//            doThrow(new RuntimeException()).when(memberService).reissue(any());
//            mockMvc.perform(get("/api/user/access"))
//                    .andExpect(status().isInternalServerError())
//                    .andReturn();
        }

        @Test
        void signup() throws Exception {
            SignUpDto signUpDto = SignUpDto.builder()
                    .userId(1L).contact("contact").nickname("nickname").motto("motto").characterId(0).blog("blog").github("github")
                    .build();

            doThrow(new CustomException(ErrorCode.NO_USER)).when(memberService).signup(any());

            mockMvc.perform(put("/api/user/signup").with(csrf())
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(new ObjectMapper().writeValueAsString(signUpDto)))
                    .andExpect(status().isNotFound())
                    .andReturn();

            doThrow(new RuntimeException()).when(memberService).signup(any());

            mockMvc.perform(put("/api/user/signup").with(csrf())
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(new ObjectMapper().writeValueAsString(signUpDto)))
                    .andExpect(status().isInternalServerError())
                    .andReturn();
        }

        @Test
        void logout() throws Exception {
        }

        @Test
        void deleteMember() throws Exception {
        }

        @Test
        void updateTarget() throws Exception {
        }

        @Test
        void updateMember() throws Exception {
        }
    }
}