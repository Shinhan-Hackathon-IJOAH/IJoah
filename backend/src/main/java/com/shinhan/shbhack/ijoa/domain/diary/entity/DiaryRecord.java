package com.shinhan.shbhack.ijoa.domain.diary.entity;

import com.shinhan.shbhack.ijoa.common.util.file.UploadFile;
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

    public static DiaryRecord of(UploadFile fileInfos, Diary diary){
        DiaryRecord diaryRecord = new DiaryRecord();
        diaryRecord.setDiary(diary);
        diaryRecord.setUploadFileName(fileInfos.getUploadFileName());
        diaryRecord.setStoreFileName(fileInfos.getStoreFileName());
        return diaryRecord;
    }
}
