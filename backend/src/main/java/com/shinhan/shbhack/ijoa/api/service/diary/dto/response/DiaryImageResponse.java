package com.shinhan.shbhack.ijoa.api.service.diary.dto.response;

import com.shinhan.shbhack.ijoa.domain.diary.entity.Diary;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.validation.constraints.NotNull;

import static javax.persistence.FetchType.LAZY;
import static lombok.AccessLevel.PROTECTED;
import static lombok.AccessLevel.PUBLIC;

@Getter
@NoArgsConstructor(access = PUBLIC)
public class DiaryImageResponse {
    private Long diaryImageId;
    private String uploadFileName;
    private String storeFileName;
}
