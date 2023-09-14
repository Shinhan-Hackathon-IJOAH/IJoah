package com.shinhan.shbhack.ijoa.domain.member.repository.query;

import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.shinhan.shbhack.ijoa.api.service.alarm.dto.response.AlarmInfoResponse;
import com.shinhan.shbhack.ijoa.domain.member.entity.Member;
import com.shinhan.shbhack.ijoa.domain.member.entity.enums.ConfirmStatus;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import static com.shinhan.shbhack.ijoa.domain.member.entity.QMember.member;

import static com.shinhan.shbhack.ijoa.domain.member.entity.QNotification.notification;
import static com.shinhan.shbhack.ijoa.domain.member.entity.QMission.mission;


import java.util.List;

@Repository
@RequiredArgsConstructor
public class AlarmQueryRepository {
    private final JPAQueryFactory queryFactory;

    public List<AlarmInfoResponse> getAlarmListByMember(String memberEmail){
        return queryFactory.select(Projections.fields(AlarmInfoResponse.class, notification.id, notification.notificationType, notification.confirmStatus,
                        notification.sender.name.as("senderName"), notification.content, notification.mission.id.as("missionId"), notification.createdTime.as("time"), notification.parentInfo)).from(notification).join(notification.receiver, member)
                .where(notification.receiver.email.eq(memberEmail).and(notification.confirmStatus.eq(ConfirmStatus.UNCONFIRMED)))
                .orderBy(notification.createdTime.desc()).fetch();
    }
}
