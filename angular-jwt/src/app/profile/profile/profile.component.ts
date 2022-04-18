import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
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
  currentUser$ = new BehaviorSubject<User | null>(null);

  constructor(
    private router: Router,
    private authService: AuthService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.currentUser$ = this.authService.currentUserSubject$;
  }

  changeRole() {
    if (!this.currentUser$) {
      return;
    }

    const newRole =
      this.currentUser$.value?.role === Role.ADMIN ? Role.USER : Role.ADMIN;

    /**
     * TODO:
     * ロールを変更したらJWTも更新しないとダメなので、いったんログアウトしている。
     * ログアウトせずに、JWTを更新することで対応できないものか。
     */
    this.userService.changeRole(newRole).subscribe(() => {
      this.authService.signout();
      this.router.navigateByUrl('/');
    });
  }
}
