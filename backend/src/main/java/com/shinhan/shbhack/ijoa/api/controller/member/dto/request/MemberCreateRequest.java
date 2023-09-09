package com.shinhan.shbhack.ijoa.api.controller.member.dto.request;

import com.shinhan.shbhack.ijoa.api.service.member.dto.request.MemberCreateServiceRequest;
import com.shinhan.shbhack.ijoa.domain.member.entity.enums.ActivateStatus;
import com.shinhan.shbhack.ijoa.domain.member.entity.enums.Gender;
import com.shinhan.shbhack.ijoa.domain.member.entity.enums.MemberRole;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Enumerated;
import javax.validation.constraints.*;

import java.time.LocalDate;
import java.util.Date;

import static javax.persistence.EnumType.STRING;
import static lombok.AccessLevel.PROTECTED;

@Getter
@NoArgsConstructor(access = PROTECTED)
public class MemberCreateRequest {

    @Size(max = 20)
    @NotNull
    private String name;

    @Email
    @Size(max = 40)
    @NotNull
    private String email;

    @NotNull
    @Size(min = 6)
    @Pattern(regexp = "^(?=.*[a-z])(?=.*\\d)(?=.*[@$!%#*?&])[A-Za-z\\d@$!%*#?&]+$",
            message = "비밀번호는 영문 소문자, 숫자, 특수문자(@$#!%*?&)를 포함해야 합니다.")
    private String password;

    @Size(max = 20)
    @NotNull
    private String phoneNumber;

    @Size(max = 50)
    @NotNull
    private String address;

    @NotNull
    private LocalDate birthDate;

    @NotNull
    private Gender gender;

    @NotNull
    private MemberRole memberRole;

    public MemberCreateServiceRequest toServiceRequest(){
        return MemberCreateServiceRequest.builder()
                .name(name)
                .email(email)
                .password(password)
                .phoneNumber(phoneNumber)
                .address(address)
                .birthDate(birthDate)
                .gender(gender)
                .memberRole(memberRole)
                .build();
    }
}
