package com.example.selog.controller;

import com.example.selog.dto.room.StoreItemDto;
import com.example.selog.exception.CustomException;
import com.example.selog.exception.error.ErrorCode;
import com.example.selog.response.ErrorResponse;
import com.example.selog.response.SuccessResponse;
import com.example.selog.service.StoreService;
import com.example.selog.util.SecurityUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/store")
public class StoreController {
    private final StoreService storeService;
    @GetMapping
    public ResponseEntity<?> findAllItem() {
        try{
            List<StoreItemDto> userItemDtoList = null;
            //storeService.findAllItem(SecurityUtil.getCurrentMemberId());
            return new ResponseEntity<>(new SuccessResponse(userItemDtoList), HttpStatus.OK);
        } catch(CustomException e){
            return new ResponseEntity<>(new ErrorResponse(e.getErrorCode().getHttpStatus(),e.getMessage()), e.getErrorCode().getHttpStatus());
        } catch (Exception e){
            return new ResponseEntity<>(new ErrorResponse(ErrorCode.INTERNAL_SERVER_ERROR),HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
