package com.shinhan.shbhack.ijoa.api.controller.member;

import com.shinhan.shbhack.ijoa.api.service.member.dto.response.MemberDetailResponse;
import com.shinhan.shbhack.ijoa.common.dto.response.ApiPage;
import com.shinhan.shbhack.ijoa.common.dto.response.ApiData;
import com.shinhan.shbhack.ijoa.common.util.error.ErrorCode;
import com.shinhan.shbhack.ijoa.common.util.error.exception.ServiceRuntimeException;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@RestController
@RequestMapping("/api/members")
@RequiredArgsConstructor
public class MemberController {

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
