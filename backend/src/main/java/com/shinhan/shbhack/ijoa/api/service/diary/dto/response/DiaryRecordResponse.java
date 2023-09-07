package com.shinhan.shbhack.ijoa.api.service.diary.dto.response;

import lombok.Getter;
import lombok.NoArgsConstructor;

import static lombok.AccessLevel.PUBLIC;

@Getter
@NoArgsConstructor(access = PUBLIC)
public class DiaryRecordResponse {
    private Long diaryRecordId;
    private String uploadFileName;
    private String storeFileName;
}
