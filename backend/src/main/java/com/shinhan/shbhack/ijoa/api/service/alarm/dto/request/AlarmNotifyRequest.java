package com.shinhan.shbhack.ijoa.api.service.alarm.dto.request;

import com.shinhan.shbhack.ijoa.domain.member.entity.Member;
import com.shinhan.shbhack.ijoa.domain.member.entity.Mission;
import com.shinhan.shbhack.ijoa.domain.member.entity.enums.ConfirmStatus;
import com.shinhan.shbhack.ijoa.domain.member.entity.enums.NotificationType;
import lombok.*;

import static lombok.AccessLevel.PUBLIC;

@Getter
@Setter
@NoArgsConstructor(access = PUBLIC)
public class AlarmNotifyRequest {
    private NotificationType notificationType;
    private ConfirmStatus confirmStatus;
    private Member receiver;
    private Member sender;
    private Mission mission;
    private String content;

    @Builder

    public AlarmNotifyRequest(NotificationType notificationType, ConfirmStatus confirmStatus, Member receiver, Member sender, Mission mission, String content) {
        this.notificationType = notificationType;
        this.confirmStatus = confirmStatus;
        this.receiver = receiver;
        this.sender = sender;
        this.mission = mission;
        this.content = content;
    }
}
