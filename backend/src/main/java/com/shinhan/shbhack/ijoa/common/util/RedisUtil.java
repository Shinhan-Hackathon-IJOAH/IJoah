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

    private final RedisTemplate<String, Object> cacheObject;
    private final RedisTemplate<String, UserInfoModel> cacheUser;

    private final static String EMAIL_AUTH_PRIFIX = "EMAIL:";
    private final static String USER_AUTH_PRIFIX = "USER:";
    private final static String TOKEN_AUTH_PREFIX = "TOKEN:";
    private final static Duration EMAIL_CACHE_TTL = Duration.ofMinutes(5);
    private final static Duration USER_CACHE_TTL = Duration.ofHours(1);

    private final static Duration TOKEN_CACHE_TTL = Duration.ofDays(7);

    public void setEmail(String email, String code){
        log.debug("Set Email: {} and Code: {}", email, code);
        cacheObject.opsForValue().set(EMAIL_AUTH_PRIFIX + email, code, EMAIL_CACHE_TTL);
    }

    public Optional<String> getEmail(String email){
        String data = (String)cacheObject.opsForValue().get(EMAIL_AUTH_PRIFIX + email);
        log.debug("Get Email code: {}", data);
        return Optional.ofNullable(data);
    }

    public void deleteEmail(String email){
        log.debug("Delete Email: {}", email);
        cacheObject.delete(EMAIL_AUTH_PRIFIX + email);
    }

    public void setUser(UserInfoModel model){
        log.debug("Set User email: {}", model.getEmail());
        cacheUser.opsForValue().set(USER_AUTH_PRIFIX + model.getEmail(), model, USER_CACHE_TTL);
    }

    public Optional<UserInfoModel> getUser(String email){
        log.debug("Get User email: {}", email);
        return Optional.of(cacheUser.opsForValue().get(USER_AUTH_PRIFIX + email));
    }

    public void deletUser(String email){
        log.debug("Delete User email: {}", email);
        cacheUser.delete(USER_AUTH_PRIFIX + email);
    }

    public void setToken(String email, String token){
        log.debug("Set Email: {} and Token: {}", email, token);
        cacheObject.opsForValue().set(TOKEN_AUTH_PREFIX + email, token, TOKEN_CACHE_TTL);
    }

    public Optional<String> getToken(String email){
        String data = (String)cacheObject.opsForValue().get(TOKEN_AUTH_PREFIX + email);
        log.debug("Get Token: {}", data);
        return Optional.ofNullable(data);
    }

    public void deleteToken(String email){
        log.debug("Detele Token: {}", email);
        cacheObject.delete(TOKEN_AUTH_PREFIX + email);
    }

}
