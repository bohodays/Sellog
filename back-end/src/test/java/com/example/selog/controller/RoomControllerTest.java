package com.example.selog.controller;

import com.example.selog.dto.room.UserItemDto;
import com.example.selog.exception.CustomException;
import com.example.selog.exception.error.ErrorCode;
import com.example.selog.response.SuccessResponse;
import com.example.selog.service.RoomService;
import com.fasterxml.jackson.core.type.TypeReference;
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
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.doThrow;
import static org.mockito.Mockito.when;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(controllers = RoomController.class)
@WithMockUser(username = "1")
class RoomControllerTest {
    @MockBean
    private RoomService roomService;

    @Autowired
    private MockMvc mockMvc;

    private final UserItemDto userItemDto = UserItemDto.builder()
            .id(1L).roomId(1L).itemId(1L).name("name").point(200).category("category").x("x").y("y").z("z").rotation("rotation").path("path").build();

    private final UserItemDto userItemDto2 = UserItemDto.builder()
            .id(2L).roomId(1L).itemId(2L).name("name").point(200).category("category").x("x").y("y").z("z").rotation("rotation").path("path").build();

    @Test
    void findRoomInfoById() throws Exception {
        Long roomId = 1L;
        List<UserItemDto> userItemDtoList = new ArrayList<>();
        userItemDtoList.add(userItemDto);
        userItemDtoList.add(userItemDto2);

        when(roomService.findRoomInfoById(any())).thenReturn(userItemDtoList);

        MvcResult mvcResult = mockMvc.perform(get("/api/room/{room_id}", roomId).with(csrf()))
                .andExpect(status().isOk())
                .andReturn();

        SuccessResponse response = new ObjectMapper().readValue(mvcResult.getResponse().getContentAsString(), SuccessResponse.class);
        TypeReference<List<UserItemDto>> typeRef = new TypeReference<List<UserItemDto>>() {};
        List<UserItemDto> result = new ObjectMapper().convertValue(response.getResponse(), typeRef);

        assertThat(result.size()).isEqualTo(userItemDtoList.size());
    }

    @Test
    void updateItemLocation() throws Exception {
        List<UserItemDto> userItemDtoList = new ArrayList<>();
        userItemDtoList.add(userItemDto);
        userItemDtoList.add(userItemDto2);

        List<UserItemDto> updateItemList = new ArrayList<>();
        updateItemList.add(userItemDto);
        updateItemList.add(userItemDto2);

        when(roomService.updateItemLocation(any())).thenReturn(updateItemList);

        MvcResult mvcResult = mockMvc.perform(put("/api/room").with(csrf())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(new ObjectMapper().writeValueAsString(userItemDtoList)))
                .andExpect(status().isOk())
                .andReturn();

        SuccessResponse response = new ObjectMapper().readValue(mvcResult.getResponse().getContentAsString(), SuccessResponse.class);
        TypeReference<List<UserItemDto>> typeRef = new TypeReference<List<UserItemDto>>() {};
        List<UserItemDto> result = new ObjectMapper().convertValue(response.getResponse(), typeRef);

        assertThat(result.size()).isEqualTo(userItemDtoList.size());
    }

    @Test
    void findUserItemByRoomId() throws Exception {
        Long roomId = 1L;
        List<UserItemDto> userItemDtoList = new ArrayList<>();
        userItemDtoList.add(userItemDto);
        userItemDtoList.add(userItemDto2);

        when(roomService.findUserItemByRoomId(any())).thenReturn(userItemDtoList);

        MvcResult mvcResult = mockMvc.perform(get("/api/room/items/{room_id}", roomId).with(csrf()))
                .andExpect(status().isOk())
                .andReturn();

        SuccessResponse response = new ObjectMapper().readValue(mvcResult.getResponse().getContentAsString(), SuccessResponse.class);
        TypeReference<List<UserItemDto>> typeRef = new TypeReference<List<UserItemDto>>() {};
        List<UserItemDto> result = new ObjectMapper().convertValue(response.getResponse(), typeRef);

        assertThat(result.size()).isEqualTo(userItemDtoList.size());
    }

    @Test
    void findItemByCategory() throws Exception {
        List<UserItemDto> userItemDtoList = new ArrayList<>();
        userItemDtoList.add(userItemDto);
        userItemDtoList.add(userItemDto2);

        Pageable pageable = PageRequest.of(0, 10);
        Slice<UserItemDto> userItemDtoSlice = new SliceImpl<>(userItemDtoList, pageable,false);

        when(roomService.getItemByCategory(any(), any(), any())).thenReturn(userItemDtoSlice);
        MvcResult mvcResult = mockMvc.perform(get("/api/room/items/{category}/users","category"))
                .andExpect(status().isOk())
                .andReturn();
    }

