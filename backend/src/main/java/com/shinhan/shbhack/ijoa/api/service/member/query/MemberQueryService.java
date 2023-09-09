package com.shinhan.shbhack.ijoa.api.service.member.query;

import com.shinhan.shbhack.ijoa.api.service.member.dto.request.MemberLoginServiceRequest;
import com.shinhan.shbhack.ijoa.api.service.member.dto.response.MemberTokenResponse;
import com.shinhan.shbhack.ijoa.common.model.JwtCreateModel;
import com.shinhan.shbhack.ijoa.common.util.error.ErrorCode;
import com.shinhan.shbhack.ijoa.common.util.error.exception.EntityNotFoundException;
import com.shinhan.shbhack.ijoa.common.util.error.exception.InvalidValueException;
import com.shinhan.shbhack.ijoa.common.util.error.exception.ServiceRuntimeException;
import com.shinhan.shbhack.ijoa.common.util.jwt.JwtUtil;
import com.shinhan.shbhack.ijoa.domain.member.entity.Member;
import com.shinhan.shbhack.ijoa.domain.member.repository.datajpa.MemberRepository;
import com.shinhan.shbhack.ijoa.domain.member.repository.query.MemberQueryRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class MemberQueryService {

    private final MemberRepository memberRepository;
    private final MemberQueryRepository memberQueryRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private final JwtUtil jwtUtil;

    public void searchExistMemberByEmail(String email){
        if(memberRepository.existsByEmail(email)) throw new EntityNotFoundException(ErrorCode.EMAIL_DUPLICATION);
    }

    public MemberTokenResponse loginMember(MemberLoginServiceRequest request){

        Member member = memberRepository.findByEmail(request.getEmail())
                .orElseThrow(
                        () -> new EntityNotFoundException(ErrorCode.NOTMATCH_MEMBER_EMAIL)
                );

        if(!bCryptPasswordEncoder.matches(request.getPassword(), member.getPassword()))
            throw new InvalidValueException(ErrorCode.NOTMATCH_MEMBER_PASSWORD);

        return jwtUtil.generateAllToken(member.toJwtCreateModel());
    }
}
