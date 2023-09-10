package com.shinhan.shbhack.ijoa.common.util;

import antlr.Token;
import com.shinhan.shbhack.ijoa.common.model.UserDetailsModel;
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

    private final RedisTemplate<String, Object> cacheObject;
    private final RedisTemplate<String, UserDetailsModel> cacheUser;

    private final static String EMAIL_AUTH_PREFIX = "EMAIL:";
    private final static String USER_AUTH_PREFIX = "USER:";
    private final static String TOKEN_AUTH_PREFIX = "TOKEN:";
    private final static Duration EMAIL_CACHE_TTL = Duration.ofMinutes(30);
    private final static Duration USER_CACHE_TTL = Duration.ofHours(1);
    private final static Duration TOKEN_CACHE_TTL = Duration.ofDays(7);

    // TODO: 2023-09-10 인터페이스 구성이 좀 더 좋아보임
    public void setEmail(String email, String code){
        String key = EMAIL_AUTH_PREFIX + email;
        log.debug("Set Email: {} and Code: {}", key, code);
        cacheObject.opsForValue().set(key, code, EMAIL_CACHE_TTL);
    }

    public Optional<String> getEmail(String email){
        String key = EMAIL_AUTH_PREFIX + email;
        String value = (String)cacheObject.opsForValue().get(key);
        log.debug("Get Email code: {}", value);
        return Optional.ofNullable(value);
    }

    public void deleteEmail(String email){
        String key = EMAIL_AUTH_PREFIX + email;
        log.debug("Delete Email: {}", key);
        cacheObject.delete(key);
    }

    public void setUser(UserDetailsModel model){
        String key = USER_AUTH_PREFIX + model.getEmail();
        log.debug("Set User email: {}", key);
        cacheUser.opsForValue().set(key, model, USER_CACHE_TTL);
    }

    public Optional<UserDetailsModel> getUser(String email){
        String key = USER_AUTH_PREFIX + email;
        log.debug("Get User email: {}", key);
        return Optional.ofNullable(cacheUser.opsForValue().get(key));
    }

    public void deletUser(String email){
        String key = USER_AUTH_PREFIX + email;
        log.debug("Delete User email: {}", key);
        cacheUser.delete(key);
    }

    public void setToken(String email, String token){
        String key = TOKEN_AUTH_PREFIX + email;
        log.debug("Set Email: {} and Token: {}", key, token);
        cacheObject.opsForValue().set(key, token, TOKEN_CACHE_TTL);
    }

    public Optional<String> getToken(String email){
        String key = TOKEN_AUTH_PREFIX + email;
        log.debug("Get Token: {}", key);
        String value = (String)cacheObject.opsForValue().get(key);
        return Optional.ofNullable(value);
    }

    public void deleteToken(String email){
        String key = TOKEN_AUTH_PREFIX + email;
        log.debug("Detele Token: {}", key);
        cacheObject.delete(key);
    }

}
