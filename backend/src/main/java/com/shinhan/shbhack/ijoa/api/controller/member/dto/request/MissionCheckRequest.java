package com.shinhan.shbhack.ijoa.api.controller.member.dto.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.shinhan.shbhack.ijoa.domain.member.entity.enums.MemberRole;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;

@Getter
@NoArgsConstructor
public class MissionCheckRequest {

    @NotNull
    private Long memberId;

    @NotNull
    private MemberRole memberRole;

    @NotNull
    private Long missionId;

    @NotNull
    @JsonProperty("isAccept")
    private boolean isAccept;


}
