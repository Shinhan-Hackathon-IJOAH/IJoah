package com.shinhan.shbhack.ijoa.api.service.member.dto.request;

import com.shinhan.shbhack.ijoa.api.controller.member.dto.request.MemberLoginRequest;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import static lombok.AccessLevel.PROTECTED;

@Getter
@NoArgsConstructor
public class MemberLoginServiceRequest {

    String email;

    String password;

    @Builder
    public MemberLoginServiceRequest(String email, String password) {
        this.email = email;
        this.password = password;
    }

    public static MemberLoginServiceRequest of(MemberLoginRequest request){
        return MemberLoginServiceRequest.builder()
                .email(request.getEmail())
                .password(request.getPassword())
                .build();
    }
}
