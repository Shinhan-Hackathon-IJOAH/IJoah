package com.shinhan.shbhack.ijoa.common.model;

import com.shinhan.shbhack.ijoa.api.service.member.dto.response.MemberTokenResponse;
import com.shinhan.shbhack.ijoa.domain.member.entity.enums.MemberRole;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import static lombok.AccessLevel.PROTECTED;

@Getter
@NoArgsConstructor
public class JwtCreateModel {


    String email;
    MemberRole memberRole;

    @Builder
    public JwtCreateModel(String email, MemberRole memberRole) {
        this.email = email;
        this.memberRole = memberRole;
    }
}
