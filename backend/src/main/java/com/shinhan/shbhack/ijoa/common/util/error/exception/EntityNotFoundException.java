package com.shinhan.shbhack.ijoa.common.util.error.exception;

import com.shinhan.shbhack.ijoa.common.util.error.ErrorCode;

public class EntityNotFoundException extends ServiceRuntimeException {

    public EntityNotFoundException(String message) {
        super(message, ErrorCode.ENTITY_NOT_FOUND);
    }


    public EntityNotFoundException(String message, ErrorCode errorCode)  {
        super(message, errorCode);
    }
}
