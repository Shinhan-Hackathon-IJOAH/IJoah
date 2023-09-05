package com.shinhan.shbhack.ijoa.api.controller.member;

import com.shinhan.shbhack.ijoa.api.service.member.dto.response.MemberDetailResponse;
import com.shinhan.shbhack.ijoa.domain.member.entity.Member;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping("/api/members")
@RequiredArgsConstructor
public class MemberController {

    @GetMapping
    @ApiOperation(value = "스웨거 테스트")
    public ResponseEntity<MemberDetailResponse> testapi(){
        MemberDetailResponse req = MemberDetailResponse.builder()
                .email("test")
                .build();
        return ResponseEntity.ok(req);
    }
}
