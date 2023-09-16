package com.shinhan.shbhack.ijoa.api.service.alarm.command;

import com.shinhan.shbhack.ijoa.api.service.alarm.dto.response.AlarmInfoResponse;
import com.shinhan.shbhack.ijoa.common.error.ErrorCode;
import com.shinhan.shbhack.ijoa.common.error.exception.EntityNotFoundException;
import com.shinhan.shbhack.ijoa.common.error.exception.InvalidValueException;
import com.shinhan.shbhack.ijoa.domain.member.repository.datajpa.EmitterRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.io.IOException;

@Slf4j
@Service
@RequiredArgsConstructor
public class SSEService {

    private final static String ALARM_NAME = "alarm";
    private final EmitterRepository emitterRepository;
    private static final Long DEFAULT_TIMEOUT = 60L * 1000 * 60;
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
