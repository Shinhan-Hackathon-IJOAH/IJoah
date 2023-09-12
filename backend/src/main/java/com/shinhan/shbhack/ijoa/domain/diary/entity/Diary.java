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
    private String emotion;


    // TODO: 2023-09-12 이름 바꿔주세요
    @NotNull
//    @Column(unique = true) // 여러사람이 같은 날짜 쓸때 에러
    private LocalDate diary_date;

    @OneToMany(mappedBy = "diary", cascade = CascadeType.ALL)
    private List<DiaryImage> images;


    @OneToOne(mappedBy = "diary", cascade = CascadeType.ALL)
    private DiaryRecord record;

    @Builder
    public Diary(Long diaryId, Member member, String title, String content, String emotion, LocalDate diary_date, List<DiaryImage> images, DiaryRecord record) {
        this.diaryId = diaryId;
        this.member = member;
        this.title = title;
        this.content = content;
        this.emotion = emotion;
        this.diary_date = diary_date;
        this.images = images;
        this.record = record;
    }

    public static Diary of(DiaryCreateServiceRequest diaryCreateServiceRequest, Member member){
        Diary diary = new Diary();
        diary.setMember(member);
        diary.setTitle(diaryCreateServiceRequest.getTitle());
        diary.setDiary_date(diaryCreateServiceRequest.getDate());
        diary.setContent(diaryCreateServiceRequest.getContent());
        diary.setEmotion(diaryCreateServiceRequest.getEmotion());
        return diary;
    }
}
