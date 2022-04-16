import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.model';

const API_URL = `${environment.base_url}/api/authentication`;

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  private currentUser$: Observable<User | null> =
    this.currentUserSubject.asObservable();

  constructor(private httpClient: HttpClient) {
    console.log('AuthService.constructor');

    let storageUser;
    const storageUserAsStr = localStorage.getItem('currentUser');
    if (storageUserAsStr) {
      storageUser = JSON.parse(storageUserAsStr);
    }

    console.log(storageUser);

    this.currentUserSubject.next(storageUser);
  }

  get currentUser() {
    return this.currentUserSubject.value;
  }

  signin(user: User) {
    return this.httpClient.post<User>(`${API_URL}/signin`, user).pipe(
      tap((user) => {
        if (user) {
          this.setSessionUser(user);
        }
      })
    );
  }

  signup(user: User) {
    return this.httpClient.post<User>(`${API_URL}/signup`, user);
  }

  signout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  refreshToken() {
    const token = this.currentUserSubject?.value?.refreshToken;
    return this.httpClient.post<User>(
      `${API_URL}/refresh-token?token=${token}`,
      {}
    );
  }

  private setSessionUser(user: User) {
    localStorage.setItem('currentUser', JSON.stringify(user));
    this.currentUserSubject.next(user);
  }
}
