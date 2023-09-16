package com.shinhan.shbhack.ijoa.api.controller.member;

import com.shinhan.shbhack.ijoa.api.controller.member.dto.request.EmailCheckRequest;
import com.shinhan.shbhack.ijoa.api.service.member.dto.request.EmailCheckServiceRequest;
import com.shinhan.shbhack.ijoa.api.service.member.query.EmailQueryService;
import com.shinhan.shbhack.ijoa.api.service.member.query.MemberQueryService;
import com.shinhan.shbhack.ijoa.common.response.ApiData;
import com.shinhan.shbhack.ijoa.common.util.EmailUtil;
import com.shinhan.shbhack.ijoa.common.util.RedisUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import javax.mail.MessagingException;
import javax.validation.Valid;
import javax.validation.constraints.Email;
import java.io.UnsupportedEncodingException;

@Slf4j
@RestController
@RequestMapping("/api1/emails")
@RequiredArgsConstructor
public class EmailController {

    private final EmailQueryService emailQueryService;
    private final EmailUtil emailUtil;
    private final RedisUtil redisUtil;

    @PostMapping("/send")
    public ApiData<String> sendJoinEmail(@RequestParam("email") @Email String email) throws MessagingException, UnsupportedEncodingException {
        // TODO: 2023-09-11 need refactoring

        String code = emailQueryService.sendEmail(email);

        emailUtil.joinEmail(email, code);
        redisUtil.setEmail(email, code);

        return ApiData.of("이메일이 발송되었습니다.");
    }

    @PostMapping("/check")
    public ApiData<String> checkEmail(@RequestBody @Valid EmailCheckRequest request){
        emailQueryService.checkEmail(EmailCheckServiceRequest.of(request));

        return ApiData.of("인증이 성공하엿습니다!");
    }
}