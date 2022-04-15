package com.sha.service;

import com.sha.model.JwtRefreshToken;
import com.sha.model.User;
import com.sha.repository.JwtRefreshTokenRepository;
import com.sha.repository.UserRepository;
import com.sha.security.UserPrincipal;
import com.sha.security.jwt.JwtProvider;
import com.sha.utils.SecurityUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.Set;
import java.util.UUID;

@Service
public class JwtRefreshTokenServiceImpl implements JwtRefreshTokenService {
    @Value("${app.jwt.refresh-expiration-in-ms}")
    private Long REFRESH_EXPIRATION_IN_MS;

    @Autowired
    private JwtRefreshTokenRepository jwtRefreshTokenRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtProvider jwtProvider;

    @Override
    public JwtRefreshToken createRefreshToken(Long userId) {
        JwtRefreshToken jwtRefreshToken = new JwtRefreshToken();
        jwtRefreshToken.setTokenId(UUID.randomUUID().toString());
        jwtRefreshToken.setUserId(userId);
        jwtRefreshToken.setCreateDate(LocalDateTime.now());
        jwtRefreshToken.setExpirationDate(LocalDateTime.now().plus(REFRESH_EXPIRATION_IN_MS, ChronoUnit.MILLIS));

        return this.jwtRefreshTokenRepository.save(jwtRefreshToken);
    }

    @Override
    public User generateAccessTokenFromRefreshToken(String refreshTokenId) {
        JwtRefreshToken jwtRefreshToken = this.jwtRefreshTokenRepository.findById(refreshTokenId).orElseThrow();

        if (jwtRefreshToken.getExpirationDate().isBefore(LocalDateTime.now())) {
            throw new RuntimeException("JWT refresh token is not valid.");
        }

        User user = this.userRepository.findById(jwtRefreshToken.getUserId()).orElseThrow();
        UserPrincipal userPrincipal = UserPrincipal.builder()
                                                    .id(user.getId())
                                                    .username(user.getUsername())
                                                    .password(user.getPassword())
                                                    .authorities(Set.of(SecurityUtils.convertToAuthority(user.getRole().name())))
                                                    .build();
        String accessToken = this.jwtProvider.generateToken(userPrincipal);

        user.setAccessToken(accessToken);
        user.setRefreshToken(refreshTokenId);

        return user;
    }
}
