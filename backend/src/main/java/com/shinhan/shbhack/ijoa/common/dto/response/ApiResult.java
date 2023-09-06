package com.shinhan.shbhack.ijoa.common.dto.response;

import com.shinhan.shbhack.ijoa.common.util.error.ErrorCode;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;

@Getter
@Slf4j
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class ApiResult {
    private int status; //200
    private String code; // OK, BAD_REQUEST...

    public static ApiResult of(){
        ApiResult res = new ApiResult(HttpStatus.OK.value(), HttpStatus.OK.name());
        return res;
    }

    public static ApiResult of(int status, String code){
        return new ApiResult(status, code);
    }
}

