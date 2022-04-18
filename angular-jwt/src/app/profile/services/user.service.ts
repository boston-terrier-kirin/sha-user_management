import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { RequestBaseService } from 'src/app/shared/services/request-base.service';
import { environment } from 'src/environments/environment';

const API_URL = `${environment.base_url}/api/user`;

@Injectable({
  providedIn: 'root',
})
export class UserService extends RequestBaseService {
  constructor(httpClient: HttpClient, authService: AuthService) {
    super(httpClient, authService);
  }

  changeRole(newRole: string) {
    return this.httpClient.put(
      `${API_URL}/change/${newRole}`,
      {},
      {
        headers: this.getHeaders(),
      }
    );
  }
}