    @Test
    void findAllItem() throws Exception {
        List<UserItemDto> userItemDtoList = new ArrayList<>();
        userItemDtoList.add(userItemDto);
        userItemDtoList.add(userItemDto2);

        when(roomService.getAllItem(any())).thenReturn(userItemDtoList);
        MvcResult mvcResult = mockMvc.perform(get("/api/room/items/all"))
                .andExpect(status().isOk())
                .andReturn();

        SuccessResponse response = new ObjectMapper().readValue(mvcResult.getResponse().getContentAsString(), SuccessResponse.class);
        TypeReference<List<UserItemDto>> typeRef = new TypeReference<List<UserItemDto>>() {};
        List<UserItemDto> result = new ObjectMapper().convertValue(response.getResponse(), typeRef);

        assertThat(result.size()).isEqualTo(userItemDtoList.size());
    }

    @Nested
    @DisplayName("RoomController ExceptionTest")
    class ExceptionTest {
        @Test
        void findRoomInfoById() throws Exception {
            Long roomId = 1L;

            doThrow(new CustomException(ErrorCode.NO_ROOM)).when(roomService).findRoomInfoById(any());
            mockMvc.perform(get("/api/room/{room_id}", roomId))
                    .andExpect(status().isNotFound())
                    .andReturn();

            doThrow(new RuntimeException()).when(roomService).findRoomInfoById(any());
            mockMvc.perform(get("/api/room/{room_id}", roomId))
                    .andExpect(status().isInternalServerError())
                    .andReturn();
        }

        @Test
        void updateItemLocation() throws Exception {
            List<UserItemDto> userItemDtoList = new ArrayList<>();
            userItemDtoList.add(userItemDto);
            userItemDtoList.add(userItemDto2);

            doThrow(new CustomException(ErrorCode.NO_ITEM)).when(roomService).updateItemLocation(any());
            mockMvc.perform(put("/api/room").with(csrf())
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(new ObjectMapper().writeValueAsString(userItemDtoList)))
                    .andExpect(status().isNotFound())
                    .andReturn();

            doThrow(new RuntimeException()).when(roomService).updateItemLocation(any());
            mockMvc.perform(put("/api/room").with(csrf())
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(new ObjectMapper().writeValueAsString(userItemDtoList)))
                    .andExpect(status().isInternalServerError())
                    .andReturn();
        }

        @Test
        void findUserItemByRoomId() throws Exception {
            Long roomId = 1L;
            List<UserItemDto> userItemDtoList = new ArrayList<>();
            userItemDtoList.add(userItemDto);
            userItemDtoList.add(userItemDto2);

            doThrow(new CustomException(ErrorCode.NO_ROOM)).when(roomService).findUserItemByRoomId(any());
            mockMvc.perform(get("/api/room/items/{room_id}", roomId).with(csrf()))
                    .andExpect(status().isNotFound())
                    .andReturn();

            doThrow(new RuntimeException()).when(roomService).findUserItemByRoomId(any());
            mockMvc.perform(get("/api/room/items/{room_id}", roomId).with(csrf()))
                    .andExpect(status().isInternalServerError())
                    .andReturn();
        }

        @Test
        void findItemByCategory() throws Exception {
            doThrow(new CustomException(ErrorCode.NO_USER)).when(roomService).getItemByCategory(any(), any(), any());
            mockMvc.perform(get("/api/room/items/{category}/users","category"))
                    .andExpect(status().isNotFound())
                    .andReturn();

            doThrow(new RuntimeException()).when(roomService).getItemByCategory(any(), any(), any());
            mockMvc.perform(get("/api/room/items/{category}/users","category"))
                    .andExpect(status().isInternalServerError())
                    .andReturn();
        }

        @Test
        void findAllItem() throws Exception {
            doThrow(new CustomException(ErrorCode.NO_USER)).when(roomService).getAllItem(any());
            mockMvc.perform(get("/api/room/items/all"))
                    .andExpect(status().isNotFound())
                    .andReturn();

            doThrow(new RuntimeException()).when(roomService).getAllItem(any());
            mockMvc.perform(get("/api/room/items/all"))
                    .andExpect(status().isInternalServerError())
                    .andReturn();
        }
    }
}