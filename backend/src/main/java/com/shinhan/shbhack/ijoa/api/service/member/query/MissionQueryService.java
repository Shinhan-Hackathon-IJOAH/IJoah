package com.shinhan.shbhack.ijoa.api.service.member.query;

import com.shinhan.shbhack.ijoa.api.service.member.dto.request.MissionListServiceRequest;
import com.shinhan.shbhack.ijoa.api.service.member.dto.response.MissionListResponse;
import com.shinhan.shbhack.ijoa.api.service.member.dto.response.MissionResponse;
import com.shinhan.shbhack.ijoa.api.service.member.dto.response.MissionSummaryResponse;
import com.shinhan.shbhack.ijoa.common.error.ErrorCode;
import com.shinhan.shbhack.ijoa.common.error.exception.EntityNotFoundException;
import com.shinhan.shbhack.ijoa.domain.member.entity.Member;
import com.shinhan.shbhack.ijoa.domain.member.entity.Mission;
import com.shinhan.shbhack.ijoa.domain.member.entity.enums.Accomplishment;
import com.shinhan.shbhack.ijoa.domain.member.repository.datajpa.MemberRepository;
import com.shinhan.shbhack.ijoa.domain.member.repository.datajpa.MissionRepository;
import com.shinhan.shbhack.ijoa.domain.member.repository.query.MissionQueryRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class MissionQueryService {

    private final MemberRepository memberRepository;
    private final MissionRepository missionRepository;
    private final MissionQueryRepository missionQueryRepository;

    public MissionResponse getMission(Long missionId){
        Mission mission = missionRepository.findById(missionId)
                .orElseThrow(
                        () -> new EntityNotFoundException(ErrorCode.NOTMATCH_MISSION_ID)
                );

        return MissionResponse.of(mission);
    }

    public MissionListResponse getMissionList(MissionListServiceRequest request){

        log.debug("request: {}, {}", request.getMemberId(), request.getMemberRole());

        Member member = memberRepository.findById(request.getMemberId())
                .orElseThrow(
                        () -> new EntityNotFoundException(ErrorCode.NOTMATCH_MEMBER_ID)
                );

        List<MissionSummaryResponse> completeMissions = getMissionSummary(request, Accomplishment.완료);
        List<MissionSummaryResponse> incompleteMissions = getMissionSummary(request, Accomplishment.진행);
        List<MissionSummaryResponse> checkingMissions = getMissionSummary(request, Accomplishment.요청);

        return MissionListResponse.of(member, completeMissions, incompleteMissions, checkingMissions);
    }

    private List<MissionSummaryResponse> getMissionSummary(MissionListServiceRequest request, Accomplishment accomplishment){
        return missionQueryRepository.findMissionList(request.getMemberId(), request.getMemberRole(), accomplishment)
                        .stream()
                        .map(MissionSummaryResponse::of)
                        .collect(Collectors.toList());
    }
}
