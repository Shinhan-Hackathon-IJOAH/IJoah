package com.shinhan.shbhack.ijoa.api.service.member.dto.request;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import static lombok.AccessLevel.PROTECTED;

@Getter
@NoArgsConstructor(access = PROTECTED)
public class EmailCheckServiceRequest {

    String email;
    String code;

    @Builder
    public EmailCheckServiceRequest(String email, String code) {
        this.email = email;
        this.code = code;
    }
}
