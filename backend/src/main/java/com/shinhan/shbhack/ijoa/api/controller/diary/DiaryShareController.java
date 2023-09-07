package com.shinhan.shbhack.ijoa.api.controller.diary;

import com.shinhan.shbhack.ijoa.api.controller.diary.requestdto.DiaryCreateRequest;
import com.shinhan.shbhack.ijoa.api.service.diary.command.DiaryService;
import com.shinhan.shbhack.ijoa.api.service.diary.dto.request.DiaryCreateServiceRequest;
import com.shinhan.shbhack.ijoa.api.service.diary.dto.response.DiaryDetailResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("/api/shareddiaries")
@RequiredArgsConstructor
public class DiaryShareController {
    private final DiaryService diaryService;
    @GetMapping("/{diaryId}")
    public ResponseEntity<?> readDiary(@PathVariable Long diaryId){

        DiaryDetailResponse diaryDetailResponse = diaryService.readShareDiary(diaryId);
        if(diaryDetailResponse == null){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);

        }else{
            return new ResponseEntity<>(diaryDetailResponse, HttpStatus.OK);

        }
    }
}
