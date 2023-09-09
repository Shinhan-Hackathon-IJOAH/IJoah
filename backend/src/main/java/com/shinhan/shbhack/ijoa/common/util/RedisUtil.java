package com.shinhan.shbhack.ijoa.common.util;

import com.shinhan.shbhack.ijoa.common.model.UserInfoModel;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Repository;

import java.time.Duration;
import java.util.Optional;

@Slf4j
@Repository
@RequiredArgsConstructor
public class RedisUtil {

    private final RedisTemplate<String, Object> cacheEmail;
    private final RedisTemplate<String, UserInfoModel> cacheUser;

    private final static String EMAIL_AUTH_PRIFIX = "EMAIL";
    private final static Duration EMAIL_CACHE_TTL = Duration.ofMinutes(5);

    public void setEmail(String email, String code){
        log.debug("Set Email: {} and Code: {}", email, code);
        cacheEmail.opsForValue().set(email, code, EMAIL_CACHE_TTL);
    }

    public Optional<String> getEmail(String email){
        String data = (String)cacheEmail.opsForValue().get(email);
        log.debug("Get Email code: {}", data);
        return Optional.ofNullable(data);
    }

    public void deleteEmail(String email){
        log.debug("Get Email code: {}", email);
        cacheEmail.delete(email);
    }


}
