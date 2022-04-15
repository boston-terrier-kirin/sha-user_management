package com.sha.service;

import com.sha.model.User;
import com.sha.security.UserPrincipal;
import com.sha.security.jwt.JwtProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

@Service
public class AuthenticationServiceImpl implements AuthenticationService {
    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtProvider jwtProvider;

    @Autowired
    private JwtRefreshTokenService jwtRefreshTokenService;

    @Override
    public User signinAndReturnJwt(User signinRequest) {
        Authentication authentication =
                this.authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(signinRequest.getUsername(), signinRequest.getPassword()));

        UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
        String jwt = this.jwtProvider.generateToken(userPrincipal);

        User signinUser = userPrincipal.getUser();
        signinUser.setAccessToken(jwt);

        String refreshToken = this.jwtRefreshTokenService.createRefreshToken(signinUser.getId()).getTokenId();
        signinUser.setRefreshToken(refreshToken);

        return signinUser;
    }
}
