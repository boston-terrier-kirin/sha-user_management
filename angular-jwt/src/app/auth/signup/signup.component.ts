import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { Role } from '../models/role.enum';
import { User } from '../models/user.model';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  controls = this.createControls();
  form = new FormGroup(this.controls);
  faUser = faUserCircle;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    if (this.authService.currentUser?.id) {
      this.router.navigateByUrl('/profile');
      return;
    }
  }

  signup() {
    const user: User = this.form.value;
    console.log(user);

    this.authService.signup(user).subscribe({
      next: () => {
        this.router.navigateByUrl('/');
      },
      error: (err) => {
        if (err?.status === 409) {
          this.form.setErrors({
            nonUniqueUsername: true,
          });
        } else {
          this.form.setErrors({
            unexpected: true,
          });
        }
      },
      complete: () => {
        console.log('complete');
      },
    });
  }

  createControls() {
    const name = new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
    ]);

    const username = new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
      Validators.pattern(/^[a-z0-9]+$/),
    ]);

    const password = new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(20),
    ]);

    return {
      name,
      username,
      password,
    };
  }

  showUnExpectedError() {
    return this.form.errors?.['unexpected'];
  }

  showNonUniqueUsername() {
    return this.form.errors?.['nonUniqueUsername'];
  }
}
