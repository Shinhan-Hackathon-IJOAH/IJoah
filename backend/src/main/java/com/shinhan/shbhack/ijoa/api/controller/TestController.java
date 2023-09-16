package com.shinhan.shbhack.ijoa.api.controller;

import com.shinhan.shbhack.ijoa.common.response.ApiData;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping("/api1/tests")
@RequiredArgsConstructor
public class TestController {

    @GetMapping("/test")
    public ApiData<String> testToken(){
        return ApiData.of("토큰 유효성 검사에 성공했습니다");
    }
}
