package com.shinhan.shbhack.ijoa.api.controller.member;

import com.shinhan.shbhack.ijoa.api.controller.member.dto.request.MemberPermitFamilyRequest;
import com.shinhan.shbhack.ijoa.api.controller.member.dto.request.MemberRegistFamilyRequest;
import com.shinhan.shbhack.ijoa.api.service.member.command.FamilyService;
import com.shinhan.shbhack.ijoa.api.service.member.command.MemberService;
import com.shinhan.shbhack.ijoa.api.service.member.dto.request.MemberPermitFamilyServiceRequest;
import com.shinhan.shbhack.ijoa.api.service.member.dto.request.MemberRegistFamilyServiceRequest;
import com.shinhan.shbhack.ijoa.api.service.member.query.FamilyQueryService;
import com.shinhan.shbhack.ijoa.common.response.ApiData;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping("api1/families")
@RequiredArgsConstructor
public class FamilyController {

    private final FamilyService familyService;
    private final FamilyQueryService familyQueryService;

    @PostMapping("/registchild")
    @ApiOperation(value = "아이 등록 요청")
    public ApiData<String> registFamily(@RequestBody MemberRegistFamilyRequest request){
        // TODO: 2023-09-14 need refactoring
        familyService.registFamily(MemberRegistFamilyServiceRequest.of(request));
        return ApiData.of("아이 등록이 성공하였습니다!");
    }

    @PostMapping("/permitchild")
    @ApiOperation(value = "아이 등록 허락 요청")
    public ApiData<String> permitFamily(@RequestBody MemberPermitFamilyRequest request){
        // TODO: 2023-09-14 need refactoring
        familyService.permitFamily(MemberPermitFamilyServiceRequest.of(request));
        return ApiData.of("아이 등록이 성공하였습니다!");
    }

    @PostMapping("/rejectchild")
    @ApiOperation(value = "아이 등록 거절 요청")
    public ApiData<String> regectFamily(@RequestBody MemberPermitFamilyRequest request){
        // TODO: 2023-09-14 need refactoring
        familyService.noPermitFamily(MemberPermitFamilyServiceRequest.of(request));
        return ApiData.of("등록 거절이 성공하였습니다!");
    }


}
