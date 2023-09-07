package com.shinhan.shbhack.ijoa.domain.diary.entity;

import com.shinhan.shbhack.ijoa.common.util.file.UploadFile;
import com.shinhan.shbhack.ijoa.domain.BaseEntity;
import com.shinhan.shbhack.ijoa.domain.member.entity.Member;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

import java.time.LocalDateTime;

import static javax.persistence.FetchType.LAZY;
import static javax.persistence.GenerationType.IDENTITY;

@Entity
@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class DiaryShare extends BaseEntity {
    @Id
    @Column(name="diary_share_id")
    @GeneratedValue(strategy = IDENTITY)
    private Long diaryShareId;


    @NotNull
    @ManyToOne(fetch = LAZY)
    @JoinColumn(name="diary_id")
    private Diary diary;

    @NotNull
    private LocalDateTime expireTime;

    public static DiaryShare of(Diary toShareDiary, LocalDateTime expireTime){
        DiaryShare diaryShare = new DiaryShare();
        diaryShare.setDiary(toShareDiary);
        diaryShare.setExpireTime(expireTime);
        return diaryShare;
    }
}