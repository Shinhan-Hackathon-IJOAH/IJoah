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

        log.info("코드 만들기 전");
        log.debug("코드 만들기 전");

        String code = createCode();

        log.info("코드 만든 후");
        log.debug("코드 만들기 후");

        return code;

    }

    private String createCode() {
        int lenth = 6;
        log.info("lenth 선언");
        log.debug("lenth 선언");
        try {
            Random random = new Random();
            log.info("random 선언");
            log.debug("random 선언");
            StringBuilder builder = new StringBuilder(lenth);
            log.info("builder 선언");
            log.debug("builder 선언");
            for (int i = 0; i < lenth; i++) {
                builder.append(random.nextInt(10));
                log.info("반복중:{} ", i);
                log.debug("반복중:{} ", i);
            }
            return builder.toString();
        } catch (Exception e) {
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
