package com.shinhan.shbhack.ijoa.domain.diary.repository.query;

import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.shinhan.shbhack.ijoa.api.service.diary.dto.response.DiaryCalenderResponse;
import com.shinhan.shbhack.ijoa.domain.diary.entity.Diary;

import static com.shinhan.shbhack.ijoa.domain.diary.entity.QDiary.diary;
import com.shinhan.shbhack.ijoa.domain.member.entity.Member;

import static com.shinhan.shbhack.ijoa.domain.member.entity.QMember.member;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@RequiredArgsConstructor
public class DiaryQueryRepository {

    private final JPAQueryFactory queryFactory;

    public List<DiaryCalenderResponse> findByMember(Long memberID){
//        return queryFactory.selectFrom(diary).join(diary.member, member).where(diary.member.id.eq(memberID)).fetch();
        return queryFactory.select(Projections.fields(DiaryCalenderResponse.class, diary.diary_date.as("date"))).from(diary).join(diary.member, member).where(diary.member.id.eq(memberID)).fetch();

    }
}
