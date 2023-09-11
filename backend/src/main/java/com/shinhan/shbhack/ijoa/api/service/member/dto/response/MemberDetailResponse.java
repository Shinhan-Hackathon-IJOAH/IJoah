package com.shinhan.shbhack.ijoa.api.service.member.dto.response;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import static lombok.AccessLevel.PROTECTED;

@Getter
@NoArgsConstructor
public class MemberDetailResponse {

    private String email;

    @Builder
    public MemberDetailResponse(String email) {
        this.email = email;
    }
}
