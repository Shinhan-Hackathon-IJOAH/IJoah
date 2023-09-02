package com.shinhan.shbhack.ijoa.domain.member.entity;

import com.shinhan.shbhack.ijoa.domain.BaseEntity;
import com.shinhan.shbhack.ijoa.domain.member.entity.enums.ConfirmStatus;
import com.shinhan.shbhack.ijoa.domain.member.entity.enums.NotificationType;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

import static javax.persistence.EnumType.STRING;
import static javax.persistence.FetchType.LAZY;
import static javax.persistence.GenerationType.IDENTITY;
import static lombok.AccessLevel.PROTECTED;

@Entity
@Getter
@NoArgsConstructor(access = PROTECTED)
public class Notification extends BaseEntity {

    @Id
    @Column(name = "notification_id")
    @GeneratedValue(strategy = IDENTITY)
    private Long id;

    @NotNull
    @Enumerated(STRING)
    private NotificationType notificationType;

    @NotNull
    @Enumerated(STRING)
    private ConfirmStatus confirmStatus;

    @NotNull
    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "receiver_id")
    private Member receiver;

    @NotNull
    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "sender_id")
    private Member sender;

    @ManyToOne
    @JoinColumn(name = "mission_id")
    private Mission mission;

    /**
     *  2023-09-03
     *  diary entity 추가 시 연관관계 맵핑 추가
     *  builder 추가
     */


}
