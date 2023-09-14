package com.shinhan.shbhack.ijoa.api.controller.member.dto.request;

import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;
import java.time.LocalDate;

@Getter
@NoArgsConstructor
public class MissionCreateRequest {

    @NotNull
    private Long parentId;

    @NotNull
    private Long childId;

    @NotNull
    private String missionTitle;

    @NotNull
    private String missionContent;

    @NotNull
    private Long missionReward;

    @NotNull
    private LocalDate missionStartDate;

    @NotNull
    private LocalDate missionEndDate;


}
