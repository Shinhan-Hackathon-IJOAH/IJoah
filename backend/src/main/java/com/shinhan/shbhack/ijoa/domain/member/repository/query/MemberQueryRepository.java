package com.shinhan.shbhack.ijoa.domain.member.repository.query;

import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.shinhan.shbhack.ijoa.common.model.UserDetailsModel;
import com.shinhan.shbhack.ijoa.domain.member.entity.QMember;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.Optional;

import static com.shinhan.shbhack.ijoa.domain.member.entity.QMember.member;

@Repository
@RequiredArgsConstructor
public class MemberQueryRepository {

    private final JPAQueryFactory queryFactory;

    public Optional<UserDetailsModel> findUserInfoModelById(Long id){
        return Optional.ofNullable(queryFactory
                .select(Projections.constructor(UserDetailsModel.class,
                        member.id,
                        member.name,
                        member.email,
                        member.memberRole
                        ))
                .from(member)
                .where(member.id.eq(id))
                .fetchOne());
    }

}
