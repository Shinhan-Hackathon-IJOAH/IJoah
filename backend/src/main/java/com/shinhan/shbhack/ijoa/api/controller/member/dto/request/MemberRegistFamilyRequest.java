package com.shinhan.shbhack.ijoa.api.controller.member.dto.request;

import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;

@Getter
@NoArgsConstructor
public class MemberRegistFamilyRequest {

    @NotNull
    private Long parentId;

    @Email
    private String childEmail;


}
