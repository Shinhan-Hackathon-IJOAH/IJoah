package com.shinhan.shbhack.ijoa.api.service.member.dto.request;

import com.shinhan.shbhack.ijoa.api.controller.member.dto.request.MissionListRequest;
import com.shinhan.shbhack.ijoa.domain.member.entity.enums.MemberRole;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class MissionListServiceRequest {

    private Long memberId;

    private MemberRole memberRole;

    @Builder
    public MissionListServiceRequest(Long memberId, MemberRole memberRole) {
        this.memberId = memberId;
        this.memberRole = memberRole;
    }

    public static MissionListServiceRequest of(MissionListRequest request){
        return MissionListServiceRequest.builder()
                .memberId(request.getMemberId())
                .memberRole(request.getMemberRole())
                .build();
    }
}
