package com.shinhan.shbhack.ijoa.api.service.member.query;

import com.shinhan.shbhack.ijoa.api.service.member.dto.request.EmailCheckServiceRequest;
import com.shinhan.shbhack.ijoa.common.error.ErrorCode;
import com.shinhan.shbhack.ijoa.common.error.exception.EntityNotFoundException;
import com.shinhan.shbhack.ijoa.common.error.exception.InvalidValueException;
import com.shinhan.shbhack.ijoa.common.util.RedisUtil;
import com.shinhan.shbhack.ijoa.domain.member.repository.datajpa.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.mail.MessagingException;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import java.io.UnsupportedEncodingException;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.time.Duration;
import java.util.Optional;
import java.util.Random;

@Slf4j
@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class EmailQueryService {

    private final MemberRepository memberRepository;
    private final RedisUtil redisUtil;

    public String sendEmail(String email) throws MessagingException, UnsupportedEncodingException {
        if(memberRepository.existsByEmail(email))
            throw new EntityNotFoundException(ErrorCode.MEMBER_DUPLICATE);

        return createCode();

    }

    private String createCode() {
        int lenth = 6;
        try {
            Random random = SecureRandom.getInstanceStrong();
            StringBuilder builder = new StringBuilder();
            for (int i = 0; i < lenth; i++) {
                builder.append(random.nextInt(10));
            }
            return builder.toString();
        } catch (NoSuchAlgorithmException e) {
            log.debug("랜덤 값 생성 실패");
            throw new InvalidValueException(ErrorCode.INVALID_INPUT_VALUE);
        }
    }

    public void checkEmail(EmailCheckServiceRequest request){
        Optional<String> code = redisUtil.getEmail(request.getEmail());
        if(!code.isPresent()) throw new InvalidValueException(ErrorCode.NOTMATCH_EMAIL);
        if(!code.get().equals(request.getCode())) throw new InvalidValueException(ErrorCode.NOTMATCH_EMAIL_CODE);

        redisUtil.deleteEmail(request.getEmail());
    }


}
