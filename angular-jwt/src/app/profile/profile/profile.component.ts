import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Role } from 'src/app/auth/models/role.enum';
import { User } from 'src/app/auth/models/user.model';
import { AuthService } from 'src/app/auth/services/auth.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  user: User | null = null;

  constructor(
    private router: Router,
    private authService: AuthService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.authService.currentUserSubject$.subscribe((user) => {
      this.user = user;
    });
  }

  changeRole() {
    const newRole = this.user?.role === Role.ADMIN ? Role.USER : Role.ADMIN;

    this.userService.changeRole(newRole).subscribe(() => {
      this.authService.signout();
      this.router.navigateByUrl('/');
    });
  }
}
