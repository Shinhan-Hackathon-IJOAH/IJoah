package com.shinhan.shbhack.ijoa.api.service.member.dto.response;

import com.shinhan.shbhack.ijoa.domain.member.entity.Mission;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;

@Getter
@NoArgsConstructor
public class MissionSummaryResponse {

    @NotNull
    private Long missionId;

    @NotNull
    private String missionTitle;

    @NotNull
    private Long missionReward;

    @Builder
    public MissionSummaryResponse(Long missionId, String missionTitle, Long missionReward) {
        this.missionId = missionId;
        this.missionTitle = missionTitle;
        this.missionReward = missionReward;
    }

    public static MissionSummaryResponse of(Mission mission){
        return MissionSummaryResponse.builder()
                .missionId(mission.getId())
                .missionTitle(mission.getTitle())
                .missionReward(mission.getReward())
                .build();
    }
}
