package com.shinhan.shbhack.ijoa.api.service.diary.dto.response;

import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

import static lombok.AccessLevel.PROTECTED;
import static lombok.AccessLevel.PUBLIC;

@Getter
@NoArgsConstructor(access = PUBLIC)
public class DiaryCalenderResponse {
    private Long id;
    private LocalDate date;
}
