package com.shinhan.shbhack.ijoa.domain.diary.entity;

import com.shinhan.shbhack.ijoa.domain.UploadFile;
import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

import static javax.persistence.FetchType.LAZY;
import static javax.persistence.GenerationType.IDENTITY;

@Entity
@Getter
@Setter
@NoArgsConstructor(access= AccessLevel.PROTECTED)
public class DiaryRecord {
    @Id
    @Column(name = "diary_record_id")
    @GeneratedValue(strategy = IDENTITY)
    private Long diaryRecordId;

    @NotNull
    @OneToOne(fetch = LAZY)
    @JoinColumn(name = "diary_id")
    private Diary diary;

    @NotNull
    private String uploadFileName;

    @NotNull
    private String storeFileName;

    @Builder
    public DiaryRecord(Long diaryRecordId, Diary diary, String uploadFileName, String storeFileName) {
        this.diaryRecordId = diaryRecordId;
        this.diary = diary;
        this.uploadFileName = uploadFileName;
        this.storeFileName = storeFileName;
    }

    public static DiaryRecord of(UploadFile fileInfos, Diary diary){
        DiaryRecord diaryRecord = new DiaryRecord();
        diaryRecord.setDiary(diary);
        diaryRecord.setUploadFileName(fileInfos.getUploadFileName());
        diaryRecord.setStoreFileName(fileInfos.getStoreFileName());
        return diaryRecord;
    }
}
