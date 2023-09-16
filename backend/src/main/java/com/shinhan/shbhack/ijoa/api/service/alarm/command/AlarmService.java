package com.shinhan.shbhack.ijoa.api.service.alarm.command;

import com.shinhan.shbhack.ijoa.api.service.alarm.dto.request.AlarmNotifyRequest;
import com.shinhan.shbhack.ijoa.api.service.alarm.dto.response.AlarmInfoResponse;
import com.shinhan.shbhack.ijoa.common.error.ErrorCode;
import com.shinhan.shbhack.ijoa.common.error.exception.EntityNotFoundException;
import com.shinhan.shbhack.ijoa.common.error.exception.InvalidValueException;
import com.shinhan.shbhack.ijoa.domain.member.entity.Member;
import com.shinhan.shbhack.ijoa.domain.member.entity.Notification;
import com.shinhan.shbhack.ijoa.domain.member.entity.enums.ConfirmStatus;
import com.shinhan.shbhack.ijoa.domain.member.entity.enums.NotificationType;
import com.shinhan.shbhack.ijoa.domain.member.repository.datajpa.EmitterRepository;
import com.shinhan.shbhack.ijoa.domain.member.repository.datajpa.MemberRepository;
import com.shinhan.shbhack.ijoa.domain.member.repository.datajpa.NotificationRepository;
import com.shinhan.shbhack.ijoa.domain.member.repository.query.AlarmQueryRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.io.IOException;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional
public class AlarmService {
    private final AlarmQueryRepository alarmQueryRepository;
    private final NotificationRepository notificationRepository;
    private final MemberRepository memberRepository;
    private final SSEService sseService;

    public void sendAlarm(AlarmNotifyRequest alarmNotifyRequest){
        Notification notification = Notification.of(alarmNotifyRequest);
        notificationRepository.save(notification);
        AlarmInfoResponse response = new AlarmInfoResponse();
        response.setContent(notification.getContent());
//        sseService.send(alarmNotifyRequest.getReceiver().getId(), response);

    }

    public List<AlarmInfoResponse> receiveAlarm(String memberEmail){
        return alarmQueryRepository.getAlarmListByMember(memberEmail);
    }

    public void updateAlarm(Long alarmId){
        Notification notification = notificationRepository.findById(alarmId).orElseThrow();

        notification.setConfirmStatus(ConfirmStatus.CONFIRMED);
        log.info(notification.getId().toString());
        log.info(notification.getConfirmStatus().toString());
    }

    public void updateEnrollAlarm(Long id){

        Member receiver = memberRepository.getReferenceById(id);
        List<Notification> list = notificationRepository.findNotificationsByReceiverAndNotificationType(receiver, NotificationType.CHILD_ENROLL);
//        List<Notification> list = notificationRepository.findNotificationsByNotificationType(NotificationType.CHILD_ENROLL);

        log.info("리스트 길이: " + list.size());
        for(Notification value : list){

            value.setConfirmStatus(ConfirmStatus.CONFIRMED);
        }
    }


}
