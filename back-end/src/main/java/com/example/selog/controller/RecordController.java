package com.example.selog.controller;

import com.example.selog.dto.record.RecordDto;
import com.example.selog.entity.Record;
import com.example.selog.exception.CustomException;
import com.example.selog.exception.error.ErrorCode;
import com.example.selog.response.ErrorResponse;
import com.example.selog.response.SuccessResponse;
import com.example.selog.service.RecordService;
import com.example.selog.util.SecurityUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@Slf4j
@RequiredArgsConstructor
@RequestMapping("/api/record")
@RestController
public class RecordController {

    private final RecordService recordService;

    /**
     * 달력 클릭했을 때 월별로 가져오기
     */
    @GetMapping("/month")
    public ResponseEntity<?> findRecordByMonth(@RequestParam String year, @RequestParam String month) {
        try{
            Map<String, Map<String, List<RecordDto>>> result = recordService.findRecordByMonth(year, month, SecurityUtil.getCurrentMemberId());
            return new ResponseEntity<>(new SuccessResponse(result), HttpStatus.OK);
        } catch(CustomException e){
            return new ResponseEntity<>(new ErrorResponse(e.getErrorCode().getHttpStatus(),e.getMessage()), e.getErrorCode().getHttpStatus());
        } catch (Exception e){
            return new ResponseEntity<>(new ErrorResponse(ErrorCode.INTERNAL_SERVER_ERROR),HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping
    public ResponseEntity<?> findRecordByToday() {
        try{
            Map<String, List<RecordDto>> result = recordService.findRecordByToday(SecurityUtil.getCurrentMemberId());
            return new ResponseEntity<>(new SuccessResponse(result), HttpStatus.OK);
        } catch(CustomException e){
            return new ResponseEntity<>(new ErrorResponse(e.getErrorCode().getHttpStatus(),e.getMessage()), e.getErrorCode().getHttpStatus());
        } catch (Exception e){
            return new ResponseEntity<>(new ErrorResponse(ErrorCode.INTERNAL_SERVER_ERROR),HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping
    public ResponseEntity<?> findRecordByStartDay() {
        try{
            Map<String, Map<String, List<RecordDto>>> result = recordService.findRecordByStartDay(SecurityUtil.getCurrentMemberId());
            return new ResponseEntity<>(new SuccessResponse(result), HttpStatus.OK);
        } catch(CustomException e){
            return new ResponseEntity<>(new ErrorResponse(e.getErrorCode().getHttpStatus(),e.getMessage()), e.getErrorCode().getHttpStatus());
        } catch (Exception e){
            return new ResponseEntity<>(new ErrorResponse(ErrorCode.INTERNAL_SERVER_ERROR),HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
