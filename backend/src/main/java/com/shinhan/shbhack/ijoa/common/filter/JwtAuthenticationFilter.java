package com.shinhan.shbhack.ijoa.common.filter;

import com.shinhan.shbhack.ijoa.api.service.member.query.MemberQueryService;
import com.shinhan.shbhack.ijoa.common.model.UserInfoModel;
import com.shinhan.shbhack.ijoa.common.util.JwtUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Slf4j
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtUtil jwtUtil;
    private final MemberQueryService memberQueryService;

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

            String loginId = jwtUtil.getEmail(token);

            UserInfoModel userInfoModel = memberQueryService.

        }

    }


}
