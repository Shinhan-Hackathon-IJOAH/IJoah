package com.shinhan.shbhack.ijoa.api.service.member.dto.request;

import com.shinhan.shbhack.ijoa.api.controller.member.dto.request.MemberPermitFamilyRequest;
import com.shinhan.shbhack.ijoa.api.controller.member.dto.request.MemberRegistFamilyRequest;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class MemberPermitFamilyServiceRequest {

    private String parentId;

    private String childId;

    @Builder
    public MemberPermitFamilyServiceRequest(String parentId, String childId) {
        this.parentId = parentId;
        this.childId = childId;
    }

    public static MemberPermitFamilyServiceRequest of(MemberPermitFamilyRequest request){
        return MemberPermitFamilyServiceRequest.builder()
                .parentId(request.getParentId())
                .childId(request.getChildId())
                .build();
    }
}
