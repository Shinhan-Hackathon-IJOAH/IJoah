package com.shinhan.shbhack.ijoa.api.controller.member;

import com.shinhan.shbhack.ijoa.api.controller.member.dto.request.MemberRegistFamilyRequest;
import com.shinhan.shbhack.ijoa.api.service.member.command.FamilyService;
import com.shinhan.shbhack.ijoa.api.service.member.command.MemberService;
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

    @PostMapping("/regist")
    @ApiOperation(value = "아이 등록")
    public ApiData<String> registFamily(@RequestBody MemberRegistFamilyRequest request){
        // TODO: 2023-09-14 need refactoring
        familyService.registFamily(MemberRegistFamilyServiceRequest.of(request));
        return ApiData.of("아이 등록이 성공하였습니다!");
    }


}
