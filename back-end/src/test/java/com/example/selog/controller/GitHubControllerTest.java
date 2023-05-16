package com.example.selog.controller;

import com.example.selog.response.SuccessResponse;
import com.example.selog.service.GitHubService;
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

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.doThrow;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(controllers = GitHubController.class)
@WithMockUser
class GitHubControllerTest {
    @MockBean
    private GitHubService gitHubService;
    @Autowired
    private MockMvc mockMvc;

    @Test
    void synchronizeInfo() throws Exception {
        MvcResult mvcResult = mockMvc.perform(get("/api/github/{user_id}",1L))
                .andExpect(status().isOk())
                .andReturn();

        SuccessResponse response = new ObjectMapper().readValue(mvcResult.getResponse().getContentAsString(), SuccessResponse.class);
        assertThat(response.getResponse()).isEqualTo("success");
    }

    @Test
    void deleteWebhook() throws Exception {
        MvcResult mvcResult = mockMvc.perform(delete("/api/github/{user_id}",1L).with(csrf()))
                .andExpect(status().isOk())
                .andReturn();
        SuccessResponse response = new ObjectMapper().readValue(mvcResult.getResponse().getContentAsString(), SuccessResponse.class);
        assertThat(response.getResponse()).isEqualTo("success");
    }

    @Nested
    @DisplayName("GitHubController ExceptionTest")
    class ExceptionTest {
        @Test
        void synchronizeInfo() throws Exception {
            doThrow(new RuntimeException()).when(gitHubService).synchronize(any());

            mockMvc.perform(get("/api/github/{user_id}", 1L))
                    .andExpect(status().isInternalServerError())
                    .andReturn();
        }

        @Test
        void deleteWebhook() throws Exception {
            doThrow(new RuntimeException()).when(gitHubService).deleteWebHook(any());

            mockMvc.perform(delete("/api/github/{user_id}",1L).with(csrf()))
                    .andExpect(status().isInternalServerError())
                    .andReturn();
        }
    }
}