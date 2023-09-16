package com.shinhan.shbhack.ijoa.api.service.member.dto.response;

import com.shinhan.shbhack.ijoa.domain.bank.entity.Account;
import com.shinhan.shbhack.ijoa.domain.member.entity.Member;
import com.shinhan.shbhack.ijoa.domain.member.entity.enums.ActivateStatus;
import com.shinhan.shbhack.ijoa.domain.member.entity.enums.Gender;
import com.shinhan.shbhack.ijoa.domain.member.entity.enums.MemberRole;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Enumerated;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.time.LocalDate;

import static javax.persistence.EnumType.STRING;
import static lombok.AccessLevel.PROTECTED;

@Getter
@NoArgsConstructor
public class MemberResponse {

    private Long memberId;

    private String name;

    private String email;

    private String phoneNumber;

    private LocalDate birthDate;

    private Gender gender;

    private MemberRole memberRole;

    private AccountResponse account;

    private ProfileImageResponse profileImage;


    @Builder
    public MemberResponse(Long memberId, String name, String email, String phoneNumber, LocalDate birthDate, Gender gender, MemberRole memberRole, AccountResponse account, ProfileImageResponse profileImage) {
        this.memberId = memberId;
        this.name = name;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.birthDate = birthDate;
        this.gender = gender;
        this.memberRole = memberRole;
        this.account = account;
        this.profileImage = profileImage;
    }

    public static MemberResponse of(Member member){
        return MemberResponse.builder()
                .memberId(member.getId())
                .name(member.getName())
                .email(member.getEmail())
                .phoneNumber(member.getPhoneNumber())
                .birthDate(member.getBirthDate())
                .gender(member.getGender())
                .memberRole(member.getMemberRole())
                .account(AccountResponse.of(member.getAccount()))
                .profileImage(ProfileImageResponse.of(member.getProfileImage()))
                .build();
    }
}
