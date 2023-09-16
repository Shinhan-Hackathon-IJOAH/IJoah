package com.shinhan.shbhack.ijoa.api.service.member.dto.request;

import com.shinhan.shbhack.ijoa.api.controller.member.dto.request.MissionCheckRequest;
import com.shinhan.shbhack.ijoa.api.controller.member.dto.request.MissionCreateRequest;
import com.shinhan.shbhack.ijoa.domain.member.entity.enums.MemberRole;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class MissionCheckServiceRequest {

    private Long memberId;

    private MemberRole memberRole;

    private Long missionId;

    private boolean isAccept;

    @Builder
    public MissionCheckServiceRequest(Long memberId, MemberRole memberRole, Long missionId, boolean isAccept) {
        this.memberId = memberId;
        this.memberRole = memberRole;
        this.missionId = missionId;
        this.isAccept = isAccept;
    }

    public static MissionCheckServiceRequest of(MissionCheckRequest request){
        return MissionCheckServiceRequest.builder()
                .memberId(request.getMemberId())
                .memberRole(request.getMemberRole())
                .missionId(request.getMissionId())
                .isAccept(request.isAccept())
                .build();
    }
}
