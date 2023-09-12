package com.shinhan.shbhack.ijoa.api.service.member.dto.request;

import com.shinhan.shbhack.ijoa.api.controller.member.dto.request.MemberModifyRequest;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class MemberModifyServiceRequest {

    private Long id;

    private String password;

    @Builder
    public MemberModifyServiceRequest(Long id, String password) {
        this.id = id;
        this.password = password;
    }

    public static MemberModifyServiceRequest of(MemberModifyRequest request){
        return MemberModifyServiceRequest.builder()
                .id(request.getId())
                .password(request.getPassword())
                .build();
    }
}
