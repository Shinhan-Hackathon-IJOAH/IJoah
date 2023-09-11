package com.shinhan.shbhack.ijoa.api.service.member.dto.response;

import com.shinhan.shbhack.ijoa.domain.member.entity.Member;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Getter
@NoArgsConstructor
public class MemberChildHomeResponse {

    private Long memberId;

    private String name;

    private String email;

    private String phoneNumber;

    private LocalDate birthDate;

    private AccountResponse account;

    private ProfileImageResponse profileImage;

    private List<MemberResponse> parent;

    @Builder
    public MemberChildHomeResponse(Long memberId, String name, String email, String phoneNumber, LocalDate birthDate, AccountResponse account, ProfileImageResponse profileImage, List<MemberResponse> parent) {
        this.memberId = memberId;
        this.name = name;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.birthDate = birthDate;
        this.account = account;
        this.profileImage = profileImage;
        this.parent = parent;
    }

    public static MemberChildHomeResponse of(Member member){
        return MemberChildHomeResponse.builder()
                .memberId(member.getId())
                .name(member.getName())
                .email(member.getEmail())
                .phoneNumber(member.getPhoneNumber())
                .birthDate(member.getBirthDate())
                .account(AccountResponse.of(member.getAccount()))
                .profileImage(ProfileImageResponse.of(member.getProfileImage()))
                .parent(member.getChildren()
                        .stream()
                        .map(family -> MemberResponse.of(family.getParent()))
                        .collect(Collectors.toList()))
                .build();
    }

}
