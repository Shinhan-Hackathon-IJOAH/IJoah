package com.shinhan.shbhack.ijoa.api.service.member.query;

import com.shinhan.shbhack.ijoa.api.service.member.dto.response.MissionResponse;
import com.shinhan.shbhack.ijoa.common.error.ErrorCode;
import com.shinhan.shbhack.ijoa.common.error.exception.EntityNotFoundException;
import com.shinhan.shbhack.ijoa.domain.member.entity.Mission;
import com.shinhan.shbhack.ijoa.domain.member.repository.datajpa.MissionRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class MissionQueryService {

    private final MissionRepository missionRepository;

    public MissionResponse getMission(Long missionId){
        Mission mission = missionRepository.findById(missionId)
                .orElseThrow(
                        () -> new EntityNotFoundException(ErrorCode.NOTMATCH_MISSION_ID)
                );

        return MissionResponse.of(mission);
    }
}
