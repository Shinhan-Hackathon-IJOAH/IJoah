package com.shinhan.shbhack.ijoa.common.error.exception;

import com.shinhan.shbhack.ijoa.common.error.ErrorCode;
import lombok.Getter;

@Getter
public class ServiceRuntimeException extends RuntimeException {

    private ErrorCode errorCode;

    public ServiceRuntimeException(String message, ErrorCode errorCode) {
        super(message);
        this.errorCode = errorCode;
    }

    public ServiceRuntimeException(ErrorCode errorCode) {
        super(errorCode.getMessage());
        this.errorCode = errorCode;
    }

}
