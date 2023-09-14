package com.shinhan.shbhack.ijoa.api.service.alarm.command;

import com.shinhan.shbhack.ijoa.api.service.alarm.dto.request.AlarmNotifyRequest;
import com.shinhan.shbhack.ijoa.api.service.alarm.dto.response.AlarmInfoResponse;
import com.shinhan.shbhack.ijoa.domain.member.entity.Member;
import com.shinhan.shbhack.ijoa.domain.member.entity.Notification;
import com.shinhan.shbhack.ijoa.domain.member.entity.enums.ConfirmStatus;
import com.shinhan.shbhack.ijoa.domain.member.entity.enums.NotificationType;
import com.shinhan.shbhack.ijoa.domain.member.repository.datajpa.MemberRepository;
import com.shinhan.shbhack.ijoa.domain.member.repository.datajpa.NotificationRepository;
import com.shinhan.shbhack.ijoa.domain.member.repository.query.AlarmQueryRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class AlarmService {
    private final AlarmQueryRepository alarmQueryRepository;
    private final NotificationRepository notificationRepository;
    private final MemberRepository memberRepository;

    public void sendAlarm(AlarmNotifyRequest alarmNotifyRequest){
        Notification notification = Notification.of(alarmNotifyRequest);
        notificationRepository.save(notification);

    }

    public List<AlarmInfoResponse> receiveAlarm(String memberEmail){
        return alarmQueryRepository.getAlarmListByMember(memberEmail);
    }

    public void updateAlarm(Long alarmId){
        Notification notification = notificationRepository.findById(alarmId).orElseThrow();
        notification.setConfirmStatus(ConfirmStatus.CONFIRMED);
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
