import { Injectable } from '@angular/core';
import { CanLoad, Route, Router, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanLoad {
  constructor(private router: Router, private authService: AuthService) {}

  canLoad(
    route: Route,
    segments: UrlSegment[]
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const user = this.authService.currentUserSubject$.value;

    if (user) {
      if (route.data?.['roles'].indexOf(user.role) === -1) {
        this.router.navigateByUrl('/401');
        return false;
      }

      return true;
    }

    this.router.navigateByUrl('/');
    return false;
  }
}
