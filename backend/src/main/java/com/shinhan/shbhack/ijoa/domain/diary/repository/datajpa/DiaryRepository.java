package com.shinhan.shbhack.ijoa.domain.diary.repository.datajpa;

import com.shinhan.shbhack.ijoa.domain.diary.entity.Diary;
import com.shinhan.shbhack.ijoa.domain.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface DiaryRepository extends JpaRepository<Diary, Long> {
    boolean existsDiaryByMemberAndDiaryDate(Member member, LocalDate diary_date);
}
