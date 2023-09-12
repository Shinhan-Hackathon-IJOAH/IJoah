package com.shinhan.shbhack.ijoa.api.controller.member.dto.request;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;

@Getter
@NoArgsConstructor
public class MemberModifyRequest {

    @NotNull
    private Long id;

    private String password;

}
