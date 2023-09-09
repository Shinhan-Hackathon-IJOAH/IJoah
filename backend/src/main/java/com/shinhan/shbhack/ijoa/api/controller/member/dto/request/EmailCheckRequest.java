package com.shinhan.shbhack.ijoa.api.controller.member.dto.request;

import com.shinhan.shbhack.ijoa.api.service.member.dto.request.EmailCheckServiceRequest;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import static lombok.AccessLevel.PROTECTED;

@Getter
@NoArgsConstructor(access = PROTECTED)
public class EmailCheckRequest {

    String email;
    String code;

    public EmailCheckServiceRequest toServiceRequest(){
        return EmailCheckServiceRequest.builder()
                .email(email)
                .code(code)
                .build();
    }
}
