package com.shinhan.shbhack.ijoa.common.dto.response;

import com.shinhan.shbhack.ijoa.common.error.ErrorCode;
import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
public class ApiError extends ApiResult {

    private String message;

    private ApiError(int status, String code, String message){
        super(status, code);
        this.message = message;
    }

    public static ApiError of(ErrorCode errorCode){
        return new ApiError(errorCode.getStatus(), errorCode.getCode(), errorCode.getMessage());
    }

//    public String toStream(){
//        return "{" +
//                "\"status\":" + "\"" + this.getStatus()
//    }
}
