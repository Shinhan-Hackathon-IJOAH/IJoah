package com.shinhan.shbhack.ijoa.api.controller.member;

import com.shinhan.shbhack.ijoa.api.controller.member.dto.request.MissionListRequest;
import com.shinhan.shbhack.ijoa.api.service.member.dto.request.MissionListServiceRequest;
import com.shinhan.shbhack.ijoa.api.service.member.dto.response.MissionListResponse;
import com.shinhan.shbhack.ijoa.api.service.member.dto.response.MissionResponse;
import com.shinhan.shbhack.ijoa.api.service.member.query.MissionQueryService;
import com.shinhan.shbhack.ijoa.common.response.ApiData;
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

}
