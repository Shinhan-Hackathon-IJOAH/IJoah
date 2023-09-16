package com.shinhan.shbhack.ijoa.api.service.member.command;

import com.shinhan.shbhack.ijoa.api.service.alarm.command.AlarmService;
import com.shinhan.shbhack.ijoa.api.service.alarm.dto.request.AlarmNotifyRequest;
import com.shinhan.shbhack.ijoa.api.service.member.dto.request.MemberPermitFamilyServiceRequest;
import com.shinhan.shbhack.ijoa.api.service.member.dto.request.MemberRegistFamilyServiceRequest;
import com.shinhan.shbhack.ijoa.common.error.ErrorCode;
import com.shinhan.shbhack.ijoa.common.error.exception.EntityNotFoundException;
import com.shinhan.shbhack.ijoa.common.error.exception.InvalidValueException;
import com.shinhan.shbhack.ijoa.domain.member.entity.Family;
import com.shinhan.shbhack.ijoa.domain.member.entity.Member;
import com.shinhan.shbhack.ijoa.domain.member.entity.enums.ConfirmStatus;
import com.shinhan.shbhack.ijoa.domain.member.entity.enums.NotificationType;
import com.shinhan.shbhack.ijoa.domain.member.repository.datajpa.FamilyRepository;
import com.shinhan.shbhack.ijoa.domain.member.repository.datajpa.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class FamilyService {

    private final MemberRepository memberRepository;
    private final FamilyRepository familyRepository;
    private final AlarmService alarmService;
    private Map<Long, Long> checkRelation = new ConcurrentHashMap<>();

    public void registFamily(MemberRegistFamilyServiceRequest request){
        Member parent = memberRepository.findById(Long.parseLong(request.getParentId()))
                .orElseThrow(
                        () -> new EntityNotFoundException(ErrorCode.NOTMATCH_MEMBER_ID)
                );

        Member child =  memberRepository.findByEmail(request.getChildEmail())
                .orElseThrow(
                        () -> new EntityNotFoundException(ErrorCode.NOTMATCH_MEMBER_ID)
                );
        if(checkRelation.get(child.getId()) != null)throw new EntityNotFoundException(ErrorCode.NOTMATCH_MEMBER_ID);

        if(parent == child) throw new InvalidValueException(ErrorCode.REGIST_MYSELF);

        checkRelation.put(child.getId(), parent.getId()); // 요청에 대한 정보를 가짐

        /* 아이에게 알람 전송 */
        String content = parent.getName()+"님이 "+child.getName()+"님을 자녀로 등록했어요.";
        alarmService.sendAlarm(AlarmNotifyRequest.builder()
                .sender(parent)
                .receiver(child)
                .notificationType(NotificationType.CHILD_ENROLL)
                .confirmStatus(ConfirmStatus.UNCONFIRMED)
                .content(content)
                .parentInfo(parent.getId().toString())
                .build());
    }

    public boolean permitFamily(MemberPermitFamilyServiceRequest request){
        if(checkRelation.get(Long.parseLong(request.getChildId())) != null && (checkRelation.get(Long.parseLong(request.getChildId())) != Long.parseLong(request.getParentId()))){
            checkRelation.remove(Long.parseLong(request.getChildId()));
            return false;
        }
        Member parent = memberRepository.findById(Long.parseLong(request.getParentId())).orElseThrow(
                () -> new EntityNotFoundException(ErrorCode.NOTMATCH_MEMBER_ID)
        );
        Member child = memberRepository.findById(Long.parseLong(request.getChildId())).orElseThrow(
                () -> new EntityNotFoundException(ErrorCode.NOTMATCH_MEMBER_ID)
        );
        if(parent == child) throw new InvalidValueException(ErrorCode.REGIST_MYSELF);

        familyRepository.save(Family.of(parent, child));
        alarmService.updateEnrollAlarm(child.getId());
        checkRelation.remove(Long.parseLong(request.getChildId()));

        return true;
    }
    public boolean noPermitFamily(MemberPermitFamilyServiceRequest request){
        if(checkRelation.get(Long.parseLong(request.getChildId())) != null && (checkRelation.get(Long.parseLong(request.getChildId())) != Long.parseLong(request.getParentId()))){
            checkRelation.remove(Long.parseLong(request.getChildId()));
            return false;
        }
        Member child = memberRepository.findById(Long.parseLong(request.getChildId())).orElseThrow(
                () -> new EntityNotFoundException(ErrorCode.NOTMATCH_MEMBER_ID)
        );
        alarmService.updateEnrollAlarm(child.getId());
        checkRelation.remove(Long.parseLong(request.getChildId()));

        return true;
    }

}
