package com.shinhan.shbhack.ijoa.common.util.error.exception;

import com.shinhan.shbhack.ijoa.common.util.error.ErrorCode;

public class EntityNotFoundException extends ServiceRuntimeException {

    public EntityNotFoundException(ErrorCode errorCode){
        super(errorCode);
    }

}
