package com.shinhan.shbhack.ijoa.common.model;

import com.shinhan.shbhack.ijoa.domain.member.entity.enums.MemberRole;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import static lombok.AccessLevel.PROTECTED;

@Getter
@NoArgsConstructor(access = PROTECTED)
public class JwtCreateModel {

    Long id;

    Long email;

    MemberRole memberRole;

    @Builder
    public JwtCreateModel(Long id, Long email, MemberRole memberRole) {
        this.id = id;
        this.email = email;
        this.memberRole = memberRole;
    }
}
