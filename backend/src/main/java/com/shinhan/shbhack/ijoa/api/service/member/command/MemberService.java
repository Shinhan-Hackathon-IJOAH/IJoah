package com.shinhan.shbhack.ijoa.api.service.member.command;

import com.shinhan.shbhack.ijoa.api.service.member.dto.request.MemberCreateServiceRequest;
import com.shinhan.shbhack.ijoa.api.service.member.dto.request.MemberModifyServiceRequest;
import com.shinhan.shbhack.ijoa.api.service.member.dto.request.MemberRegistFamilyServiceRequest;
import com.shinhan.shbhack.ijoa.api.service.member.dto.response.MemberChildHomeResponse;
import com.shinhan.shbhack.ijoa.api.service.member.dto.response.MemberParentHomeResponse;
import com.shinhan.shbhack.ijoa.common.error.ErrorCode;
import com.shinhan.shbhack.ijoa.common.error.exception.EntityNotFoundException;
import com.shinhan.shbhack.ijoa.common.error.exception.InvalidValueException;
import com.shinhan.shbhack.ijoa.common.filter.FileExtensionFilter;
import com.shinhan.shbhack.ijoa.common.util.FileUtil;
import com.shinhan.shbhack.ijoa.domain.UploadFile;
import com.shinhan.shbhack.ijoa.domain.member.entity.Family;
import com.shinhan.shbhack.ijoa.domain.member.entity.Member;
import com.shinhan.shbhack.ijoa.domain.member.entity.ProfileImage;
import com.shinhan.shbhack.ijoa.domain.member.repository.datajpa.FamilyRepository;
import com.shinhan.shbhack.ijoa.domain.member.repository.datajpa.MemberRepository;
import com.shinhan.shbhack.ijoa.domain.member.repository.datajpa.ProfileImageRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class MemberService {

    private final MemberRepository memberRepository;
    private final FamilyRepository familyRepository;
    private final ProfileImageRepository profileImageRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private final FileUtil fileUtil;
    private final FileExtensionFilter fileExtFilter;

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

    public void updateMember(MemberModifyServiceRequest request, MultipartFile file){
        Member member = memberRepository.findById(request.getId())
                .orElseThrow(
                        () -> new EntityNotFoundException(ErrorCode.NOTMATCH_MEMBER_ID)
                );

        if(!(request.getPassword() == null || request.getPassword() == ""))
            member.update(bCryptPasswordEncoder.encode(request.getPassword()));

        try {
            UploadFile uploadFile = createUploadFile(file);
            ProfileImage profileImage = member.getProfileImage();
            if(profileImage == null){
                profileImageRepository.save(ProfileImage.of(uploadFile, member));
            }
            else profileImage.update(uploadFile);
        } catch (IOException e) {
            throw new InvalidValueException(ErrorCode.INVALID_FILE);
        }

    }

    private String encodePassword(String password){
        return bCryptPasswordEncoder.encode(password);
    }

    private UploadFile createUploadFile(MultipartFile file) throws IOException {
        UploadFile uploadFile = null;
        if (file != null && !file.isEmpty()) {
            fileExtFilter.imageFilter(file);
            uploadFile = fileUtil.storeFile(file);
        }
        return uploadFile;
    }

}
