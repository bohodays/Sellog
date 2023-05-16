package com.example.selog.controller;

import com.example.selog.dto.record.RecordRequestDto;
import com.example.selog.exception.CustomException;
import com.example.selog.exception.error.ErrorCode;
import com.example.selog.response.SuccessResponse;
import com.example.selog.service.WebHookService;
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
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import java.util.HashMap;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.doThrow;
import static org.mockito.Mockito.when;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(controllers = WebHookController.class)
@WithMockUser(username = "1")
class WebHookControllerTest {

    @MockBean
    private WebHookService webHookService;
    @Autowired
    private MockMvc mockMvc;

    @Test
    void addRecord() throws Exception {
        HashMap<String,Object> request = new HashMap<>();
        request.put("type","content");

        MvcResult mvcResult = mockMvc.perform(post("/api/webhook").with(csrf())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(new ObjectMapper().writeValueAsString(request)))
                .andExpect(status().isOk())
                .andReturn();

        SuccessResponse response = new ObjectMapper().readValue(mvcResult.getResponse().getContentAsString(), SuccessResponse.class);
        assertThat(response.getResponse()).isEqualTo("success");
    }

    @Test
    void createAlgoRecord() throws Exception {
        RecordRequestDto recordRequestDto = RecordRequestDto.builder()
                .type("type").message("message").problemId("problemId")
                .build();

        when(webHookService.createAlgoRecord(any(), any())).thenReturn(10);

        MvcResult mvcResult = mockMvc.perform(post("/api/webhook/chrome").with(csrf())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(new ObjectMapper().writeValueAsString(recordRequestDto)))
                .andExpect(status().isOk())
                .andReturn();

        SuccessResponse response = new ObjectMapper().readValue(mvcResult.getResponse().getContentAsString(), SuccessResponse.class);
        assertThat(response.getResponse()).isEqualTo(10);
    }

    @Nested
    @DisplayName("WebHookController ExceptionTest")
    class ExceptionTest {
        @Test
        void addRecord() throws Exception {
            HashMap<String,Object> request = new HashMap<>();
            request.put("type","content");

            doThrow(new RuntimeException()).when(webHookService).createRecord(any());
            mockMvc.perform(post("/api/webhook").with(csrf())
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(new ObjectMapper().writeValueAsString(request)))
                    .andExpect(status().isInternalServerError())
                    .andReturn();
        }

        @Test
        void createAlgoRecord() throws Exception {
            RecordRequestDto recordRequestDto = RecordRequestDto.builder()
                    .type("type").message("message").problemId("problemId")
                    .build();

            doThrow(new CustomException(ErrorCode.NO_USER)).when(webHookService).createAlgoRecord(any(),any());
            mockMvc.perform(post("/api/webhook/chrome").with(csrf())
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(new ObjectMapper().writeValueAsString(recordRequestDto)))
                    .andExpect(status().isNotFound())
                    .andReturn();

            doThrow(new RuntimeException()).when(webHookService).createAlgoRecord(any(),any());
            mockMvc.perform(post("/api/webhook/chrome").with(csrf())
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(new ObjectMapper().writeValueAsString(recordRequestDto)))
                    .andExpect(status().isInternalServerError())
                    .andReturn();
        }
    }
}