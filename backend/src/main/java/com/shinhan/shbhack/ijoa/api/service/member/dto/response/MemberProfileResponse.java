package com.shinhan.shbhack.ijoa.api.service.member.dto.response;


import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

import static lombok.AccessLevel.*;

@Getter
@NoArgsConstructor(access = PROTECTED)
public class MemberProfileResponse {

    private String name;

    private String email;

    private String phoneNumber;

    private LocalDate birthDate;

    private ProfileImageResponse profileImageResponse;

    @Builder
    public MemberProfileResponse(String name, String email, String phoneNumber, LocalDate birthDate, ProfileImageResponse profileImageResponse) {
        this.name = name;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.birthDate = birthDate;
        this.profileImageResponse = profileImageResponse;
    }




}
