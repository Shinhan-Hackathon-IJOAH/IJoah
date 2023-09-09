package com.shinhan.shbhack.ijoa.common.filter;

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

    private final JwtUtil jwtTokenProvider;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        final String token = request.getHeader(HttpHeaders.AUTHORIZATION);
        log.debug("token : '{}'", token);

        if (token == null || !(token.startsWith("Bearer ") || token.startsWith("Refresh "))) {
            log.error("authentication is null");
            filterChain.doFilter(request, response);
            return;
        }

        if (token.startsWith("Bearer ")) {
            // Access Token 처리
            if (jwtProvider.isExpired(token, secretKey)) {
                log.error("access token is expired");
                filterChain.doFilter(request, response);
                return;
            }
        }

    }


}

