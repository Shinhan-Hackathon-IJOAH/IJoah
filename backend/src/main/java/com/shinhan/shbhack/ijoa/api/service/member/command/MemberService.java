package com.shinhan.shbhack.ijoa.api.service.member.command;

import com.shinhan.shbhack.ijoa.api.service.member.dto.request.MemberCreateServiceRequest;
import com.shinhan.shbhack.ijoa.api.service.member.dto.request.MemberLoginServiceRequest;
import com.shinhan.shbhack.ijoa.api.service.member.dto.request.MemberUpdateServiceRequest;
import com.shinhan.shbhack.ijoa.api.service.member.dto.response.MemberChildHomeResponse;
import com.shinhan.shbhack.ijoa.api.service.member.dto.response.MemberParentHomeResponse;
import com.shinhan.shbhack.ijoa.api.service.member.dto.response.MemberResponse;
import com.shinhan.shbhack.ijoa.api.service.member.dto.response.ProfileImageResponse;
import com.shinhan.shbhack.ijoa.common.error.ErrorCode;
import com.shinhan.shbhack.ijoa.common.error.exception.EntityNotFoundException;
import com.shinhan.shbhack.ijoa.common.error.exception.InvalidValueException;
import com.shinhan.shbhack.ijoa.domain.bank.entity.Account;
import com.shinhan.shbhack.ijoa.domain.member.entity.Family;
import com.shinhan.shbhack.ijoa.domain.member.entity.Member;
import com.shinhan.shbhack.ijoa.domain.member.repository.datajpa.FamilyRepository;
import com.shinhan.shbhack.ijoa.domain.member.repository.datajpa.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.swing.text.html.Option;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class MemberService {

    private final MemberRepository memberRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    public void createMember(MemberCreateServiceRequest request){
        try{
            memberRepository.save(request.toEntity(encodePassword(request.getPassword())));
        } catch (Exception e){
            throw new InvalidValueException(ErrorCode.EMAIL_DUPLICATION);
        }

    }

    public MemberParentHomeResponse parentHome(Long memberId){
        Member member = memberRepository.findById(memberId)
                .orElseThrow(
                        () -> new EntityNotFoundException(ErrorCode.NOTMATCH_MEMBER_ID)
                );

        return MemberParentHomeResponse.of(member);
    }

    public MemberChildHomeResponse childHome(Long memberId){
        Member member = memberRepository.findById(memberId)
                .orElseThrow(
                        () -> new EntityNotFoundException(ErrorCode.NOTMATCH_MEMBER_ID)
                );

        return MemberChildHomeResponse.of(member);
    }

    public void updateMember(MemberUpdateServiceRequest request){

    }

    private String encodePassword(String password){
        return bCryptPasswordEncoder.encode(password);
    }

}
