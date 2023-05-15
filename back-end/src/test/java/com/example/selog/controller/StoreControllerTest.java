package com.example.selog.controller;

import com.example.selog.dto.room.StoreItemDto;
import com.example.selog.dto.store.ItemDto;
import com.example.selog.exception.CustomException;
import com.example.selog.exception.error.ErrorCode;
import com.example.selog.response.SuccessResponse;
import com.example.selog.service.StoreService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.domain.*;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

import java.util.ArrayList;
import java.util.List;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.doThrow;
import static org.mockito.Mockito.when;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(controllers = StoreController.class)
@WithMockUser(username = "1")
class StoreControllerTest {

    @MockBean
    private StoreService storeService;
    @Autowired
    private MockMvc mockMvc;

    @Test
    void findAllItem() throws Exception {
        StoreItemDto storeItemDto = StoreItemDto.builder()
                .id(1L).name("name").point(100).category("category").path("path").possession(1).build();
        StoreItemDto storeItemDto2 = StoreItemDto.builder()
                .id(2L).name("name").point(100).category("category").path("path").possession(1).build();

        List<StoreItemDto> storeItemDtoList = new ArrayList<>();
        storeItemDtoList.add(storeItemDto);
        storeItemDtoList.add(storeItemDto2);

        Pageable pageable = PageRequest.of(0, 10);
        Page<StoreItemDto> storeItemDtoPage = new PageImpl<>(storeItemDtoList, pageable,10);

        when(storeService.findAllItem(any(), any(), any())).thenReturn(storeItemDtoPage);
        mockMvc.perform(get("/api/store/{category}","category").with(csrf()))
                .andExpect(status().isOk())
                .andReturn();
    }

    @Test
    void insertItem() throws Exception {
        ItemDto itemDto = ItemDto.builder()
                .itemId(1L)
                .build();
        when(storeService.insertItem(any(), any())).thenReturn(100);

        MvcResult mvcResult = mockMvc.perform(post("/api/store").with(csrf())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(new ObjectMapper().writeValueAsString(itemDto)))
                .andExpect(status().isOk())
                .andReturn();
        SuccessResponse response = new ObjectMapper().readValue(mvcResult.getResponse().getContentAsString(), SuccessResponse.class);
        assertThat(response.getResponse()).isEqualTo(100);
    }

    @Nested
    @DisplayName("StoreController ExceptionTest")
    class ExceptionTest {
        @Test
        void findAllItem() throws Exception {
            doThrow(new CustomException(ErrorCode.NO_USER)).when(storeService).findAllItem(any(), any(), any());
            mockMvc.perform(get("/api/store/{category}","category").with(csrf()))
                    .andExpect(status().isNotFound())
                    .andReturn();

            doThrow(new RuntimeException()).when(storeService).findAllItem(any(), any(), any());
            mockMvc.perform(get("/api/store/{category}","category").with(csrf()))
                    .andExpect(status().isInternalServerError())
                    .andReturn();
        }

        @Test
        void insertItem() throws Exception {
            ItemDto itemDto = ItemDto.builder()
                    .itemId(1L)
                    .build();

            doThrow(new CustomException(ErrorCode.NO_USER)).when(storeService).insertItem(any(), any());
            mockMvc.perform(post("/api/store").with(csrf())
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(new ObjectMapper().writeValueAsString(itemDto)))
                    .andExpect(status().isNotFound())
                    .andReturn();

            doThrow(new RuntimeException()).when(storeService).insertItem(any(), any());
            mockMvc.perform(post("/api/store").with(csrf())
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(new ObjectMapper().writeValueAsString(itemDto)))
                    .andExpect(status().isInternalServerError())
                    .andReturn();
        }

    }
}