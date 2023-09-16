package com.shinhan.shbhack.ijoa.api.service.member.dto.response;

import com.shinhan.shbhack.ijoa.domain.UploadFile;
import com.shinhan.shbhack.ijoa.domain.member.entity.ProfileImage;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

import static lombok.AccessLevel.PROTECTED;

@Getter
@NoArgsConstructor
public class ProfileImageResponse {

    private Long profileImageId;
    private String fileName;

   @Builder
    public ProfileImageResponse(Long profileImageId, String fileName) {
        this.profileImageId = profileImageId;
        this.fileName = fileName;
    }

    public static ProfileImageResponse of(ProfileImage profileImage){
        if (profileImage == null) return null;
        return ProfileImageResponse.builder()
                .profileImageId(profileImage.getId())
                .fileName(profileImage.getUploadFile().getStoreFileName())
                .build();
    }
}
