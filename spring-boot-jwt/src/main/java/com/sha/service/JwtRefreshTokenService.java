package com.sha.service;

import com.sha.model.JwtRefreshToken;
import com.sha.model.User;

public interface JwtRefreshTokenService {
    JwtRefreshToken createRefreshToken(Long userId);

    User generateAccessTokenFromRefreshToken(String refreshTokenId);
}
