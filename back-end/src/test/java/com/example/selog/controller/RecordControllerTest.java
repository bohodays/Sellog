package com.example.selog.controller;

import com.example.selog.dto.feed.FeedDto;
import com.example.selog.dto.record.RecordDto;
import com.example.selog.dto.record.RecordMaintainDto;
import com.example.selog.entity.Member;
import com.example.selog.entity.Record;
import com.example.selog.exception.CustomException;
import com.example.selog.exception.error.ErrorCode;
import com.example.selog.response.SuccessResponse;
import com.example.selog.service.RecordService;
import com.fasterxml.jackson.core.type.TypeReference;
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

import javax.persistence.Column;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.doThrow;
import static org.mockito.Mockito.when;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(controllers = RecordController.class)
@WithMockUser(username = "1")
class RecordControllerTest {

    @MockBean
    private RecordService recordService;
    @Autowired
    private MockMvc mockMvc;
    private final Record record1 = Record.builder()
            .id(1L).content("content").category("type1").writing_time(LocalDateTime.now()).problemId("problemId").build();
    private final Record record2 = Record.builder()
            .id(1L).content("content").category("type2").writing_time(LocalDateTime.now()).problemId("problemId").build();

    @Test
    void findRecordByMonth() throws Exception {
        List<Record> recordList = new ArrayList<>();
        recordList.add(record1);
        recordList.add(record2);

        Map<String, Map<String, List<RecordDto>>> map = toHashMap(recordList);
        when(recordService.findRecordByMonth(any(), any(), any())).thenReturn(map);

        MvcResult mvcResult = mockMvc.perform(get("/api/record/month?year={year}&month={month}", "2023", "5"))
                .andExpect(status().isOk())
                .andReturn();

        SuccessResponse response = new ObjectMapper().readValue(mvcResult.getResponse().getContentAsString(), SuccessResponse.class);
        TypeReference<Map<String, Map<String, List<RecordDto>>>> typeRef = new TypeReference<Map<String, Map<String, List<RecordDto>>>>() {};
        Map<String, Map<String, List<RecordDto>>> result = new ObjectMapper().convertValue(response.getResponse(), typeRef);

        assertThat(result.size()).isEqualTo(1);
    }


    @Test
    void findRecordByToday() throws Exception {
        List<Record> recordList = new ArrayList<>();
        recordList.add(record1);
        recordList.add(record2);

        Map<String, List<RecordDto>> map = new HashMap<>();
        for(Record record : recordList){
            List<RecordDto> list = new ArrayList<>();
            if(map.containsKey(record.getCategory())){
                list = map.get(record.getCategory());
            }
            list.add(record.toRecordDto());
            map.put(record.getCategory(), list);
        }

        when(recordService.findRecordByToday(any())).thenReturn(map);

        MvcResult mvcResult = mockMvc.perform(get("/api/record").with(csrf()))
                .andExpect(status().isOk())
                .andReturn();

        SuccessResponse response = new ObjectMapper().readValue(mvcResult.getResponse().getContentAsString(), SuccessResponse.class);
        TypeReference<Map<String, List<RecordDto>>> typeRef = new TypeReference<Map<String, List<RecordDto>>>() {};
        Map<String, List<RecordDto>> result = new ObjectMapper().convertValue(response.getResponse(), typeRef);

        assertThat(result.size()).isEqualTo(2);

    }

    @Test
    void findRecordByStartDay() throws Exception {
        List<Record> recordList = new ArrayList<>();
        recordList.add(record1);
        recordList.add(record2);

        Map<String, Map<String, List<RecordDto>>> map = toHashMap(recordList);
        when(recordService.findRecordByStartDay(any())).thenReturn(map);

        MvcResult mvcResult = mockMvc.perform(get("/api/record/start").with(csrf()))
                .andExpect(status().isOk())
                .andReturn();

        SuccessResponse response = new ObjectMapper().readValue(mvcResult.getResponse().getContentAsString(), SuccessResponse.class);
        TypeReference<Map<String, Map<String, List<RecordDto>>>> typeRef = new TypeReference<Map<String, Map<String, List<RecordDto>>>>() {};
        Map<String, Map<String, List<RecordDto>>> result = new ObjectMapper().convertValue(response.getResponse(), typeRef);

        assertThat(result.size()).isEqualTo(1);
    }

    @Test
    void findByMaintain() throws Exception {
        RecordMaintainDto recordMaintainDto1 =RecordMaintainDto.builder()
                .day(2L).start(new int[]{10,10}).mid(new int[]{10,10}).last(new int[]{10,10}).build();
        RecordMaintainDto recordMaintainDto2 =RecordMaintainDto.builder()
                .day(3L).start(new int[]{10,10}).mid(new int[]{10,10}).last(new int[]{10,10}).build();

        Map<String, RecordMaintainDto> map = new HashMap<>();
        map.put("type",recordMaintainDto1);
        map.put("type2",recordMaintainDto2);
        when(recordService.findByMaintain(any())).thenReturn(map);

        MvcResult mvcResult = mockMvc.perform(get("/api/record/maintain").with(csrf()))
                .andExpect(status().isOk())
                .andReturn();

        SuccessResponse response = new ObjectMapper().readValue(mvcResult.getResponse().getContentAsString(), SuccessResponse.class);
        TypeReference<Map<String, RecordMaintainDto>> typeRef = new TypeReference<Map<String, RecordMaintainDto>>() {};
        Map<String, RecordMaintainDto> result = new ObjectMapper().convertValue(response.getResponse(), typeRef);

        assertThat(result.size()).isEqualTo(2);
    }

