package com.shinhan.shbhack.ijoa.api.service.member.dto.request;

import com.shinhan.shbhack.ijoa.api.controller.member.dto.request.MemberRegistFamilyRequest;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class MemberRegistFamilyServiceRequest {

    private Long parentId;

    private String childEmail;

    @Builder
    public MemberRegistFamilyServiceRequest(Long parentId, String childEmail) {
        this.parentId = parentId;
        this.childEmail = childEmail;
    }

    public static MemberRegistFamilyServiceRequest of(MemberRegistFamilyRequest request){
        return MemberRegistFamilyServiceRequest.builder()
                .parentId(request.getParentId())
                .childEmail(request.getChildEmail())
                .build();
    }
}
