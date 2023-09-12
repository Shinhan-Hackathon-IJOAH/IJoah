package com.shinhan.shbhack.ijoa.api.service.member.dto.response;

import com.shinhan.shbhack.ijoa.domain.member.entity.Member;
import com.shinhan.shbhack.ijoa.domain.member.entity.Mission;
import com.shinhan.shbhack.ijoa.domain.member.entity.enums.Accomplishment;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.time.LocalDate;

import static javax.persistence.EnumType.STRING;
import static javax.persistence.FetchType.LAZY;
import static javax.persistence.GenerationType.IDENTITY;

@Getter
@NoArgsConstructor
public class MissionResponse {

    private Long id;

    private String title;

    private String content;

    private Long reward;

    private LocalDate startDate;

    private LocalDate endDate;

    private Accomplishment accomplishment;

    private MemberResponse writer;

    private MemberResponse challenger;

    @Builder
    public MissionResponse(Long id, String title, String content, Long reward, LocalDate startDate, LocalDate endDate, Accomplishment accomplishment, MemberResponse writer, MemberResponse challenger) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.reward = reward;
        this.startDate = startDate;
        this.endDate = endDate;
        this.accomplishment = accomplishment;
        this.writer = writer;
        this.challenger = challenger;
    }

    public static MissionResponse of(Mission mission){
        return MissionResponse.builder()
                .id(mission.getId())
                .title(mission.getTitle())
                .content(mission.getContent())
                .reward(mission.getReward())
                .startDate(mission.getStartDate())
                .endDate(mission.getEndDate())
                .accomplishment(mission.getAccomplishment())
                .writer(MemberResponse.of(mission.getWriter()))
                .challenger(MemberResponse.of(mission.getChallenger()))
                .build();

    }
}