    @Test
    void getAllRecordCount() throws Exception {

        Map<String, Long> map = new HashMap<>();
        map.put("type",1L);
        map.put("type2",2L);
        when(recordService.getAllRecordCount(any())).thenReturn(map);

        MvcResult mvcResult = mockMvc.perform(get("/api/record/statistics").with(csrf()))
                .andExpect(status().isOk())
                .andReturn();

        SuccessResponse response = new ObjectMapper().readValue(mvcResult.getResponse().getContentAsString(), SuccessResponse.class);
        TypeReference<Map<String, Long>> typeRef = new TypeReference<Map<String, Long>>() {};
        Map<String, Long> result = new ObjectMapper().convertValue(response.getResponse(), typeRef);

        assertThat(result.size()).isEqualTo(2);
    }

    @Nested
    @DisplayName("RecordController ExceptionTest")
    class ExceptionTest {
        @Test
        void findRecordByMonth() throws Exception {

            doThrow(new CustomException(ErrorCode.NO_USER)).when(recordService).findRecordByMonth(any(), any(), any());
            mockMvc.perform(get("/api/record/month?year={year}&month={month}", "2023", "5"))
                    .andExpect(status().isNotFound())
                    .andReturn();

            doThrow(new RuntimeException()).when(recordService).findRecordByMonth(any(), any(), any());
            mockMvc.perform(get("/api/record/month?year={year}&month={month}", "2023", "5"))
                    .andExpect(status().isInternalServerError())
                    .andReturn();
        }

        @Test
        void findRecordByToday() throws Exception {

            doThrow(new CustomException(ErrorCode.NO_USER)).when(recordService).findRecordByToday(any());
            mockMvc.perform(get("/api/record").with(csrf()))
                    .andExpect(status().isNotFound())
                    .andReturn();

            doThrow(new RuntimeException()).when(recordService).findRecordByToday(any());
            mockMvc.perform(get("/api/record").with(csrf()))
                    .andExpect(status().isInternalServerError())
                    .andReturn();

        }

        @Test
        void findRecordByStartDay() throws Exception {
            doThrow(new CustomException(ErrorCode.NO_USER)).when(recordService).findRecordByStartDay(any());
            mockMvc.perform(get("/api/record/start").with(csrf()))
                    .andExpect(status().isNotFound())
                    .andReturn();

            doThrow(new RuntimeException()).when(recordService).findRecordByStartDay(any());
            mockMvc.perform(get("/api/record/start").with(csrf()))
                    .andExpect(status().isInternalServerError())
                    .andReturn();
        }

        @Test
        void findByMaintain() throws Exception {
            doThrow(new CustomException(ErrorCode.NO_USER)).when(recordService).findByMaintain(any());
            mockMvc.perform(get("/api/record/maintain").with(csrf()))
                    .andExpect(status().isNotFound())
                    .andReturn();

            doThrow(new RuntimeException()).when(recordService).findByMaintain(any());
            mockMvc.perform(get("/api/record/maintain").with(csrf()))
                    .andExpect(status().isInternalServerError())
                    .andReturn();
        }

        @Test
        void getAllRecordCount() throws Exception {
            doThrow(new CustomException(ErrorCode.NO_USER)).when(recordService).getAllRecordCount(any());
            mockMvc.perform(get("/api/record/statistics").with(csrf()))
                    .andExpect(status().isNotFound())
                    .andReturn();

            doThrow(new RuntimeException()).when(recordService).getAllRecordCount(any());
            mockMvc.perform(get("/api/record/statistics").with(csrf()))
                    .andExpect(status().isInternalServerError())
                    .andReturn();
        }
    }

    public Map<String, Map<String, List<RecordDto>>> toHashMap(List<Record> recordList){

        Map<String, Map<String, List<RecordDto>>> result = new HashMap<>(); // <날짜, <타입,기록List>>

        for(Record record : recordList){
            List<RecordDto> list = new ArrayList<>();
            Map<String, List<RecordDto>> categoryList = new HashMap<>();
            String time = record.getWriting_time().format(DateTimeFormatter.ofPattern("yyyyMMdd"));
            if(result.containsKey(time)){
                categoryList = result.get(time);
                if(categoryList.containsKey(record.getCategory())){
                    list = result.get(time).get(record.getCategory());
                }
            }
            list.add(record.toRecordDto());
            categoryList.put(record.getCategory(), list);
            result.put(time, categoryList);
        }
        return result;
    }
}