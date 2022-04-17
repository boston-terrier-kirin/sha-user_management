import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faUserTie } from '@fortawesome/free-solid-svg-icons';
import { User } from '../models/user.model';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
})
export class SigninComponent implements OnInit {
  controls = this.createControls();
  form = new FormGroup(this.controls);
  faUser = faUserTie;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    if (this.authService.currentUserSubject$?.value?.id) {
      this.router.navigateByUrl('/profile');
      return;
    }
  }

  signin() {
    const user: User = this.form.value;
    console.log(user);

    this.authService.signin(user).subscribe({
      next: () => {
        this.router.navigateByUrl('/profile');
      },
      error: (err) => {
        this.form.setErrors({
          invalidUser: true,
        });
      },
      complete: () => {
        console.log('complete');
      },
    });
  }

  createControls() {
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
      username,
      password,
    };
  }

  getMessage() {
    if (this.form.errors?.['invalidUser']) {
      return {
        type: 'error',
        text: 'Username or password is invalid.',
      };
    }
    return null;
  }
}
