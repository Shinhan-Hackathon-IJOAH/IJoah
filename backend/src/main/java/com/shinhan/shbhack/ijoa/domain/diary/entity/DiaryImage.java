package com.shinhan.shbhack.ijoa.domain.diary.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.shinhan.shbhack.ijoa.api.service.diary.dto.request.DiaryCreateServiceRequest;
import com.shinhan.shbhack.ijoa.common.util.file.UploadFile;
import com.shinhan.shbhack.ijoa.domain.member.entity.Member;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

import static javax.persistence.FetchType.LAZY;
import static javax.persistence.GenerationType.IDENTITY;

@Entity
@Getter
@Setter
@NoArgsConstructor(access= AccessLevel.PROTECTED)
public class DiaryImage {
    @Id
    @Column(name = "diary_image_id")
    @GeneratedValue(strategy = IDENTITY)
    private Long diaryImageId;

    @NotNull
    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "diary_id")
    private Diary diary;

    @NotNull
    private String uploadFileName;

    @NotNull
    private String storeFileName;

    public static DiaryImage of(UploadFile fileInfos, Diary diary){
        DiaryImage diaryImage = new DiaryImage();
        diaryImage.setDiary(diary);
        diaryImage.setUploadFileName(fileInfos.getUploadFileName());
        diaryImage.setStoreFileName(fileInfos.getStoreFileName());
        return diaryImage;
    }
}
