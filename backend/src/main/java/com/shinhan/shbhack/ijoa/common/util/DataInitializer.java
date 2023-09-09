package com.shinhan.shbhack.ijoa.common.util;

import com.shinhan.shbhack.ijoa.domain.member.entity.Member;
import com.shinhan.shbhack.ijoa.domain.member.entity.enums.ActivateStatus;
import com.shinhan.shbhack.ijoa.domain.member.entity.enums.Gender;
import com.shinhan.shbhack.ijoa.domain.member.entity.enums.MemberRole;
import com.shinhan.shbhack.ijoa.domain.member.repository.datajpa.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;

@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

    private final MemberRepository memberRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    @Override
    @Transactional
    public void run(String... args) throws Exception {



        Member member = Member.builder()
                .email("byuri1356@gmail1.com")
                .name("유승민")
                .password(bCryptPasswordEncoder.encode("1234"))
                .account("944500-00-000000")
                .address("address")
                .phoneNumber("010-9814-1356")
                .gender(Gender.MALE)
                .memberRole(MemberRole.PARENT)
                .activateStatus(ActivateStatus.ACTIVATE)
                .birthDate(LocalDate.of(1997, 7, 29))
                .build();

        memberRepository.save(member);
    }
}
