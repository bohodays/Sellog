package com.example.selog.controller;

import com.example.selog.dto.exam.ExamDto;
import com.example.selog.response.SuccessResponse;
import com.example.selog.service.ExamService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.doThrow;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(controllers = ExamController.class)
@WithMockUser
class ExamControllerTest {
    @MockBean
    private ExamService examService;

    @Autowired
    private MockMvc mockMvc;

    private final ExamDto examDto1= ExamDto.builder()
            .option1("1").option2("2").option3("3").option4("4").answer("1").category("category").comment("comment").quest("quest").build();

    private final ExamDto examDto2= ExamDto.builder()
            .option1("1").option2("2").option3("3").option4("4").answer("1").category("category").comment("comment").quest("quest2").build();

    @Test
    void getExamList() throws Exception {
        List<ExamDto> examDtoList = new ArrayList<>();
        examDtoList.add(examDto1);
        examDtoList.add(examDto2);
        when(examService.getExamList()).thenReturn(examDtoList);

        MvcResult mvcResult = mockMvc.perform(get("/api/exam"))
                .andExpect(status().isOk())
                .andReturn();

        SuccessResponse response = new ObjectMapper().readValue(mvcResult.getResponse().getContentAsString(), SuccessResponse.class);
        ExamDto[] examDtoArray = new ObjectMapper().convertValue(response.getResponse(), ExamDto[].class);
        List<ExamDto> result = Arrays.asList(examDtoArray);

        assertThat(result.size()).isEqualTo(examDtoList.size());
    }

    @Test
    void testGetExamList() throws Exception {
        List<ExamDto> examDtoList = new ArrayList<>();
        examDtoList.add(examDto1);
        examDtoList.add(examDto2);

        String category = "category";

        when(examService.getExamList(any())).thenReturn(examDtoList);

        MvcResult mvcResult = mockMvc.perform(get("/api/exam/{category}",category))
                .andExpect(status().isOk())
                .andReturn();

        SuccessResponse response = new ObjectMapper().readValue(mvcResult.getResponse().getContentAsString(), SuccessResponse.class);
        ExamDto[] examDtoArray = new ObjectMapper().convertValue(response.getResponse(), ExamDto[].class);
        List<ExamDto> result = Arrays.asList(examDtoArray);

        assertThat(result.size()).isEqualTo(examDtoList.size());
    }

    @Nested
    @DisplayName("ExamController ExceptionTest")
    class ExceptionTest {
        @Test
        void getExamList() throws Exception {

            doThrow(new RuntimeException()).when(examService).getExamList();

            mockMvc.perform(get("/api/exam"))
                    .andExpect(status().isInternalServerError())
                    .andReturn();
        }

        @Test
        void testGetExamList() throws Exception {
            String category = "category";

            doThrow(new RuntimeException()).when(examService).getExamList(any());

            mockMvc.perform(get("/api/exam/{category}",category))
                    .andExpect(status().isInternalServerError())
                    .andReturn();
        }
    }
}