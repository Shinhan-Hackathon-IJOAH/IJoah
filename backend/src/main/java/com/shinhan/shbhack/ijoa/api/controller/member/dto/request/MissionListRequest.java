package com.shinhan.shbhack.ijoa.api.controller.member.dto.request;

import com.shinhan.shbhack.ijoa.domain.member.entity.enums.MemberRole;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;

@Getter
@NoArgsConstructor
public class MissionListRequest {

    @NotNull
    private Long memberId;

    @NotNull
    private MemberRole memberRole;
}
