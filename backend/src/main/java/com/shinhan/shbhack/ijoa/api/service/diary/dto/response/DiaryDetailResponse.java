package com.shinhan.shbhack.ijoa.api.service.diary.dto.response;

import com.shinhan.shbhack.ijoa.domain.diary.entity.DiaryImage;
import com.shinhan.shbhack.ijoa.domain.diary.entity.DiaryShare;
import com.shinhan.shbhack.ijoa.domain.member.entity.Member;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.JoinColumn;
import javax.persistence.Lob;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.time.LocalDate;
import java.util.List;

import static javax.persistence.FetchType.LAZY;
import static lombok.AccessLevel.PROTECTED;
import static lombok.AccessLevel.PUBLIC;

@Getter
@Setter
@NoArgsConstructor(access = PUBLIC)
public class DiaryDetailResponse {
    private Long diaryId;
    private String title;
    private String content;
    private LocalDate diary_date;
    private List<DiaryImageResponse> images;
}
