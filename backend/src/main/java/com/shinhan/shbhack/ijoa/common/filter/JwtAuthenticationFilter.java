package com.shinhan.shbhack.ijoa.common.filter;

import com.shinhan.shbhack.ijoa.api.service.member.query.MemberQueryService;
import com.shinhan.shbhack.ijoa.common.error.ErrorCode;
import com.shinhan.shbhack.ijoa.common.error.exception.InvalidValueException;
import com.shinhan.shbhack.ijoa.common.model.JwtCreateModel;
import com.shinhan.shbhack.ijoa.common.model.UserDetailsModel;
import com.shinhan.shbhack.ijoa.common.util.JwtUtil;
import com.shinhan.shbhack.ijoa.common.util.RedisUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Slf4j
@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtUtil jwtUtil;
    private final MemberQueryService memberQueryService;
    private final RedisUtil redisUtil;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String token = request.getHeader(HttpHeaders.AUTHORIZATION);
        log.debug("token : '{}'", token);

        if (token == null || !(token.startsWith("Bearer ") || token.startsWith("Refresh "))) {
            log.error("authentication is null");
            filterChain.doFilter(request, response);
            return;
        }

        if (token.startsWith("Bearer ")) {

            token = token.substring(7);

            if (jwtUtil.isTokenExpired(token)) {
                log.error("access token is expired");
                filterChain.doFilter(request, response);
                return;
            }


            // TODO: 2023-09-10 리팩토링 필요
            String loginEmail = jwtUtil.getEmail(token);

            UserDetailsModel userDetailsModel = memberQueryService.loadUserByEmail(loginEmail);
            UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
                    userDetailsModel, null, userDetailsModel.getAuthorities()
            );

            authenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
            SecurityContextHolder.getContext().setAuthentication(authenticationToken);

        } else if(token.startsWith("Refresh ")){
            token = token.substring(8);

            String refreshToken = redisUtil.getToken(jwtUtil.getEmail(token)).orElseThrow(
                    () -> new InvalidValueException(ErrorCode.NOT_FOUND_TOKEN)
            );

            if(!token.equals(refreshToken)) throw new InvalidValueException(ErrorCode.INVALID_TOKEN);

            String accessToken = jwtUtil.generateToken(jwtUtil.extractAllClaims(refreshToken), (long) (1000 * 60 * 60));
            response.setHeader(HttpHeaders.AUTHORIZATION, "Bearer " + accessToken);

            // TODO: 2023-09-10 리팩토링 필요
            String loginEmail = jwtUtil.getEmail(token);

            UserDetailsModel userDetailsModel = memberQueryService.loadUserByEmail(loginEmail);
            UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
                    userDetailsModel, null, userDetailsModel.getAuthorities()
            );

            authenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
            SecurityContextHolder.getContext().setAuthentication(authenticationToken);
        }

        filterChain.doFilter(request, response);
    }


}

