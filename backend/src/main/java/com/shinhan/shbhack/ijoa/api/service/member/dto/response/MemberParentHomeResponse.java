package com.shinhan.shbhack.ijoa.api.service.member.dto.response;


import com.shinhan.shbhack.ijoa.domain.bank.entity.Account;
import com.shinhan.shbhack.ijoa.domain.member.entity.Family;
import com.shinhan.shbhack.ijoa.domain.member.entity.Member;
import com.shinhan.shbhack.ijoa.domain.member.entity.enums.Gender;
import com.shinhan.shbhack.ijoa.domain.member.entity.enums.MemberRole;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

import static lombok.AccessLevel.*;

@Slf4j
@Getter
@NoArgsConstructor
public class MemberParentHomeResponse {

    private Long memberId;

    private String name;

    private String email;

    private String phoneNumber;

    private LocalDate birthDate;

    private Gender gender;

    private MemberRole memberRole;

    private AccountResponse account;

    private ProfileImageResponse profileImage;

    private List<MemberResponse> children;

    @Builder
    public MemberParentHomeResponse(Long memberId, String name, String email, String phoneNumber, LocalDate birthDate, Gender gender, MemberRole memberRole, AccountResponse account, ProfileImageResponse profileImage, List<MemberResponse> children) {
        this.memberId = memberId;
        this.name = name;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.birthDate = birthDate;
        this.gender = gender;
        this.memberRole = memberRole;
        this.account = account;
        this.profileImage = profileImage;
        this.children = children;
    }

    public static MemberParentHomeResponse of(Member member){
        return MemberParentHomeResponse.builder()
                .memberId(member.getId())
                .name(member.getName())
                .email(member.getEmail())
                .phoneNumber(member.getPhoneNumber())
                .birthDate(member.getBirthDate())
                .gender(member.getGender())
                .memberRole(member.getMemberRole())
                .account(AccountResponse.of(member.getAccount()))
                .profileImage(ProfileImageResponse.of(member.getProfileImage()))
                .children(member.getParents()
                        .stream()
                        .map(family -> MemberResponse.of(family.getChild()))
                        .collect(Collectors.toList()))
                .build();
    }
}
