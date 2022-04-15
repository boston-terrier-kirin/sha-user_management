package com.sha.security.jwt;

import com.sha.security.UserPrincipal;
import org.springframework.security.core.Authentication;

import javax.servlet.http.HttpServletRequest;

public interface JwtProvider {
    String generateToken(UserPrincipal auth);

    Authentication getAuthentication(HttpServletRequest req);

    boolean isTokenValid(HttpServletRequest req);
}
