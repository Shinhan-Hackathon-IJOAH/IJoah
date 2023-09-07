package com.shinhan.shbhack.ijoa.api.controller.diary.requestdto;


import lombok.AccessLevel;
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
public class DiaryCreateRequest {
    private String memberId;
    private String title;
    private String emotion;
    private String content;
    private LocalDate date;
    private List<MultipartFile> photo;
    private MultipartFile record;

}
