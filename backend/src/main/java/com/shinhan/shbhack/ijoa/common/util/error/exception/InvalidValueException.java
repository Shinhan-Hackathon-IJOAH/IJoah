package com.shinhan.shbhack.ijoa.common.util.error.exception;

import com.shinhan.shbhack.ijoa.common.util.error.ErrorCode;

public class InvalidValueException extends ServiceRuntimeException {

    public InvalidValueException(ErrorCode errorCode){
        super(errorCode);
    }

}
