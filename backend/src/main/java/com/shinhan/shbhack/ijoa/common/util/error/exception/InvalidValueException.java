package com.shinhan.shbhack.ijoa.common.util.error.exception;

import com.shinhan.shbhack.ijoa.common.util.error.ErrorCode;

public class InvalidValueException extends ServiceRuntimeException {

    public InvalidValueException(String value) {
        super(value, ErrorCode.INVALID_INPUT_VALUE);
    }

    public InvalidValueException(String value, ErrorCode errorCode) {
        super(value, errorCode);
    }

}
