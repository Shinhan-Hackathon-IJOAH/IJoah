package com.shinhan.shbhack.ijoa.api.service.member.command;

import com.shinhan.shbhack.ijoa.api.service.member.dto.request.MissionCreateServiceRequest;
import com.shinhan.shbhack.ijoa.common.error.ErrorCode;
import com.shinhan.shbhack.ijoa.common.error.exception.EntityNotFoundException;
import com.shinhan.shbhack.ijoa.domain.member.entity.Member;
import com.shinhan.shbhack.ijoa.domain.member.entity.Mission;
import com.shinhan.shbhack.ijoa.domain.member.entity.Notification;
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

    public void createMission(MissionCreateServiceRequest request){
        Member parent = findMember(request.getParentId());
        Member child = findMember(request.getChildId());

        Mission mission = Mission.of(request, parent, child);
        missionRepository.save(mission);

        notificationRepository.save( Notification.ofMission(parent, child, mission, NotificationType.REGIST_MISSION));
    }

    private Member findMember(Long id){
        return memberRepository.findById(id)
                .orElseThrow(
                        () -> new EntityNotFoundException(ErrorCode.NOTMATCH_MEMBER_ID)
                );
    }
}
