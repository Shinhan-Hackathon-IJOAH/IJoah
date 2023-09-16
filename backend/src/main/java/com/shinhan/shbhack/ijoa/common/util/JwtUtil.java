package com.shinhan.shbhack.ijoa.common.util;

import com.shinhan.shbhack.ijoa.api.service.member.dto.response.MemberTokenResponse;
import com.shinhan.shbhack.ijoa.common.model.JwtCreateModel;
import com.shinhan.shbhack.ijoa.common.error.ErrorCode;
import com.shinhan.shbhack.ijoa.common.error.exception.InvalidValueException;
import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;

@Slf4j
@Component
public class JwtUtil {

    private final Key key;
//    private static final long ACCESS_TOKEN_EXPIRE_TIME = 1000 * 60 * 60;            // 1시간
    private static final long ACCESS_TOKEN_EXPIRE_TIME = 1000 * 60;            // 1분
    private static final long REFRESH_TOKEN_EXPIRE_TIME = 1000 * 60 * 60 * 24 * 7;  // 7일

    // TODO: 2023-09-10 expire time 위치 생각해보기
    
    private JwtUtil(@Value("${JWT_SECRET}") String secretKey) {
        byte[] keyBytes = Decoders.BASE64.decode(secretKey);
        this.key = Keys.hmacShaKeyFor(keyBytes);
    }

    public MemberTokenResponse generateAllToken(JwtCreateModel model){
        String accessToken = generateToken(model, ACCESS_TOKEN_EXPIRE_TIME);
        String refreshToken = generateToken(model, REFRESH_TOKEN_EXPIRE_TIME);

        return MemberTokenResponse.of(accessToken, refreshToken, model);
    }

    public String generateAccessToken(Claims claims, Long expireTime){
        Date now = new Date();
        Date expireDate = new Date(now.getTime() + expireTime);

        return Jwts.builder()
                .setClaims(claims)
                .setIssuedAt(now)
                .setExpiration(expireDate)
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();
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
        claims.put("name", model.getName());
        claims.put("email", model.getEmail());
        claims.put("role", model.getMemberRole());

        return claims;
    }

//    private MemberTokenResponse toMemberTokenResponse(String accessToken, String refreshToken, JwtCreateModel model){
//        return MemberTokenResponse.builder()
//                .accessToken(accessToken)
//                .refreshToken(refreshToken)
//                .name(model.getName())
//                .email(model.getEmail())
//                .memberRole(model.getMemberRole())
//                .build();
//    }

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

    public String getEmail(String token) {
        return extractAllClaims(token).get("email", String.class);
    }

    public Long getId(String token) {return extractAllClaims(token).get("id", Long.class);}

    public Boolean isTokenExpired(String token) {
        Date expiration = extractAllClaims(token).getExpiration();
        return expiration.before(new Date());
    }

}
