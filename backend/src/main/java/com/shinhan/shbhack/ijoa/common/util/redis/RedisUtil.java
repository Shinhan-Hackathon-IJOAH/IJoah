package com.shinhan.shbhack.ijoa.common.util.redis;

import com.shinhan.shbhack.ijoa.common.model.User;
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

    private final RedisTemplate<String, Object> redisTemplate;

    private final static Duration EMAIL_CACHE_TTL = Duration.ofMinutes(30);

    public void setEmail(String email, String code){
        log.debug("Set Email: {} and Code: {}", email, code);
        redisTemplate.opsForValue().set(email, code, EMAIL_CACHE_TTL);
    }

    public Optional<String> getEmail(String email){
        String data = (String)redisTemplate.opsForValue().get(email);
        log.debug("Get Email code: {}", data);
        return Optional.ofNullable(data);
    }

    private String getKey(String userName) {
        return "UserCache:" + userName;
    }

}
