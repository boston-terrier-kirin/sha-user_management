package com.sha.controller;

import com.sha.model.Role;
import com.sha.security.UserPrincipal;
import com.sha.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/user")
public class UserController {
    @Autowired
    private UserService userService;

    @PutMapping("change/{role}")
    public ResponseEntity<?> changeRole(@AuthenticationPrincipal UserPrincipal principal, @PathVariable Role role) {
        this.userService.changeRole(principal.getUsername(), role);

        return ResponseEntity.ok(true);
    }

    @GetMapping("{id}")
    public ResponseEntity<?> findById(@AuthenticationPrincipal UserPrincipal principal, @PathVariable Long id) {
        return ResponseEntity.ok(this.userService.findById(id));
    }
}
