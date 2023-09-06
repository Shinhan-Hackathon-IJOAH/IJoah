package com.shinhan.shbhack.ijoa.domain.diary.repository.query;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.shinhan.shbhack.ijoa.domain.diary.entity.Diary;
import com.shinhan.shbhack.ijoa.domain.diary.entity.QDiary;
import com.shinhan.shbhack.ijoa.domain.member.entity.Member;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@RequiredArgsConstructor
public class DiaryQueryRepository {

    private final JPAQueryFactory queryFactory;

    public List<Diary> findByMember(Long memberID){
        return queryFactory.selectFrom(QDiary.diary).where(QDiary.diary.member.id.eq(memberID)).fetch();
    }
}
