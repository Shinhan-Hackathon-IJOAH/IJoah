package com.shinhan.shbhack.ijoa.api.service.member.dto.request;

import com.shinhan.shbhack.ijoa.api.controller.member.dto.request.EmailCheckRequest;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import static lombok.AccessLevel.PROTECTED;

@Getter
@NoArgsConstructor
public class EmailCheckServiceRequest {

    String email;
    String code;

    @Builder
    public EmailCheckServiceRequest(String email, String code) {
        this.email = email;
        this.code = code;
    }

    public static EmailCheckServiceRequest of(EmailCheckRequest request){
        return EmailCheckServiceRequest.builder()
                .email(request.getEmail())
                .code(request.getCode())
                .build();
    }
}
