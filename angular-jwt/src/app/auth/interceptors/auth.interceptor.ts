import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { switchMap, catchError } from 'rxjs/operators';
import jwtDecode, { JwtPayload } from 'jwt-decode';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private jwt: JwtPayload = {};

  constructor(private router: Router, private authService: AuthService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (request.headers.has('authorization')) {
      return this.handleToken(request, next);
    } else {
      return next.handle(request);
    }
  }

  private handleToken(request: HttpRequest<unknown>, next: HttpHandler) {
    if (!this.authService.currentUserSubject$.value?.accessToken) {
      return throwError(() => {
        return 'Invalid accessToken';
      });
    }

    this.jwt = jwtDecode(
      this.authService.currentUserSubject$.value?.accessToken
    );

    const nowInSec = Date.now() / 1000;
    const exp = this.jwt.exp || 0;

    console.log(this.jwt);

    if (exp > nowInSec) {
      return next.handle(request);
    }

    return this.authService.refreshToken().pipe(
      switchMap((user) => {
        console.log('token refresh', user);

        this.authService.setSessionUser(user);

        const cloned = request.clone({
          headers: request.headers.set(
            'authorization',
            `Bearer ${user.accessToken}`
          ),
        });

        return next.handle(cloned);
      }),
      catchError((err) => {
        this.authService.signout();
        this.router.navigateByUrl('/');

        return throwError(() => {
          return err;
        });
      })
    );
  }
}
