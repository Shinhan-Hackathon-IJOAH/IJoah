package com.shinhan.shbhack.ijoa.api.service.member.query;

import com.shinhan.shbhack.ijoa.common.util.error.ErrorCode;
import com.shinhan.shbhack.ijoa.common.util.error.exception.EntityNotFoundException;
import com.shinhan.shbhack.ijoa.common.util.error.exception.ServiceRuntimeException;
import com.shinhan.shbhack.ijoa.domain.member.entity.Member;
import com.shinhan.shbhack.ijoa.domain.member.repository.datajpa.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class MemberQueryService {

    private final MemberRepository memberRepository;

    public void searchExistMemberByEmail(String email){
        if(memberRepository.existsByEmail(email)) throw new EntityNotFoundException(ErrorCode.EMAIL_DUPLICATION);
    }
}
