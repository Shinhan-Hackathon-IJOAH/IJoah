package com.shinhan.shbhack.ijoa.api.controller.member;

import com.shinhan.shbhack.ijoa.api.controller.member.requestdto.MemberRequest;
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

    /**
     * 원래는 반환은 response dto 반환해야하지만 이번엔 테스트라 request 반환
     * @return
     */
    @GetMapping
    @ApiOperation(value = "스웨거 테스트")
    public ResponseEntity<MemberRequest> testapi(){
        MemberRequest req = MemberRequest.builder()
                .email("test")
                .build();
        return ResponseEntity.ok(req);
    }
}
