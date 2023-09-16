package com.shinhan.shbhack.ijoa.domain.diary.repository.query;

import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.shinhan.shbhack.ijoa.api.service.diary.dto.response.DiaryCalenderResponse;
import com.shinhan.shbhack.ijoa.api.service.diary.dto.response.DiaryDetailResponse;
import com.shinhan.shbhack.ijoa.api.service.diary.dto.response.DiaryImageResponse;

import static com.shinhan.shbhack.ijoa.domain.diary.entity.QDiary.diary;

import static com.shinhan.shbhack.ijoa.domain.member.entity.QMember.member;
import static com.shinhan.shbhack.ijoa.domain.diary.entity.QDiaryImage.diaryImage;
import static com.shinhan.shbhack.ijoa.domain.diary.entity.QDiaryRecord.diaryRecord;


import com.shinhan.shbhack.ijoa.api.service.diary.dto.response.DiaryRecordResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@RequiredArgsConstructor
public class DiaryQueryRepository {

    private final JPAQueryFactory queryFactory;

    public List<DiaryCalenderResponse> findByMember(Long memberID){
        return queryFactory.select(Projections.fields(DiaryCalenderResponse.class, diary.diaryId.as("id"), diary.diaryDate.as("date"))).from(diary)
                .join(diary.member, member).where(diary.member.id.eq(memberID)).orderBy(diary.diaryDate.asc()).fetch();
    }

    public DiaryDetailResponse findDetailById(Long diaryId){
        return queryFactory.select(Projections.fields(DiaryDetailResponse.class, diary.diaryId, diary.title, diary.content, diary.diaryDate, diary.emotion, diary.member.name.as("writer"))).from(diary)
                .where(diary.diaryId.eq(diaryId)).fetchOne();
    }

    public List<DiaryImageResponse> findImagesById(Long diaryId){
        return queryFactory.select(Projections.fields(DiaryImageResponse.class, diaryImage.diaryImageId, diaryImage.uploadFileName, diaryImage.storeFileName)).from(diaryImage)
                .join(diaryImage.diary, diary).where(diaryImage.diary.diaryId.eq(diaryId)).fetch();
    }

    public DiaryRecordResponse findRecordById(Long diaryId){
        return queryFactory.select(Projections.fields(DiaryRecordResponse.class, diaryRecord.diaryRecordId, diaryRecord.uploadFileName, diaryRecord.storeFileName)).from(diaryRecord)
                .join(diaryRecord.diary, diary).where(diaryRecord.diary.diaryId.eq(diaryId)).fetchOne();
    }
}
