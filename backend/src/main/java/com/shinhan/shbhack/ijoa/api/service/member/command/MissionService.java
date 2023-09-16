package com.shinhan.shbhack.ijoa.api.service.member.command;

import com.shinhan.shbhack.ijoa.api.controller.bank.dto.request.BankTransferRequest;
import com.shinhan.shbhack.ijoa.api.service.alarm.command.AlarmService;
import com.shinhan.shbhack.ijoa.api.service.alarm.dto.request.AlarmNotifyRequest;
import com.shinhan.shbhack.ijoa.api.service.bank.command.BankService;
import com.shinhan.shbhack.ijoa.api.service.member.dto.request.MissionCheckServiceRequest;
import com.shinhan.shbhack.ijoa.api.service.member.dto.request.MissionCreateServiceRequest;
import com.shinhan.shbhack.ijoa.common.error.ErrorCode;
import com.shinhan.shbhack.ijoa.common.error.exception.EntityNotFoundException;
import com.shinhan.shbhack.ijoa.common.error.exception.InvalidValueException;
import com.shinhan.shbhack.ijoa.domain.bank.repository.datajpa.AccountRepository;
import com.shinhan.shbhack.ijoa.domain.member.entity.Member;
import com.shinhan.shbhack.ijoa.domain.member.entity.Mission;
import com.shinhan.shbhack.ijoa.domain.member.entity.Notification;
import com.shinhan.shbhack.ijoa.domain.member.entity.enums.Accomplishment;
import com.shinhan.shbhack.ijoa.domain.member.entity.enums.NotificationType;
import com.shinhan.shbhack.ijoa.domain.member.repository.datajpa.MemberRepository;
import com.shinhan.shbhack.ijoa.domain.member.repository.datajpa.MissionRepository;
import com.shinhan.shbhack.ijoa.domain.member.repository.datajpa.NotificationRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class MissionService {

    private final MemberRepository memberRepository;
    private final MissionRepository missionRepository;
    private final NotificationRepository notificationRepository;
    private final BankService bankService;
    private final AlarmService alarmService;

    public void createMission(MissionCreateServiceRequest request){
        Member parent = findMember(request.getParentId());
        Member child = findMember(request.getChildId());

        Mission mission = Mission.of(request, parent, child);
        missionRepository.save(mission);

        alarmService.sendAlarm(AlarmNotifyRequest.of(parent, child, mission, NotificationType.REGIST_MISSION));

//        notificationRepository.save( Notification.ofMission(parent, child, mission, NotificationType.REGIST_MISSION));
    }

    private Member findMember(Long id){
        return memberRepository.findById(id)
                .orElseThrow(
                        () -> new EntityNotFoundException(ErrorCode.NOTMATCH_MEMBER_ID)
                );
    }

    // TODO: 2023-09-16 이거 고쳐야될게 한두개가 아닌데 프로젝트 끝나고 리팩토링 해야겠다 ㅜ
    public void checkMission(MissionCheckServiceRequest request){
        Mission mission = missionRepository.findById(request.getMissionId())
                .orElseThrow(
                        () -> new EntityNotFoundException(ErrorCode.NOTMATCH_MEMBER_ID)
                );

        Accomplishment accomplishment = null;
        Member writer = mission.getWriter();
        Member challenger = mission.getChallenger();

        log.debug("abasdfasfasdfadfafsafasfafsdf: {}", request.isAccept());
        log.debug("{}, {}, {}, {}", mission.getWriter().getId(), mission.getChallenger().getId(), request.getMemberId(), mission.getAccomplishment());

        if((mission.getWriter().getId() == request.getMemberId()) && (mission.getAccomplishment() == Accomplishment.요청)){
            accomplishment = request.isAccept() ? Accomplishment.완료 : Accomplishment.비활성화;
        } else if((mission.getChallenger().getId() == request.getMemberId()) && request.isAccept() && (mission.getAccomplishment() == Accomplishment.진행)){
            accomplishment = Accomplishment.요청;
        }else{
            throw new InvalidValueException(ErrorCode.INVALID_INPUT_VALUE);
        }

        mission.changeAccomplishment(accomplishment);
        if(accomplishment == Accomplishment.완료){
            bankService.transfer(new BankTransferRequest(
                writer.getAccount().getAccountNumber(),
                    challenger.getAccount().getAccountNumber(),
                    mission.getReward().toString(),
                    "미션 보상 출금", "미션 보상 입금"
            ));
        }
    }


}
