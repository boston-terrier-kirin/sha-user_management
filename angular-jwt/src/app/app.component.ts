import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Role } from './auth/models/role.enum';
import { User } from './auth/models/user.model';
import { AuthService } from './auth/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  currentUser$ = new BehaviorSubject<User | null>(null);

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    this.currentUser$ = this.authService.currentUserSubject$;
  }

  isAdmin() {
    return this.currentUser$.value?.role === Role.ADMIN;
  }

  signout() {
    this.authService.signout();
    this.router.navigateByUrl('/');
  }
}
