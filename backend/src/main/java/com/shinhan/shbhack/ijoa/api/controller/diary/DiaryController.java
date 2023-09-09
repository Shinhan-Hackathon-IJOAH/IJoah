package com.shinhan.shbhack.ijoa.api.controller.diary;

import com.shinhan.shbhack.ijoa.api.controller.diary.dto.request.DiaryCreateRequest;
import com.shinhan.shbhack.ijoa.api.service.diary.command.DiaryService;
import com.shinhan.shbhack.ijoa.api.service.diary.dto.request.DiaryCreateServiceRequest;
import com.shinhan.shbhack.ijoa.api.service.diary.dto.response.DiaryCalenderResponse;
import com.shinhan.shbhack.ijoa.api.service.diary.dto.response.DiaryDetailResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

@Slf4j
@RestController
@RequestMapping("/api/diaries")
@RequiredArgsConstructor
public class DiaryController {
    private final DiaryService diaryService;
    @Value("${file.dir}")
    public String basicPath;
//    @PostMapping("")
//    public ResponseEntity<?> writeDiary(@RequestBody DiaryCreateRequest diaryCreateRequest){
//
//        diaryService.writeDiary(new DiaryCreateServiceRequest(diaryCreateRequest));
//        return new ResponseEntity<>(HttpStatus.OK);
//    }

    @PostMapping("")
    public ResponseEntity<?> writeDiary(@RequestPart(value = "info") DiaryCreateRequest diaryCreateRequest,
                                        @RequestPart(value="images")List<MultipartFile> images,
                                        @RequestPart(value="record")MultipartFile record){
        diaryCreateRequest.setPhoto(images);
        diaryCreateRequest.setRecord(record);
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

    @PutMapping("/{diaryId}")
    public ResponseEntity<?> modifyDiary(@PathVariable Long diaryId, @RequestBody DiaryCreateRequest diaryCreateRequest){
        diaryService.modifyDiary(new DiaryCreateServiceRequest(diaryCreateRequest),diaryId);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("/{diaryId}")
    public ResponseEntity<?> deleteDiary(@PathVariable Long diaryId){
        diaryService.deleteDiary(diaryId);
        return new ResponseEntity<>(HttpStatus.OK);

    }

    @PostMapping("/share/{diaryId}")
    public ResponseEntity<?> shareDiary(@PathVariable Long diaryId){
        diaryService.shareDiary(diaryId);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/image/{path}")
    public ResponseEntity<?> showImage(@PathVariable String path){
        log.info("===================");
        Resource resource = new FileSystemResource(basicPath+path);
        if(!resource.exists()){
            return new ResponseEntity<Resource>(HttpStatus.NOT_FOUND);
        }
        HttpHeaders header = new HttpHeaders();
        Path filePath = null;
        try{
            filePath = Paths.get(basicPath+path);
            header.add("Content-Type", Files.probeContentType(filePath));
        }catch (IOException e){
            e.printStackTrace();
        }
        return new ResponseEntity<Resource>(resource, header, HttpStatus.OK);
    }
}
