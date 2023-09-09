package com.shinhan.shbhack.ijoa.domain.diary.repository.datajpa;

import com.shinhan.shbhack.ijoa.domain.diary.entity.DiaryRecord;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DiaryRecordRepository extends JpaRepository<DiaryRecord, Long> {
}
