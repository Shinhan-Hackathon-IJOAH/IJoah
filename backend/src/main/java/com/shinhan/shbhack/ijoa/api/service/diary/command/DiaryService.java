package com.shinhan.shbhack.ijoa.api.service.diary.command;

import com.shinhan.shbhack.ijoa.api.service.diary.dto.request.DiaryCreateServiceRequest;
import com.shinhan.shbhack.ijoa.common.util.file.FileStore;
import com.shinhan.shbhack.ijoa.common.util.file.UploadFile;
import com.shinhan.shbhack.ijoa.domain.diary.entity.Diary;
import com.shinhan.shbhack.ijoa.domain.diary.entity.DiaryImage;
import com.shinhan.shbhack.ijoa.domain.diary.repository.datajpa.DiaryRepository;
import com.shinhan.shbhack.ijoa.domain.diary.repository.query.DiaryQueryRepository;
import com.shinhan.shbhack.ijoa.domain.member.entity.Member;
import com.shinhan.shbhack.ijoa.domain.member.repository.datajpa.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class DiaryService {
    private final DiaryRepository diaryRepository;
    private final DiaryQueryRepository diaryQueryRepository;
    private final MemberRepository memberRepository;
    private final FileStore fileStore;
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
            diaryRepository.save(newDiary);

        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    public List<Diary> listDiary(Long memberId){
        log.info("멤버 아이디: " + memberId.toString());

        return diaryQueryRepository.findByMember(memberId);
    }
}
