package com.shinhan.shbhack.ijoa.api.service.alarm.dto.response;

import com.shinhan.shbhack.ijoa.domain.member.entity.Member;
import com.shinhan.shbhack.ijoa.domain.member.entity.enums.ConfirmStatus;
import com.shinhan.shbhack.ijoa.domain.member.entity.enums.NotificationType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

import static lombok.AccessLevel.PUBLIC;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor(access = PUBLIC)
public class AlarmInfoResponse {
    private Long id;
    private NotificationType notificationType;
    private ConfirmStatus confirmStatus;
    private String senderName;
    private String content;
    private Long missionId;
    private LocalDateTime time;


}
