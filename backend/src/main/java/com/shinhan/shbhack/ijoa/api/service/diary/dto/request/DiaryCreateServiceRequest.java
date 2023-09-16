package com.shinhan.shbhack.ijoa.api.service.diary.dto.request;

import com.shinhan.shbhack.ijoa.api.controller.diary.dto.request.DiaryCreateRequest;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;
import java.util.List;

import static lombok.AccessLevel.PROTECTED;

@Getter
@AllArgsConstructor
@NoArgsConstructor(access = PROTECTED)
public class DiaryCreateServiceRequest {
    private String memberId;
    private String title;
    private String emotion;
    private String content;
    private LocalDate date;
    private List<MultipartFile> photo;
    private MultipartFile record;

    public DiaryCreateServiceRequest(DiaryCreateRequest diaryCreateRequest) {
        this.memberId = diaryCreateRequest.getMemberId();
        this.title = diaryCreateRequest.getTitle();
        this.emotion = diaryCreateRequest.getEmotion();
        this.content = diaryCreateRequest.getContent();
        this.date = diaryCreateRequest.getDate();
        this.photo = diaryCreateRequest.getPhoto();
        this.record = diaryCreateRequest.getRecord();
    }
}
