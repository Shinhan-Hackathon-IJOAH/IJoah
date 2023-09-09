package com.shinhan.shbhack.ijoa.api.service.member.dto.request;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import static lombok.AccessLevel.PROTECTED;

@Getter
@NoArgsConstructor(access = PROTECTED)
public class MemberLoginServiceRequest {

    String email;

    String password;

    @Builder
    public MemberLoginServiceRequest(String email, String password) {
        this.email = email;
        this.password = password;
    }
}
