package com.shinhan.shbhack.ijoa.api.controller.member.dto.request;

import com.shinhan.shbhack.ijoa.api.service.member.dto.request.MemberCreateServiceRequest;
import com.shinhan.shbhack.ijoa.api.service.member.dto.request.MemberLoginServiceRequest;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

import static lombok.AccessLevel.PROTECTED;

@Getter
@NoArgsConstructor
public class MemberLoginRequest {

    @Email
    @Size(max = 40)
    @NotNull
    private String email;

    @NotNull
    private String password;

    public MemberLoginServiceRequest toServiceRequest(){
        return MemberLoginServiceRequest.builder()
                .email(email)
                .password(password)
                .build();
    }
}
