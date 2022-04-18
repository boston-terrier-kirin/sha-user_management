package com.sha.service;

import com.sha.model.Role;
import com.sha.model.User;

import java.util.List;
import java.util.Optional;

public interface UserService {
    User saveUser(User user);

    Optional<User> findByUsername(String username);

    void changeRole(String username, Role role);

    List<User> findAllUsers();

    Optional<User> findById(Long id);
}
