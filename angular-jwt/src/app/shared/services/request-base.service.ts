import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from 'src/app/auth/models/user.model';
import { AuthService } from 'src/app/auth/services/auth.service';

export abstract class RequestBaseService {
  protected currentUser: User | null = null;

  protected constructor(
    protected httpClient: HttpClient,
    protected authService: AuthService
  ) {
    this.authService.currentUserSubject$.subscribe((user) => {
      this.currentUser = user;
    });
  }

  get getHeaders(): HttpHeaders {
    return new HttpHeaders({
      authorization: `Bearer ${this.currentUser?.accessToken}`,
      'Content-Type': 'application/json; charset=UTF-8',
    });
  }
}
