package com.shinhan.shbhack.ijoa.domain.diary.entity;

import com.shinhan.shbhack.ijoa.api.service.diary.dto.request.DiaryCreateServiceRequest;
import com.shinhan.shbhack.ijoa.domain.BaseEntity;
import com.shinhan.shbhack.ijoa.domain.member.entity.Member;
import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

import static javax.persistence.FetchType.LAZY;
import static lombok.AccessLevel.PROTECTED;

@Entity
@Getter
@Setter
@NoArgsConstructor(access = PROTECTED)
public class Diary extends BaseEntity {

    @Id
    @Column(name="diary_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long diaryId;

    @NotNull
    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @NotNull
    private String title;

    @NotEmpty
    @Lob
    private String content;

    @NotNull
    private LocalDate diary_date;

    @OneToMany(mappedBy = "diary")
    private List<DiaryImage> images;

    @OneToMany(mappedBy = "diary")
    private List<DiaryShare> shares;


    public static Diary of(DiaryCreateServiceRequest diaryCreateServiceRequest, Member member){
        Diary diary = new Diary();
        diary.setMember(member);
        diary.setTitle(diaryCreateServiceRequest.getTitle());
        diary.setDiary_date(diaryCreateServiceRequest.getDate());
        diary.setContent(diaryCreateServiceRequest.getContent());
//        diary.setImages(images);
        return diary;
    }
}
