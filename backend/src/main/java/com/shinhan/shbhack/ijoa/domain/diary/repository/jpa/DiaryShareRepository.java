package com.shinhan.shbhack.ijoa.domain.diary.repository.jpa;

import com.shinhan.shbhack.ijoa.domain.diary.entity.DiaryImage;
import com.shinhan.shbhack.ijoa.domain.diary.entity.DiaryShare;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DiaryShareRepository extends JpaRepository<DiaryShare, Integer> {
}
