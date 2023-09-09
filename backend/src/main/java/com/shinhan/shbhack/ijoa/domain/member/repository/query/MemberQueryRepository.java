package com.shinhan.shbhack.ijoa.domain.member.repository.query;

import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.shinhan.shbhack.ijoa.api.service.member.dto.request.MemberLoginServiceRequest;
import com.shinhan.shbhack.ijoa.common.model.JwtCreateModel;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.Optional;

import static com.shinhan.shbhack.ijoa.domain.member.entity.QMember.member;

@Repository
@RequiredArgsConstructor
public class MemberQueryRepository {

    private final JPAQueryFactory queryFactory;

    public Optional<JwtCreateModel> searchByEmailAndPassword(String email, String password){
        return Optional.ofNullable(queryFactory
                .select(Projections.constructor(JwtCreateModel.class,
                        member.id,
                        member.email,
                        member.memberRole
                        ))
                .from(member)
                .where(
                        member.email.eq(email).and(member.password.eq(password))
                )
                .fetchOne());
    }
}
