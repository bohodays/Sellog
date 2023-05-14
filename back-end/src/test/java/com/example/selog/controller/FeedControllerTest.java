package com.example.selog.controller;

import com.example.selog.dto.exam.ExamDto;
import com.example.selog.dto.feed.FeedDto;
import com.example.selog.response.SuccessResponse;
import com.example.selog.service.FeedService;
import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JavaType;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.domain.SliceImpl;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.doThrow;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(controllers = FeedController.class)
@WithMockUser
class FeedControllerTest {

    @MockBean
    private FeedService feedService;

    @Autowired
    private MockMvc mockMvc;

    private final FeedDto feedDto1 = FeedDto.builder()
            .company("company").title("title").views(0).link("link").feedId(1L)
            .build();

    private final FeedDto feedDto2 = FeedDto.builder()
            .company("company").title("title").views(0).link("link").feedId(2L)
            .build();

    @Test
    void getFeedByViews() throws Exception {
        List<FeedDto> feedDtoList = new ArrayList<>();
        feedDtoList.add(feedDto1);
        feedDtoList.add(feedDto2);
        when(feedService.getFeedsByViews()).thenReturn(feedDtoList);

        MvcResult mvcResult = mockMvc.perform(get("/api/feeds/views"))
                .andExpect(status().isOk())
                .andReturn();

        SuccessResponse response = new ObjectMapper().readValue(mvcResult.getResponse().getContentAsString(), SuccessResponse.class);
        FeedDto[] feedDtoArray = new ObjectMapper().convertValue(response.getResponse(), FeedDto[].class);
        List<FeedDto> result = Arrays.asList(feedDtoArray);

        assertThat(result.size()).isEqualTo(feedDtoList.size());
    }

    @Test
    void getFeeds() throws Exception {
        List<FeedDto> feedDtoList = new ArrayList<>();
        feedDtoList.add(feedDto1);
        feedDtoList.add(feedDto2);

        Pageable pageable = PageRequest.of(0, 10);

        Slice<FeedDto> feedDtoSlice = new SliceImpl<>(feedDtoList, pageable,false);
        when(feedService.getFeeds(any())).thenReturn(feedDtoSlice);

        MvcResult mvcResult = mockMvc.perform(get("/api/feeds"))
                .andExpect(status().isOk())
                .andReturn();

//        SuccessResponse response = new ObjectMapper().readValue(mvcResult.getResponse().getContentAsString(), SuccessResponse.class);
//        ObjectMapper objectMapper = new ObjectMapper();
//        objectMapper.registerSubtypes(SliceImpl.class);
//
//        Slice<FeedDto> slice = objectMapper.readValue(response.getResponse(), new TypeReference<SliceImpl<FeedDto>>() {});
//
//        List<FeedDto> result = slice.getContent();
//
//        assertThat(result.size()).isEqualTo(feedDtoList.size());
    }


    @Test
    void feedDetail() throws Exception {
    }

    @Nested
    @DisplayName("FeedController ExceptionTest")
    class ExceptionTest {
        @Test
        void getFeedByViews() throws Exception {
            doThrow(new RuntimeException()).when(feedService).getFeedsByViews();

            mockMvc.perform(get("/api/feeds/views"))
                    .andExpect(status().isInternalServerError())
                    .andReturn();
        }

        @Test
        void getFeeds() throws Exception {

            doThrow(new RuntimeException()).when(feedService).getFeeds(any());

            mockMvc.perform(get("/api/feeds"))
                    .andExpect(status().isInternalServerError())
                    .andReturn();

        }

        @Test
        void feedDetail() throws Exception {
        }
    }
}