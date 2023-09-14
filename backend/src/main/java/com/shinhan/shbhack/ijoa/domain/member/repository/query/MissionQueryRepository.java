package com.shinhan.shbhack.ijoa.domain.member.repository.query;

import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.shinhan.shbhack.ijoa.domain.member.entity.Mission;
import com.shinhan.shbhack.ijoa.domain.member.entity.QMission;
import com.shinhan.shbhack.ijoa.domain.member.entity.enums.Accomplishment;
import com.shinhan.shbhack.ijoa.domain.member.entity.enums.MemberRole;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

import static com.shinhan.shbhack.ijoa.domain.member.entity.QMission.mission;

@Repository
@RequiredArgsConstructor
public class MissionQueryRepository {

    private final JPAQueryFactory queryFactory;

    public List<Mission> findMissionList(Long memberId, MemberRole memberRole, Accomplishment accomplishment){
        return queryFactory
                .selectFrom(mission)
                .where(isParent(memberId, memberRole),
                        isStatus(accomplishment),
                        mission.startDate.goe(LocalDate.now()),
                        mission.endDate.loe(LocalDate.now())
                )
                .fetch();
    }

    private BooleanExpression isParent(Long memberId, MemberRole memberRole){
        return memberRole == MemberRole.PARENT ? mission.writer.id.eq(memberId) : mission.challenger.id.eq(memberId);
    }
    private BooleanExpression isStatus(Accomplishment accomplishment){
        return mission.accomplishment.eq(accomplishment);
    }
}
