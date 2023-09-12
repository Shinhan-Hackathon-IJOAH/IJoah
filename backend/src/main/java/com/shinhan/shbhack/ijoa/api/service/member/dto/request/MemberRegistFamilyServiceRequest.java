package com.shinhan.shbhack.ijoa.api.service.member.dto.request;

import com.shinhan.shbhack.ijoa.api.controller.member.dto.request.MemberRegistFamilyRequest;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class MemberRegistFamilyServiceRequest {

    private Long parentId;

    private Long childId;

    @Builder
    public MemberRegistFamilyServiceRequest(Long parentId, Long childId) {
        this.parentId = parentId;
        this.childId = childId;
    }

    public static MemberRegistFamilyServiceRequest of(MemberRegistFamilyRequest request){
        return MemberRegistFamilyServiceRequest.builder()
                .parentId(request.getParentId())
                .childId(request.getChildId())
                .build();
    }
}
