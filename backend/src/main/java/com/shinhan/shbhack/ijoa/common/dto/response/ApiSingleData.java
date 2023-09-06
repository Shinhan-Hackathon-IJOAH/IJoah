package com.shinhan.shbhack.ijoa.common.dto.response;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public class ApiSingleData<T> extends ApiResult {

    private final T data;

    private ApiSingleData(T data){
        super(HttpStatus.OK.value(), HttpStatus.OK.name());
        this.data = data;
    }

    public static <T> ApiSingleData<T> of(T data){
        return new ApiSingleData<>(data);
    }
}
