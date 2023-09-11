package com.shinhan.shbhack.ijoa.api.controller.member;

import com.shinhan.shbhack.ijoa.api.controller.member.dto.request.MemberCreateRequest;
import com.shinhan.shbhack.ijoa.api.controller.member.dto.request.MemberLoginRequest;
import com.shinhan.shbhack.ijoa.api.controller.member.dto.request.MemberUpdateRequest;
import com.shinhan.shbhack.ijoa.api.service.member.command.MemberService;
import com.shinhan.shbhack.ijoa.api.service.member.dto.request.MemberUpdateServiceRequest;
import com.shinhan.shbhack.ijoa.api.service.member.dto.response.MemberChildHomeResponse;
import com.shinhan.shbhack.ijoa.api.service.member.dto.response.MemberParentHomeResponse;
import com.shinhan.shbhack.ijoa.api.service.member.dto.response.MemberTokenResponse;
import com.shinhan.shbhack.ijoa.api.service.member.query.MemberQueryService;
import com.shinhan.shbhack.ijoa.common.dto.response.ApiData;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@Slf4j
@RestController
@RequestMapping("/api/members")
@RequiredArgsConstructor
public class MemberController {

    private final MemberService memberService;
    private final MemberQueryService memberQueryService;

    @PostMapping("/join")
    @ApiOperation(value = "회원 가입")
    public ApiData<String> joinMember(@RequestBody @Valid MemberCreateRequest request){
        memberService.createMember(request.toServiceRequest());

        return ApiData.of("회원가입에 성공하였습니다!");
    }

    @PostMapping("/login")
    @ApiOperation(value = "로그인")
    public ApiData<MemberTokenResponse> loginMember(@RequestBody @Valid MemberLoginRequest request){
        return ApiData.of(memberQueryService.loginMember(request.toServiceRequest()));
    }

    @GetMapping("/parent/{memberId}")
    @ApiOperation(value = "부모 종합 정보")
    public ApiData<MemberParentHomeResponse> parentHome(@PathVariable Long memberId){
        return ApiData.of(memberService.parentHome(memberId));
    }

    @GetMapping("/child/{memberId}")
    @ApiOperation(value = "아이 종합 정보")
    public ApiData<MemberChildHomeResponse> childHome(@PathVariable Long memberId){
        return ApiData.of(memberService.childHome(memberId));
    }

    @PutMapping("/modify")
    @ApiOperation(value = "회원 정보 수정")
    public ApiData<String> updateMember(@RequestBody MemberUpdateRequest request){
        memberService.updateMember(request.toServiceRequest());
        return ApiData.of("회원 정보 수정이 완료되었습니다!");
    }





}
