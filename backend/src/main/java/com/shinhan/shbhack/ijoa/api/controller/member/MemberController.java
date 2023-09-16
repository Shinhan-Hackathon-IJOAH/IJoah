package com.shinhan.shbhack.ijoa.api.controller.member;

import com.shinhan.shbhack.ijoa.api.controller.member.dto.request.MemberCreateRequest;
import com.shinhan.shbhack.ijoa.api.controller.member.dto.request.MemberLoginRequest;
import com.shinhan.shbhack.ijoa.api.controller.member.dto.request.MemberModifyRequest;
import com.shinhan.shbhack.ijoa.api.controller.member.dto.request.MemberRegistFamilyRequest;
import com.shinhan.shbhack.ijoa.api.service.member.command.MemberService;
import com.shinhan.shbhack.ijoa.api.service.member.dto.request.MemberCreateServiceRequest;
import com.shinhan.shbhack.ijoa.api.service.member.dto.request.MemberLoginServiceRequest;
import com.shinhan.shbhack.ijoa.api.service.member.dto.request.MemberRegistFamilyServiceRequest;
import com.shinhan.shbhack.ijoa.api.service.member.dto.response.MemberChildHomeResponse;
import com.shinhan.shbhack.ijoa.api.service.member.dto.request.MemberModifyServiceRequest;
import com.shinhan.shbhack.ijoa.api.service.member.dto.response.MemberParentHomeResponse;
import com.shinhan.shbhack.ijoa.api.service.member.dto.response.MemberTokenResponse;
import com.shinhan.shbhack.ijoa.api.service.member.query.MemberQueryService;
import com.shinhan.shbhack.ijoa.common.model.UserDetailsModel;
import com.shinhan.shbhack.ijoa.common.response.ApiData;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.hibernate.annotations.GeneratorType;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;

@Slf4j
@RestController
@RequestMapping("/api1/members")
@RequiredArgsConstructor
public class MemberController {

    private final MemberService memberService;
    private final MemberQueryService memberQueryService;

    @PostMapping("/join")
    @ApiOperation(value = "회원 가입")
    public ApiData<String> joinMember(@RequestBody MemberCreateRequest request){
        memberService.createMember(MemberCreateServiceRequest.of(request));

        return ApiData.of("회원가입에 성공하였습니다!");
    }

    @PostMapping("/login")
    @ApiOperation(value = "로그인")
    public ApiData<MemberTokenResponse> loginMember(@RequestBody MemberLoginRequest request){
        return ApiData.of(memberQueryService.loginMember(MemberLoginServiceRequest.of(request)));
    }

    @GetMapping("/logout")
    @ApiOperation(value = "로그아웃")
    public ApiData<String> logoutMember(@AuthenticationPrincipal UserDetailsModel model){
        memberQueryService.logoutMember(model);
        return ApiData.of("로그아웃에 성공하였습니다.");
    }

    @GetMapping("/parent/{memberId}")
    @ApiOperation(value = "부모 종합 정보")
    public ApiData<MemberParentHomeResponse> parentHome(@PathVariable Long memberId, @AuthenticationPrincipal UserDetailsModel model){
        log.debug("id: {}, name: {}, email: {}, memberRole: {}", model.getId(), model.getName(), model.getEmail(), model.getRole());
        return ApiData.of(memberService.parentHome(memberId));
    }

    @GetMapping("/child/{memberId}")
    @ApiOperation(value = "아이 종합 정보")
    public ApiData<MemberChildHomeResponse> childHome(@PathVariable Long memberId, @AuthenticationPrincipal UserDetailsModel model){
        log.debug("id: {}, name: {}, email: {}, memberRole: {}", model.getId(), model.getName(), model.getEmail(), model.getRole());
        return ApiData.of(memberService.childHome(memberId));
    }

//    @GetMapping("/info")
//    @ApiOperation(value = "종합 정보")
//    public ApiData<Member>

    @PutMapping("/modify")
    @ApiOperation(value = "회원 정보 수정")
    public ApiData<String> updateMember(@RequestPart(name = "file")MultipartFile file,
                                        @RequestPart(name = "request") MemberModifyRequest request){
        memberService.updateMember(MemberModifyServiceRequest.of(request), file);
        return ApiData.of("회원 정보 수정이 완료되었습니다!");
    }

}
