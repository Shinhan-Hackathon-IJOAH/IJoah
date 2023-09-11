package com.shinhan.shbhack.ijoa.api.controller.member.dto.request;

import com.shinhan.shbhack.ijoa.api.service.member.dto.request.MemberUpdateServiceRequest;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;

@Getter
@NoArgsConstructor
public class MemberUpdateRequest {

    @NotNull
    private Long memberId;

    public MemberUpdateServiceRequest toServiceRequest(){
        return null;
    }


}
