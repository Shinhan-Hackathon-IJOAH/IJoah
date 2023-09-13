package com.shinhan.shbhack.ijoa.api.controller.member;

import com.shinhan.shbhack.ijoa.api.service.member.dto.response.MissionResponse;
import com.shinhan.shbhack.ijoa.api.service.member.query.MissionQueryService;
import com.shinhan.shbhack.ijoa.common.response.ApiData;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping("/api/missions")
@RequiredArgsConstructor
public class MissionController {

    private final MissionQueryService missionQueryService;

    @GetMapping("/{missionId}")
    @ApiOperation(value = "미션 정보 조회")
    public ApiData<MissionResponse> getMission(@PathVariable Long missionId){

        return ApiData.of(missionQueryService.getMission(missionId));
    }
}
