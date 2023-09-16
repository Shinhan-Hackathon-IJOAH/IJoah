package com.shinhan.shbhack.ijoa.domain.member.entity;

import com.shinhan.shbhack.ijoa.api.service.member.dto.request.MissionCreateServiceRequest;
import com.shinhan.shbhack.ijoa.domain.BaseEntity;
import com.shinhan.shbhack.ijoa.domain.member.entity.enums.Accomplishment;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import static javax.persistence.EnumType.STRING;
import static javax.persistence.FetchType.LAZY;
import static javax.persistence.GenerationType.IDENTITY;
import static lombok.AccessLevel.*;

@Entity
@Getter
@NoArgsConstructor(access = PROTECTED)
public class Mission extends BaseEntity {

    @Id
    @Column(name = "mission_id")
    @GeneratedValue(strategy = IDENTITY)
    private Long id;

    @NotNull
    @Size(max = 30)
    private String title;

    @Lob
    @NotEmpty
    private String content;

    @NotNull
    private Long reward;

    @NotNull
    private LocalDate startDate;

    @NotNull
    private LocalDate endDate;

    @NotNull
    @Enumerated(STRING)
    private Accomplishment accomplishment;

    @NotNull
    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "writer_id")
    private Member writer;

    @NotNull
    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "challenger_id")
    private Member challenger;

    @OneToMany(mappedBy = "mission")
    private List<Notification> notifications;

    @Builder
    public Mission(Long id, String title, String content, Long reward, LocalDate startDate, LocalDate endDate, Accomplishment accomplishment, Member writer, Member challenger, List<Notification> notifications) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.reward = reward;
        this.startDate = startDate;
        this.endDate = endDate;
        this.accomplishment = accomplishment;
        this.writer = writer;
        this.challenger = challenger;
        this.notifications = notifications;
    }

    public static Mission of(MissionCreateServiceRequest request, Member parent, Member child){
        return Mission.builder()
                .title(request.getMissionTitle())
                .content(request.getMissionContent())
                .reward(request.getMissionReward())
                .startDate(request.getMissionStartDate())
                .endDate(request.getMissionEndDate())
                .accomplishment(Accomplishment.진행)
                .writer(parent)
                .challenger(child)
                .build();
    }

    public void changeAccomplishment(Accomplishment accomplishment){
        this.accomplishment = accomplishment;
    }
}
