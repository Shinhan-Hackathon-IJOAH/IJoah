package com.shinhan.shbhack.ijoa.api.controller.alarm;

import com.shinhan.shbhack.ijoa.api.service.alarm.command.AlarmService;
import com.shinhan.shbhack.ijoa.api.service.alarm.command.SSEService;
import com.shinhan.shbhack.ijoa.api.service.alarm.dto.response.AlarmInfoResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/api1/alarm")
@RequiredArgsConstructor
public class AlarmController {
    private final AlarmService alarmService;
    private final SSEService sseService;

    @GetMapping("/{email}")
    public ResponseEntity<?> getList(@PathVariable String email){
        List<AlarmInfoResponse> result = alarmService.receiveAlarm(email);
        return new ResponseEntity<>(result, HttpStatus.OK);

    }

    @PostMapping("/{id}")
    public ResponseEntity<?> updateAlarm(@PathVariable Long id){
        alarmService.updateAlarm(id);
        return ResponseEntity.ok().build();
    }

    @GetMapping(value = "/subscribe/{id}", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public SseEmitter subscribe(@PathVariable Long id) {
        return sseService.subscribe(id);
    }

}
