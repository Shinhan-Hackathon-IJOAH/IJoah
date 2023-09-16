package com.shinhan.shbhack.ijoa.api.service.alarm.dto.request;

import com.shinhan.shbhack.ijoa.domain.member.entity.Member;
import com.shinhan.shbhack.ijoa.domain.member.entity.Mission;
import com.shinhan.shbhack.ijoa.domain.member.entity.enums.ConfirmStatus;
import com.shinhan.shbhack.ijoa.domain.member.entity.enums.NotificationType;
import lombok.*;

import java.util.Map;

import static lombok.AccessLevel.PUBLIC;

@Getter
@Setter
@NoArgsConstructor(access = PUBLIC)
public class AlarmNotifyRequest {
    private NotificationType notificationType;
    private ConfirmStatus confirmStatus;

    // TODO: 2023-09-16 Dto 내의 Entity를 전부 Dto로 바꾸기
    
    private Member receiver;
    private Member sender;
    private Mission mission;
    private String content;
    private String parentInfo;

    @Builder
    public AlarmNotifyRequest(NotificationType notificationType, ConfirmStatus confirmStatus, Member receiver, Member sender, Mission mission, String content, String parentInfo) {
        this.notificationType = notificationType;
        this.confirmStatus = confirmStatus;
        this.receiver = receiver;
        this.sender = sender;
        this.mission = mission;
        this.content = content;
        this.parentInfo = parentInfo;
    }

    public static AlarmNotifyRequest of(Member sender, Member receiver, Mission mission, NotificationType notificationType){
        return AlarmNotifyRequest.builder()
                .notificationType(notificationType)
                .confirmStatus(ConfirmStatus.UNCONFIRMED)
                .receiver(receiver)
                .sender(sender)
                .mission(mission)
                .content(
                        notificationType == NotificationType.REGIST_MISSION ?
                                sender.getName() + " 님이" + mission.getTitle() + " 미션을 등록하였습니다." : null)
                .build();
    }
}
