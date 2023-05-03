package com.example.selog.exception.error;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
@AllArgsConstructor
public enum ErrorCode {

    INVALID_INPUT(HttpStatus.METHOD_NOT_ALLOWED, "405", "기입되지 않은 정보가 있습니다"),
    INTERNAL_SERVER_ERROR(HttpStatus.INTERNAL_SERVER_ERROR, "500", "서버 내부 에러"),
    EMAIL_DUPLICATION(HttpStatus.CONFLICT, "409", "이미 존재하는 이메일입니다."),
    USER_DUPLICATION(HttpStatus.CONFLICT, "409", "이미 존재하는 사용자입니다."),
    NO_USER(HttpStatus.NOT_FOUND, "404", "없는 사용자입니다."),
    INVALID_PASSWORD(HttpStatus.BAD_REQUEST, "400", "비밀번호가 옳지 않습니다."),
    INVALID_REQUEST(HttpStatus.BAD_REQUEST,"400","올바르지 않은 요청"),
    NO_LOGIN(HttpStatus.UNAUTHORIZED, "401", "로그인이 필요합니다"),
    NO_TOKEN(HttpStatus.UNAUTHORIZED, "401", "Refresh Token 이 유효하지 않습니다."),
    NO_GITHUB_TOKEN(HttpStatus.UNAUTHORIZED, "401", "Github Token 이 없습니다."),

    NO_ROOM(HttpStatus.NOT_FOUND, "404", "방이 존재하지 않습니다."),
    NO_ITEM(HttpStatus.NOT_FOUND, "404", "아이템을 소유하고 있지 않습니다."),

    CONFLICT_ALGO(HttpStatus.CONFLICT, "409", "이미 기록한 문제입니다."),
    CONFLICT_ROOM(HttpStatus.CONFLICT, "409", "이미 방이 존재합니다."),
    NO_TARGET(HttpStatus.NOT_FOUND, "404", "목표 설정이 되어 있지 않아 기록이 되지 않습니다."),
    WEBHOOK_CONFLICT(HttpStatus.BAD_REQUEST, "405", "웹훅이 이미 설정 되어있습니다.");

    private HttpStatus httpStatus;
    private String code;
    private String message;
}
