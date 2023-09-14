package com.shinhan.shbhack.ijoa.api.service.member.command;

import com.shinhan.shbhack.ijoa.api.service.member.dto.request.MemberRegistFamilyServiceRequest;
import com.shinhan.shbhack.ijoa.common.error.ErrorCode;
import com.shinhan.shbhack.ijoa.common.error.exception.EntityNotFoundException;
import com.shinhan.shbhack.ijoa.common.error.exception.InvalidValueException;
import com.shinhan.shbhack.ijoa.domain.member.entity.Family;
import com.shinhan.shbhack.ijoa.domain.member.entity.Member;
import com.shinhan.shbhack.ijoa.domain.member.repository.datajpa.FamilyRepository;
import com.shinhan.shbhack.ijoa.domain.member.repository.datajpa.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class FamilyService {

    private final MemberRepository memberRepository;
    private final FamilyRepository familyRepository;

    public void registFamily(MemberRegistFamilyServiceRequest request){
        Member parent = memberRepository.findById(request.getParentId())
                .orElseThrow(
                        () -> new EntityNotFoundException(ErrorCode.NOTMATCH_MEMBER_ID)
                );

        Member child =  memberRepository.findByEmail(request.getChildEmail())
                .orElseThrow(
                        () -> new EntityNotFoundException(ErrorCode.NOTMATCH_MEMBER_ID)
                );

        if(parent == child) throw new InvalidValueException(ErrorCode.REGIST_MYSELF);

        familyRepository.save(Family.of(parent, child));
    }
}
