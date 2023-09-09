package com.shinhan.shbhack.ijoa.common.util.jwt;

import com.shinhan.shbhack.ijoa.api.service.member.dto.response.MemberTokenResponse;
import com.shinhan.shbhack.ijoa.common.model.JwtCreateModel;
import com.shinhan.shbhack.ijoa.common.util.error.ErrorCode;
import com.shinhan.shbhack.ijoa.common.util.error.exception.InvalidValueException;
import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Arrays;
import java.util.Collection;
import java.util.Date;
import java.util.stream.Collectors;

@Slf4j
@Component
public class JwtUtil {

    private final Key key;
    private static final long ACCESS_TOKEN_EXPIRE_TIME = 1000 * 60 * 60;            // 1시간
    private static final long REFRESH_TOKEN_EXPIRE_TIME = 1000 * 60 * 60 * 24 * 7;  // 7일
    //토근 생성할때 레디스에 리프레쉬 토큰 이메일의 유효시간 넣기

    private JwtUtil(@Value("${JWT_SECRET}") String secretKey) {
        byte[] keyBytes = Decoders.BASE64.decode(secretKey);
        this.key = Keys.hmacShaKeyFor(keyBytes);
    }

    public MemberTokenResponse generateAllToken(JwtCreateModel model){
        String accessToken = generateToken(model, ACCESS_TOKEN_EXPIRE_TIME);
        String refreshToken = generateToken(model, REFRESH_TOKEN_EXPIRE_TIME);

        return toMemberTokenResponse(accessToken, refreshToken);
    }

    public String generateToken(JwtCreateModel model, Long expireTime) {
        Claims claims = setClaim(model);

        Date now = new Date();
        Date expireDate = new Date(now.getTime() + expireTime);

        return Jwts.builder()
                .setClaims(claims)
                .setIssuedAt(now)
                .setExpiration(expireDate)
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();
    }

    private Claims setClaim(JwtCreateModel model){
        Claims claims = Jwts.claims();
        claims.put("id", model.getId());
        claims.put("email", model.getEmail());
        claims.put("role", model.getMemberRole());

        return claims;
    }

    private MemberTokenResponse toMemberTokenResponse(String accessToken, String refreshToken){
        return MemberTokenResponse.builder()
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                .build();
    }

    public Claims extractAllClaims(String token) {
        try {
            return Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token).getBody();
        }catch (io.jsonwebtoken.security.SecurityException | MalformedJwtException e) {
            log.info("Invalid JWT Token", e);
        } catch (ExpiredJwtException e) {
            log.info("Expired JWT Token", e);
        } catch (UnsupportedJwtException e) {
            log.info("Unsupported JWT Token", e);
        } catch (IllegalArgumentException e) {
            log.info("JWT claims string is empty.", e);
        }

        throw new InvalidValueException(ErrorCode.INVALID_TOKEN);
    }

    public String getUsername(String token, String key) {
        return extractAllClaims(token).get("username", String.class);
    }

    public Boolean isTokenExpired(String token, String key) {
        Date expiration = extractAllClaims(token).getExpiration();
        return expiration.before(new Date());
    }

}
