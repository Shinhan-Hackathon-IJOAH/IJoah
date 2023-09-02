package com.shinhan.shbhack.ijoa.domain.member.entity;

import com.shinhan.shbhack.ijoa.domain.BaseEntity;
import com.shinhan.shbhack.ijoa.domain.member.entity.enums.Accomplishment;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

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

    @Lob
    @NotEmpty
    private String content;

    @NotNull
    private Long reward;

    @NotNull
    private LocalDateTime startDate;

    @NotNull
    private LocalDateTime endDate;

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
    private List<Notification> notifications = new ArrayList<>();

    @Builder
    public Mission(Long id, String content, Long reward, LocalDateTime startDate, LocalDateTime endDate, Accomplishment accomplishment, Member writer, Member challenger, List<Notification> notifications) {
        this.id = id;
        this.content = content;
        this.reward = reward;
        this.startDate = startDate;
        this.endDate = endDate;
        this.accomplishment = accomplishment;
        this.writer = writer;
        this.challenger = challenger;
        this.notifications = notifications;
    }



}
