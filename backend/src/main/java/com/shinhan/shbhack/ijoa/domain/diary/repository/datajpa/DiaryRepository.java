package com.shinhan.shbhack.ijoa.domain.diary.repository.datajpa;

import com.shinhan.shbhack.ijoa.domain.diary.entity.Diary;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DiaryRepository extends JpaRepository<Diary, Long> {

}