package com.shinhan.shbhack.ijoa.common.model;

import com.shinhan.shbhack.ijoa.api.service.member.dto.response.MemberTokenResponse;
import com.shinhan.shbhack.ijoa.domain.member.entity.Member;
import com.shinhan.shbhack.ijoa.domain.member.entity.enums.MemberRole;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import static lombok.AccessLevel.PROTECTED;

@Getter
@NoArgsConstructor
public class JwtCreateModel {

    Long id;
    String name;
    String email;
    MemberRole memberRole;

    @Builder
    public JwtCreateModel(Long id, String name, String email, MemberRole memberRole) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.memberRole = memberRole;
    }

    public static JwtCreateModel of(Member member){
        return JwtCreateModel.builder()
                .id(member.getId())
                .name(member.getName())
                .email(member.getEmail())
                .memberRole(member.getMemberRole())
                .build();
    }
}
