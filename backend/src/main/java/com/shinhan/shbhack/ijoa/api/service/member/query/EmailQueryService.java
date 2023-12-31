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

    private final RedisUtil redisUtil;
    private final JavaMailSender emailSender;
    private final MemberRepository memberRepository;

    public void sendJoinEmail(String email) throws MessagingException, UnsupportedEncodingException {
        if(memberRepository.existsByEmail(email))
            throw new EntityNotFoundException(ErrorCode.MEMBER_DUPLICATE);

        String code = createCode();

        try {
            MimeMessage emailForm = createEmailForm(email, code);
            emailSender.send(emailForm);
        } catch (Exception e){
            throw new InvalidValueException(ErrorCode.EMAIL_FORM_ERROR);
        }

        redisUtil.setEmail(email, code);

    }

    private String createCode() {
        int lenth = 6;
        try {
            Random random = new Random();
            StringBuilder builder = new StringBuilder(lenth);
            for (int i = 0; i < lenth; i++) {
                builder.append(random.nextInt(10));
            }
            return builder.toString();
        } catch (Exception e) {
            throw new InvalidValueException(ErrorCode.INVALID_INPUT_VALUE);
        }
    }

    private MimeMessage createEmailForm(String email, String code) throws MessagingException, UnsupportedEncodingException {
        String senderEmail = "noreply@moailgi.com"; // Replace with your email address (sender)
        String senderName = "모아일기"; // Replace with your name (sender)

        MimeMessage message = emailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, false, "utf-8");
        helper.setTo(email); // Set recipient email address
        helper.setFrom(new InternetAddress(senderEmail, senderName)); // Set sender email and name
        helper.setSubject("Verification Code for Your Account"); // Set email subject

        // Email content with the generated verification code
        String emailContent = "<html><body style=\"font-family: Arial, sans-serif;\">"
                + "<h2>안녕하세요!!</h2>"
                + "<p>모아일기 사이트에 회원가입을 해주셔서 감사합니다!</p>"
                + "<p>인증코드입니다.:</p>"
                + "<h3 style=\"background-color: #f0f0f0; padding: 10px;\">" + code + "</h3>"
                + "<p>Please use this code to verify your account.</p>"
                + "<p>Best regards,<br/>Your Website Team</p>"
                + "</body></html>";

        helper.setText(emailContent, true); // Set email content as HTML

        return message;
    }

    public void checkEmail(EmailCheckServiceRequest request){
        Optional<String> code = redisUtil.getEmail(request.getEmail());
        if(!code.isPresent()) throw new InvalidValueException(ErrorCode.NOTMATCH_EMAIL);
        if(!code.get().equals(request.getCode())) throw new InvalidValueException(ErrorCode.NOTMATCH_EMAIL_CODE);

        redisUtil.deleteEmail(request.getEmail());
    }


}
