package com.sha.service;

import com.sha.model.User;

public interface AuthenticationService {
    User signinAndReturnJwt(User signinRequest);
}
