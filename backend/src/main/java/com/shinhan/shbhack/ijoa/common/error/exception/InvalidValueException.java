package com.shinhan.shbhack.ijoa.common.error.exception;

import com.shinhan.shbhack.ijoa.common.error.ErrorCode;

public class InvalidValueException extends ServiceRuntimeException {

    public InvalidValueException(ErrorCode errorCode){
        super(errorCode);
    }

}
