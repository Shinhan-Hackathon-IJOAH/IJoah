package com.shinhan.shbhack.ijoa.api.controller.member.requestdto;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import static lombok.AccessLevel.PROTECTED;

@Getter
@NoArgsConstructor(access = PROTECTED)
public class MemberRequest {

    private String email;

    @Builder
    public MemberRequest(String email) {
        this.email = email;
    }
}
