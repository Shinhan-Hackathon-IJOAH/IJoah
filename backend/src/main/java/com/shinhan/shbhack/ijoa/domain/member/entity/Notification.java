package com.shinhan.shbhack.ijoa.domain.member.entity;

import com.shinhan.shbhack.ijoa.api.service.alarm.dto.request.AlarmNotifyRequest;
import com.shinhan.shbhack.ijoa.domain.BaseEntity;
import com.shinhan.shbhack.ijoa.domain.diary.entity.Diary;
import com.shinhan.shbhack.ijoa.domain.member.entity.enums.ConfirmStatus;
import com.shinhan.shbhack.ijoa.domain.member.entity.enums.NotificationType;
import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

import java.util.List;
import java.util.Map;

import static javax.persistence.EnumType.STRING;
import static javax.persistence.FetchType.LAZY;
import static javax.persistence.GenerationType.IDENTITY;
import static lombok.AccessLevel.PROTECTED;

@Entity
@Getter
@Setter
@NoArgsConstructor(access = PROTECTED)
public class Notification extends BaseEntity {

    @Id
    @Column(name = "notification_id")
    @GeneratedValue(strategy = IDENTITY)
    private Long id;

    @NotNull
    private String content;

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

    @OneToOne(fetch = LAZY)
    @JoinColumn(name = "mission_id")
    private Mission mission;



    private String parentInfo;

    @Builder

    public Notification(Long id, NotificationType notificationType, ConfirmStatus confirmStatus, Member receiver, Member sender, Mission mission, String content, String parentInfo) {
        this.id = id;
        this.notificationType = notificationType;
        this.confirmStatus = confirmStatus;
        this.receiver = receiver;
        this.sender = sender;
        this.mission = mission;
        this.content = content;
        this.parentInfo = parentInfo;
    }





    public static Notification of(AlarmNotifyRequest alarmNotifyRequest){
        Notification notification = new Notification();
        notification.confirmStatus = alarmNotifyRequest.getConfirmStatus();
        notification.notificationType = alarmNotifyRequest.getNotificationType();
        notification.mission = alarmNotifyRequest.getMission();
        notification.content = alarmNotifyRequest.getContent();
        notification.receiver = alarmNotifyRequest.getReceiver();
        notification.sender = alarmNotifyRequest.getSender();
        notification.parentInfo = alarmNotifyRequest.getParentInfo();
        return notification;
    }

    public static Notification ofMission(Member sender, Member receiver){
         return null;
    }

    public static Notification ofFriend(Member sender, Member receiver){
        return null;
    }

    public static Notification ofFamily(Member sender, Member receiver){
        return null;
    }
}
