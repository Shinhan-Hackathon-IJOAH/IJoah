package com.shinhan.shbhack.ijoa.api.service.member.query;

import com.shinhan.shbhack.ijoa.api.service.member.dto.request.EmailCheckServiceRequest;
import com.shinhan.shbhack.ijoa.common.util.error.ErrorCode;
import com.shinhan.shbhack.ijoa.common.util.error.exception.InvalidValueException;
import com.shinhan.shbhack.ijoa.common.util.redis.RedisUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.mail.SimpleMailMessage;
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
@Transactional
@RequiredArgsConstructor
public class EmailQueryService {

    private final JavaMailSender emailSender;
    private final RedisUtil redisUtil;

    public void sendEmail(String email) throws MessagingException, UnsupportedEncodingException {
        String code = createCode();
        MimeMessage emailForm = createEmailForm(email, code);
        //실제 메일 전송
        emailSender.send(emailForm);

        redisUtil.setEmail(email, code);
    }

    // 발신할 이메일 데이터 세팅
    private MimeMessage createEmailForm(String email, String code) throws MessagingException, UnsupportedEncodingException {
        String senderEmail = "noreply@mereview.com"; // Replace with your email address (sender)
        String senderName = "Mereview"; // Replace with your name (sender)

        MimeMessage message = emailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, false, "utf-8");
        helper.setTo(email); // Set recipient email address
        helper.setFrom(new InternetAddress(senderEmail, senderName)); // Set sender email and name
        helper.setSubject("Verification Code for Your Account"); // Set email subject

        // Email content with the generated verification code
        String emailContent = "<html><body style=\"font-family: Arial, sans-serif;\">"
                + "<h2>안녕하세요!!</h2>"
                + "<p>ijoa 사이트에 회원가입을 해주셔서 감사합니다!</p>"
                + "<p>인증코드입니다.:</p>"
                + "<h3 style=\"background-color: #f0f0f0; padding: 10px;\">" + code + "</h3>"
                + "<p>Please use this code to verify your account.</p>"
                + "<p>Best regards,<br/>Your Website Team</p>"
                + "</body></html>";

        helper.setText(emailContent, true); // Set email content as HTML

        return message;
    }

    public void sendCodeToEmail(String toEmail) {
        // 이메일 인증 요청 시 인증 번호 Redis에 저장 ( key = "AuthCode " + Email / value = AuthCode )
//        redisService.setValues(AUTH_CODE_PREFIX + toEmail,
//                authCode, Duration.ofMillis(this.authCodeExpirationMillis));
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

//    public EmailVerificationResult verifiedCode(String email, String authCode) {
//        this.checkDuplicatedEmail(email);
//        String redisAuthCode = redisService.getValues(AUTH_CODE_PREFIX + email);
//        boolean authResult = redisService.checkExistsValue(redisAuthCode) && redisAuthCode.equals(authCode);
//
//        return EmailVerificationResult.of(authResult);
//    }

    public void checkEmail(EmailCheckServiceRequest request){
        Optional<String> code = redisUtil.getEmail(request.getEmail());
        if(!code.isPresent()) throw new InvalidValueException(ErrorCode.INVALID_TYPE_VALUE);
        if(!code.get().equals(request.getCode())) throw new InvalidValueException(ErrorCode.INVALID_INPUT_VALUE);
    }
}
