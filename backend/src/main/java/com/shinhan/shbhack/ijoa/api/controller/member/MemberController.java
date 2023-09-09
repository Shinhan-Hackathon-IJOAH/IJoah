package com.shinhan.shbhack.ijoa.api.controller.member;

import com.shinhan.shbhack.ijoa.api.controller.member.dto.request.MemberCreateRequest;
import com.shinhan.shbhack.ijoa.api.controller.member.dto.request.MemberLoginRequest;
import com.shinhan.shbhack.ijoa.api.service.member.command.MemberService;
import com.shinhan.shbhack.ijoa.api.service.member.dto.response.MemberDetailResponse;
import com.shinhan.shbhack.ijoa.api.service.member.dto.response.MemberTokenResponse;
import com.shinhan.shbhack.ijoa.api.service.member.query.MemberQueryService;
import com.shinhan.shbhack.ijoa.common.dto.response.ApiPage;
import com.shinhan.shbhack.ijoa.common.dto.response.ApiData;
import com.shinhan.shbhack.ijoa.common.util.error.ErrorCode;
import com.shinhan.shbhack.ijoa.common.util.error.exception.ServiceRuntimeException;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@RestController
@RequestMapping("/api/members")
@RequiredArgsConstructor
public class MemberController {

    private final MemberService memberService;
    private final MemberQueryService memberQueryService;

    @PostMapping("/join")
    @ApiOperation(value = "회원 가입")
    public ApiData<String> joinMember(@RequestBody MemberCreateRequest request){
        memberService.createMember(request.toServiceRequest());

        return ApiData.of("회원가입에 성공하였습니다!");
    }

    @PostMapping("/login")
    @ApiOperation(value = "로그인")
    public ApiData<MemberTokenResponse> loginMember(@RequestBody MemberLoginRequest request){
        memberQueryService.loginMember(request.toServiceRequest());
    }


    @GetMapping("/single")
    @ApiOperation(value = "ApiSingleData test")
    public ApiData<MemberDetailResponse> testSingle(){
        MemberDetailResponse res = MemberDetailResponse.builder()
                                        .email("test")
                                        .build();

        return ApiData.of(res);
    }

    @GetMapping("/page")
    @ApiOperation(value = "ApiPage test")
    public ApiPage<List<MemberDetailResponse>> testPage(){
        MemberDetailResponse res = MemberDetailResponse.builder()
                .email("test")
                .build();

        List<MemberDetailResponse> memberDetailResponses = new ArrayList<>();
        memberDetailResponses.add(res);

        return ApiPage.of(memberDetailResponses, 1, 1, 1);
    }


    @GetMapping("/error")
    @ApiOperation(value = "ApiError test")
    public ApiData<MemberDetailResponse> testError(){
        throw new ServiceRuntimeException(ErrorCode.INVALID_INPUT_VALUE);

    }

}
