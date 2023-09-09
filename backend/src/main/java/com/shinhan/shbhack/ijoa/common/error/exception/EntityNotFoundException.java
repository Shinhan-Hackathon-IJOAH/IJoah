package com.shinhan.shbhack.ijoa.common.error.exception;

import com.shinhan.shbhack.ijoa.common.error.ErrorCode;

public class EntityNotFoundException extends ServiceRuntimeException {

    public EntityNotFoundException(ErrorCode errorCode){
        super(errorCode);
    }

}
