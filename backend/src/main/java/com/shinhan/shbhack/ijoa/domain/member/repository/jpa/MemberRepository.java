package com.shinhan.shbhack.ijoa.domain.member.repository.jpa;


import com.shinhan.shbhack.ijoa.domain.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MemberRepository extends JpaRepository<Member, Long> {

}
