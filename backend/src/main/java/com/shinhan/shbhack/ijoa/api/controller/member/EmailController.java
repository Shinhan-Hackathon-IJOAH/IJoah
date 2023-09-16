package com.shinhan.shbhack.ijoa.api.controller.member;

import com.shinhan.shbhack.ijoa.api.controller.member.dto.request.EmailCheckRequest;
import com.shinhan.shbhack.ijoa.api.service.member.dto.request.EmailCheckServiceRequest;
import com.shinhan.shbhack.ijoa.api.service.member.query.EmailQueryService;
import com.shinhan.shbhack.ijoa.common.response.ApiData;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import javax.mail.MessagingException;
import java.io.UnsupportedEncodingException;

@Slf4j
@RestController
@RequestMapping("/api1/emails")
@RequiredArgsConstructor
public class EmailController {

    private final EmailQueryService emailQueryService;

    @PostMapping("/send")
    public ApiData<String> sendJoinEmail(@RequestParam("email") String email) throws MessagingException, UnsupportedEncodingException {
       emailQueryService.sendJoinEmail(email);
       return ApiData.of("이메일이 발송되었습니다.");
    }

    @PostMapping("/check")
    public ApiData<String> checkEmail(@RequestBody EmailCheckRequest request){
        emailQueryService.checkEmail(EmailCheckServiceRequest.of(request));
        return ApiData.of("인증이 성공하엿습니다!");
    }

    @GetMapping("/test")
    public ApiData<String> testToken(){
        return ApiData.of("토큰 유효성 검사에 성공했습니다");
    }
}