package com.shinhan.shbhack.ijoa.domain.diary.repository.query;

import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class DiaryQueryRepository {

    private final JPAQueryFactory queryFactory;

}
