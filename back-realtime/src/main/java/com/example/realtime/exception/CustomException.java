package com.example.realtime.exception;

import com.example.realtime.exception.error.ErrorCode;

public class CustomException extends RuntimeException{
    
    private ErrorCode errorCode;

    public CustomException(ErrorCode errorCode) {
        super(errorCode.getMessage());
        this.errorCode = errorCode;
    }

    public ErrorCode getErrorCode() {
        return this.errorCode;
    }
}