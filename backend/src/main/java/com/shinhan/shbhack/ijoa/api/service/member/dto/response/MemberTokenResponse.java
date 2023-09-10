package com.shinhan.shbhack.ijoa.api.service.member.dto.response;

import com.shinhan.shbhack.ijoa.domain.member.entity.enums.MemberRole;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import static lombok.AccessLevel.PROTECTED;

@Getter
@NoArgsConstructor(access = PROTECTED)
public class MemberTokenResponse {

    String accessToken;

    String refreshToken;

    String name;

    String email;

    MemberRole memberRole;

    @Builder
    public MemberTokenResponse(String accessToken, String refreshToken, String name, String email, MemberRole memberRole) {
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
        this.name = name;
        this.email = email;
        this.memberRole = memberRole;
    }
}
