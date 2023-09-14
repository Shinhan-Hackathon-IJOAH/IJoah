package com.shinhan.shbhack.ijoa.api.service.member.dto.response;

import com.shinhan.shbhack.ijoa.domain.member.entity.Member;
import com.shinhan.shbhack.ijoa.domain.member.entity.Mission;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@NoArgsConstructor
public class MissionListResponse {

    private Long memberId;
    private String memberName;
    private ProfileImageResponse profileImage;
    private List<MissionSummaryResponse> completeMissions;
    private List<MissionSummaryResponse> incompleteMissions;
    private List<MissionSummaryResponse> checkingMissions;

    @Builder
    public MissionListResponse(Long memberId, String memberName, ProfileImageResponse profileImage, List<MissionSummaryResponse> completeMissions, List<MissionSummaryResponse> incompleteMissions, List<MissionSummaryResponse> checkingMissions) {
        this.memberId = memberId;
        this.memberName = memberName;
        this.profileImage = profileImage;
        this.completeMissions = completeMissions;
        this.incompleteMissions = incompleteMissions;
        this.checkingMissions = checkingMissions;
    }

    public static MissionListResponse of(Member member, List<MissionSummaryResponse> completeMissions, List<MissionSummaryResponse> incompleteMissions, List<MissionSummaryResponse> checkingMissions){
        return MissionListResponse.builder()
                .memberId(member.getId())
                .memberName(member.getName())
                .profileImage(ProfileImageResponse.of(member.getProfileImage()))
                .completeMissions(completeMissions)
                .incompleteMissions(incompleteMissions)
                .checkingMissions(checkingMissions)
                .build();
    }
}
