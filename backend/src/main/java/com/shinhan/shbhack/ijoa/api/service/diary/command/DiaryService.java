package com.shinhan.shbhack.ijoa.api.service.diary.command;

import com.shinhan.shbhack.ijoa.api.service.diary.dto.request.DiaryCreateServiceRequest;
import com.shinhan.shbhack.ijoa.api.service.diary.dto.response.DiaryCalenderResponse;
import com.shinhan.shbhack.ijoa.api.service.diary.dto.response.DiaryDetailResponse;
import com.shinhan.shbhack.ijoa.api.service.diary.dto.response.DiaryImageResponse;
import com.shinhan.shbhack.ijoa.api.service.diary.dto.response.DiaryRecordResponse;
import com.shinhan.shbhack.ijoa.common.util.file.FileStore;
import com.shinhan.shbhack.ijoa.common.util.file.UploadFile;
import com.shinhan.shbhack.ijoa.domain.diary.entity.Diary;
import com.shinhan.shbhack.ijoa.domain.diary.entity.DiaryImage;
import com.shinhan.shbhack.ijoa.domain.diary.entity.DiaryRecord;
import com.shinhan.shbhack.ijoa.domain.diary.entity.DiaryShare;
import com.shinhan.shbhack.ijoa.domain.diary.repository.datajpa.DiaryRepository;
import com.shinhan.shbhack.ijoa.domain.diary.repository.datajpa.DiaryShareRepository;
import com.shinhan.shbhack.ijoa.domain.diary.repository.query.DiaryQueryRepository;
import com.shinhan.shbhack.ijoa.domain.member.entity.Member;
import com.shinhan.shbhack.ijoa.domain.member.repository.datajpa.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.concurrent.ConcurrentHashMap;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class DiaryService {
    private final DiaryRepository diaryRepository;
    private final DiaryShareRepository diaryShareRepository;
    private final DiaryQueryRepository diaryQueryRepository;
    private final MemberRepository memberRepository;
    private final FileStore fileStore;
    private Map<Long, LocalDateTime> checkExpire = new ConcurrentHashMap<>();
    public void writeDiary(DiaryCreateServiceRequest diaryCreateServiceRequest){
        try{
            Long memberId = Long.parseLong(diaryCreateServiceRequest.getMemberId());
            log.info(memberId.toString());
            Member member = memberRepository.findById(memberId).orElseThrow(()->new RuntimeException("유저 아이디로 멤버 찾기 실패"));
            Diary newDiary = Diary.of(diaryCreateServiceRequest, member); // 일기장 생성

            List<UploadFile> fileInfos = fileStore.storeFiles(diaryCreateServiceRequest.getPhoto());
            List<DiaryImage> diaryImageList = new ArrayList<>();
            for(UploadFile uploadFile : fileInfos){
                diaryImageList.add(DiaryImage.of(uploadFile, newDiary));
            } // 다이어리 이미지 객체 생성
            newDiary.setImages(diaryImageList); // 다이어리에 이미지 리스트 지정

            MultipartFile recordInfo = diaryCreateServiceRequest.getRecord();
            UploadFile diaryRecord = null;
            if(recordInfo != null && !recordInfo.isEmpty()){
                diaryRecord = fileStore.storeFile(recordInfo);
                newDiary.setRecord(DiaryRecord.of(diaryRecord, newDiary));

            }
            diaryRepository.save(newDiary);

        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    public List<DiaryCalenderResponse> listDiary(Long memberId){
        log.info("멤버 아이디: " + memberId.toString());

        return diaryQueryRepository.findByMember(memberId);
    }

    public DiaryDetailResponse readDiary(Long diaryId){
        log.info("다이어리 읽기, diaryId : "+diaryId);
        DiaryDetailResponse result = diaryQueryRepository.findDetailById(diaryId);
        List<DiaryImageResponse> diaryImageResponseList = diaryQueryRepository.findImagesById(diaryId);
        DiaryRecordResponse diaryRecordResponse = diaryQueryRepository.findRecordById(diaryId);
        result.setImages(diaryImageResponseList);
        result.setRecord(diaryRecordResponse);
        return result;
    }

    public void modifyDiary(DiaryCreateServiceRequest diaryCreateServiceRequest, Long diaryId){
        try{
            Diary modifyDiary = diaryRepository.findById(diaryId).orElseThrow(()-> new RuntimeException("일기 찾기 실패"));

            modifyDiary.setTitle(diaryCreateServiceRequest.getTitle());
            modifyDiary.setEmotion(diaryCreateServiceRequest.getEmotion());
            modifyDiary.setContent(diaryCreateServiceRequest.getContent());
            modifyDiary.setDiary_date(diaryCreateServiceRequest.getDate());
            List<UploadFile> fileInfos = fileStore.storeFiles(diaryCreateServiceRequest.getPhoto());
            List<DiaryImage> diaryImageList = new ArrayList<>();
            for(UploadFile uploadFile : fileInfos){
                diaryImageList.add(DiaryImage.of(uploadFile, modifyDiary));
            } // 다이어리 이미지 객체 생성
            modifyDiary.setImages(diaryImageList); // 다이어리에 이미지 리스트 지정

            MultipartFile recordInfo = diaryCreateServiceRequest.getRecord();
            UploadFile diaryRecord = null;
            if(recordInfo != null && !recordInfo.isEmpty()){
                diaryRecord = fileStore.storeFile(recordInfo);
                modifyDiary.setRecord(DiaryRecord.of(diaryRecord, modifyDiary));

            }

        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }
    public void deleteDiary(Long diaryId){
        diaryRepository.deleteById(diaryId);
    }

    public void shareDiary(Long diaryId){
//        Diary toShareDiary = diaryRepository.findById(diaryId).orElseThrow(()-> new RuntimeException("일기 찾기 실패"));
//        LocalDateTime nowTime = LocalDateTime.now();
//
//        LocalDateTime expireTime = nowTime.plusMinutes(5);
//        DiaryShare diaryShare = DiaryShare.of(toShareDiary, expireTime);
//        diaryShareRepository.save(diaryShare);
        LocalDateTime nowTime = LocalDateTime.now();

        LocalDateTime expireTime = nowTime.plusMinutes(5);

        if(checkExpire.get(diaryId) ==null){ // 공유 아닌 상태
            checkExpire.put(diaryId, expireTime); // 시간 삽입
        }else{ // 공유했던 값이 있을 때
            checkExpire.replace(diaryId, expireTime); // 새로운 시간으로 갱신
        }
    }

    public DiaryDetailResponse readShareDiary(Long diaryId){
        LocalDateTime nowTime = LocalDateTime.now();
        if(checkExpire.get(diaryId) ==null){ // 공유 아닌 상태
            return null;
        }else{ // 공유했던 값이 있을 때
            if(checkExpire.get(diaryId).isAfter(nowTime)){ // 만료 안되었을 때
                log.info("다이어리 읽기, diaryId : "+diaryId);
                DiaryDetailResponse result = diaryQueryRepository.findDetailById(diaryId);
                List<DiaryImageResponse> diaryImageResponseList = diaryQueryRepository.findImagesById(diaryId);
                DiaryRecordResponse diaryRecordResponse = diaryQueryRepository.findRecordById(diaryId);
                result.setImages(diaryImageResponseList);
                result.setRecord(diaryRecordResponse);
                return result;
            }else{
                return null;
            }
        }
    }
}
