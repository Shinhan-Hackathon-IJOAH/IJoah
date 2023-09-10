package com.shinhan.shbhack.ijoa.api.service.member.dto.request;

import com.shinhan.shbhack.ijoa.domain.member.entity.Member;
import com.shinhan.shbhack.ijoa.domain.member.entity.enums.ActivateStatus;
import com.shinhan.shbhack.ijoa.domain.member.entity.enums.Gender;
import com.shinhan.shbhack.ijoa.domain.member.entity.enums.MemberRole;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Enumerated;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;
import java.time.LocalDate;

import static javax.persistence.EnumType.STRING;
import static lombok.AccessLevel.PROTECTED;

@Getter
@NoArgsConstructor(access = PROTECTED)
public class MemberCreateServiceRequest {

    private String name;

    private String email;

    private String password;

    private String phoneNumber;

    private LocalDate birthDate;

    private Gender gender;

    private MemberRole memberRole;

    @Builder
    public MemberCreateServiceRequest(String name, String email, String password, String phoneNumber, LocalDate birthDate, Gender gender, MemberRole memberRole) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.phoneNumber = phoneNumber;
        this.birthDate = birthDate;
        this.gender = gender;
        this.memberRole = memberRole;
    }

    public Member toEntity(String encodedPassword){
        return Member.builder()
                .name(name)
                .email(email)
                .password(encodedPassword)
                .phoneNumber(phoneNumber)
                .birthDate(birthDate)
                .gender(gender)
                .memberRole(memberRole)
                .activateStatus(ActivateStatus.ACTIVATE)
                .build();
    }
}
