package com.example.realtime.exception.error;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
@AllArgsConstructor
public enum ErrorCode {

    INTERNAL_SERVER_ERROR(HttpStatus.INTERNAL_SERVER_ERROR, "500", "서버 내부 에러"),
    NO_USER(HttpStatus.NOT_FOUND, "404", "없는 사용자입니다.");

    private HttpStatus httpStatus;
    private String code;
    private String message;
}
