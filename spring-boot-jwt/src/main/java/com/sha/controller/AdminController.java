package com.sha.controller;

import com.sha.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/admin")
public class AdminController {

    @Autowired
    private UserService userService;

    @GetMapping("all")
    public ResponseEntity<?> findAllUsers() {
        return ResponseEntity.ok(this.userService.findAllUsers());
    }
}
