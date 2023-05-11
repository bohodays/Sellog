package com.example.selog.exception;

import org.springframework.web.client.RestClientException;

public class OpenAIException extends RestClientException {
    public OpenAIException(String message) {
        super(message);
    }

    public OpenAIException(String message, Throwable cause) {
        super(message, cause);
    }

}
