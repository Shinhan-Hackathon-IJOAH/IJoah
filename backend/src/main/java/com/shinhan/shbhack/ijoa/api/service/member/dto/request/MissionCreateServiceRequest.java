package com.shinhan.shbhack.ijoa.api.service.member.dto.request;

import com.shinhan.shbhack.ijoa.api.controller.member.dto.request.MissionCreateRequest;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;
import java.time.LocalDate;

@Getter
@NoArgsConstructor
public class MissionCreateServiceRequest {

    private Long parentId;

    private Long childId;

    private String missionTitle;

    private String missionContent;

    private Long missionReward;

    private LocalDate missionStartDate;

    private LocalDate missionEndDate;

    @Builder
    public MissionCreateServiceRequest(Long parentId, Long childId, String missionTitle, String missionContent, Long missionReward, LocalDate missionStartDate, LocalDate missionEndDate) {
        this.parentId = parentId;
        this.childId = childId;
        this.missionTitle = missionTitle;
        this.missionContent = missionContent;
        this.missionReward = missionReward;
        this.missionStartDate = missionStartDate;
        this.missionEndDate = missionEndDate;
    }

    public static MissionCreateServiceRequest of(MissionCreateRequest request){
        return MissionCreateServiceRequest.builder()
                .parentId(request.getParentId())
                .childId(request.getChildId())
                .missionTitle(request.getMissionTitle())
                .missionContent(request.getMissionContent())
                .missionReward(request.getMissionReward())
                .missionStartDate(request.getMissionStartDate())
                .missionEndDate(request.getMissionEndDate())
                .build();
    }
}
