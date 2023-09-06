package com.shinhan.shbhack.ijoa.api.controller.diary;

import com.shinhan.shbhack.ijoa.api.controller.diary.requestdto.DiaryCreateRequest;
import com.shinhan.shbhack.ijoa.api.service.diary.command.DiaryService;
import com.shinhan.shbhack.ijoa.api.service.diary.dto.request.DiaryCreateServiceRequest;
import com.shinhan.shbhack.ijoa.api.service.diary.dto.response.DiaryCalenderResponse;
import com.shinhan.shbhack.ijoa.api.service.diary.dto.response.DiaryDetailResponse;
import com.shinhan.shbhack.ijoa.domain.diary.entity.Diary;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.nio.file.Path;
import java.util.List;

@Slf4j
@RestController
@RequestMapping("/api/diaries")
@RequiredArgsConstructor
public class DiaryController {
    private final DiaryService diaryService;
    @PostMapping("")
    public ResponseEntity<?> writeDiary(@RequestBody DiaryCreateRequest diaryCreateRequest){

        diaryService.writeDiary(new DiaryCreateServiceRequest(diaryCreateRequest));
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/list/{memberId}")
    public ResponseEntity<?> listDiary(@PathVariable Long memberId){
        List<DiaryCalenderResponse> result = diaryService.listDiary(memberId);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @GetMapping("/{diaryId}")
    public ResponseEntity<?> readDiary(@PathVariable Long diaryId){
        DiaryDetailResponse result = diaryService.readDiary(diaryId);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }
}
