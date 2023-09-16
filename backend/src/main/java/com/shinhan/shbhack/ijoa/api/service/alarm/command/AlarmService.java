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
public class AlarmService {
    private final AlarmQueryRepository alarmQueryRepository;
    private final NotificationRepository notificationRepository;
    private final MemberRepository memberRepository;

    private final static String ALARM_NAME = "alarm";
    private final EmitterRepository emitterRepository;
    private static final Long DEFAULT_TIMEOUT = 60L * 1000 * 60;
    public void sendAlarm(AlarmNotifyRequest alarmNotifyRequest){
        Notification notification = Notification.of(alarmNotifyRequest);
        notificationRepository.save(notification);
        AlarmInfoResponse response = new AlarmInfoResponse();
        response.setContent(notification.getContent());
        send(alarmNotifyRequest.getReceiver().getId(), response);

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

    public void send(Long id, AlarmInfoResponse response) {
        emitterRepository.get(id).ifPresentOrElse(it -> {
                    try {
                        it.send(SseEmitter.event()
                                .name("sse")
                                .data(response));
                        log.info("성공적으로 보냈어요");
                    } catch (IOException exception) {
                        log.info("delete를 하려고 할 때 발생한 에러");
                        emitterRepository.delete(id);
                        throw new EntityNotFoundException(ErrorCode.ENTITY_NOT_FOUND);
                    }
                },
                () -> log.info("No emitter found")
        );
    }

    public SseEmitter subscribe(Long id) {
        SseEmitter emitter = new SseEmitter(DEFAULT_TIMEOUT);
        emitterRepository.save(id, emitter);
        emitter.onCompletion(() -> emitterRepository.delete(id));
        emitter.onTimeout(() -> emitterRepository.delete(id));
        try {
            log.info("connect: " + id);
            emitter.send(SseEmitter.event()
                    .id("id")
                    .name("sse")
                    .data("connect completed"));
        } catch (IOException exception) {
            throw new InvalidValueException(ErrorCode.INTERNAL_SERVER_ERROR);
        }
        return emitter;
    }
}
