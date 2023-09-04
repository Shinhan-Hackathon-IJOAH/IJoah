package com.shinhan.shbhack.ijoa.domain.diary.entity;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

import static javax.persistence.FetchType.LAZY;
import static javax.persistence.GenerationType.IDENTITY;

@Entity
@Getter
@NoArgsConstructor(access= AccessLevel.PROTECTED)
public class DiaryImage {
    @Id
    @Column(name = "diary_image_id")
    @GeneratedValue(strategy = IDENTITY)
    private Integer diaryImageId;

    @NotNull
    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "diary_id")
    private Diary diary;

    @NotNull
    private String uploadFileName;

    @NotNull
    private String storeFileName;

}
