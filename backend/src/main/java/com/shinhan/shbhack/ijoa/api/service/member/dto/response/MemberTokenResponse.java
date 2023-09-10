package com.shinhan.shbhack.ijoa.api.service.member.dto.response;

import com.shinhan.shbhack.ijoa.common.model.JwtCreateModel;
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

    Long id;

    String name;

    String email;

    MemberRole memberRole;

    @Builder
    public MemberTokenResponse(String accessToken, String refreshToken, Long id, String name, String email, MemberRole memberRole) {
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
        this.id = id;
        this.name = name;
        this.email = email;
        this.memberRole = memberRole;
    }

    public static MemberTokenResponse of(String accessToken, String refreshToken, JwtCreateModel model){
        return MemberTokenResponse.builder()
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                .id(model.getId())
                .name(model.getName())
                .email(model.getEmail())
                .memberRole(model.getMemberRole())
                .build();
    }
}
