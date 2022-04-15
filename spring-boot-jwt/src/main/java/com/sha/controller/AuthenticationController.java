package com.sha.controller;

import com.sha.model.User;
import com.sha.service.AuthenticationService;
import com.sha.service.JwtRefreshTokenService;
import com.sha.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/authentication")
public class AuthenticationController {
    @Autowired
    private AuthenticationService authenticationService;

    @Autowired
    private UserService userService;

    @Autowired
    private JwtRefreshTokenService jwtRefreshTokenService;

    @PostMapping("signup")
    public ResponseEntity<?> signup(@RequestBody User user){
        if (this.userService.findByUsername(user.getUsername()).isPresent()) {
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }

        User signupUser = this.userService.saveUser(user);
        return new ResponseEntity<>(signupUser, HttpStatus.CREATED);
    }

    @PostMapping("signin")
    public ResponseEntity<?> signin(@RequestBody User user) {
        return new ResponseEntity<>(this.authenticationService.signinAndReturnJwt(user), HttpStatus.OK);
    }

    @PostMapping("refresh-token")
    public ResponseEntity<?> refreshToken(@RequestParam String token) {
        return new ResponseEntity<>(this.jwtRefreshTokenService.generateAccessTokenFromRefreshToken(token), HttpStatus.OK);
    }
}
