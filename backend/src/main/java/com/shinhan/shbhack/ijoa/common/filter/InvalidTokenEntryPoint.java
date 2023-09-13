package com.shinhan.shbhack.ijoa.common.filter;

import com.shinhan.shbhack.ijoa.common.response.ApiError;
import com.shinhan.shbhack.ijoa.common.error.ErrorCode;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class InvalidTokenEntryPoint implements AuthenticationEntryPoint {

    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException authException) throws IOException, ServletException {
        response.setContentType("application/json");
        response.setStatus(401);
        response.getWriter().write(ApiError.of(ErrorCode.INVALID_TOKEN).toString());
    }
}
