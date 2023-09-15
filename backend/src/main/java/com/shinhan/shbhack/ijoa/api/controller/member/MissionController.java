package com.shinhan.shbhack.ijoa.api.controller.member;

import com.shinhan.shbhack.ijoa.api.controller.member.dto.request.MissionCheckRequest;
import com.shinhan.shbhack.ijoa.api.controller.member.dto.request.MissionCreateRequest;
import com.shinhan.shbhack.ijoa.api.controller.member.dto.request.MissionListRequest;
import com.shinhan.shbhack.ijoa.api.service.member.command.MissionService;
import com.shinhan.shbhack.ijoa.api.service.member.dto.request.MissionCheckServiceRequest;
import com.shinhan.shbhack.ijoa.api.service.member.dto.request.MissionCreateServiceRequest;
import com.shinhan.shbhack.ijoa.api.service.member.dto.request.MissionListServiceRequest;
import com.shinhan.shbhack.ijoa.api.service.member.dto.response.MissionListResponse;
import com.shinhan.shbhack.ijoa.api.service.member.dto.response.MissionResponse;
import com.shinhan.shbhack.ijoa.api.service.member.query.MissionQueryService;
import com.shinhan.shbhack.ijoa.common.response.ApiData;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/api1/missions")
@RequiredArgsConstructor
public class MissionController {

    private final MissionService missionService;
    private final MissionQueryService missionQueryService;

    @GetMapping("/{missionId}")
    @ApiOperation(value = "미션 정보 조회")
    public ApiData<MissionResponse> getMission(@PathVariable Long missionId){

        return ApiData.of(missionQueryService.getMission(missionId));
    }

    @PostMapping("/list")
    @ApiOperation(value = "미션 리스트")
    public ApiData<MissionListResponse> getMissionList(@RequestBody MissionListRequest request){
        return ApiData.of(missionQueryService.getMissionList(MissionListServiceRequest.of(request)));
    }

    @PostMapping("/create")
    @ApiOperation(value = "미션 생성")
    public ApiData<String> createMission(@RequestBody MissionCreateRequest request){
        missionService.createMission((MissionCreateServiceRequest.of(request)));
        return ApiData.of("미션 생성에 성공하였습니다.");
    }

    @PostMapping("/check")
    @ApiOperation(value = "미션 수락 or 거절")
    public ApiData<String> checkMission(@RequestBody MissionCheckRequest request){
        missionService.checkMission(MissionCheckServiceRequest.of(request));
        return ApiData.of("미션 상태 변환에 성공하였습니다.");
    }




}
