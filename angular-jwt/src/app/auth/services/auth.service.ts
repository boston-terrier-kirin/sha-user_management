import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import jwtDecode, { JwtPayload } from 'jwt-decode';
import { User } from '../models/user.model';

const API_URL = `${environment.base_url}/api/authentication`;

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  currentUserSubject$ = new BehaviorSubject<User | null>(null);

  constructor(private httpClient: HttpClient) {
    /**
     * TODO：
     * この実装だとlocalstorageのroleを変えて、/adminに手動で遷移するとリフレッシュが走ってadminページが表示できてしまう。
     * AppComponent.ngOnInitでチェックしなおした方が良い。
     */
    /**
     * TODO：
     * 改ざんを防ぐのであれば、roleはtokenの中だけで持つようにして、tokenを変えたらJWT的にエラーになるようにする。
     * localstrageにはjwt以外は持たないようにするのが無難。
     */
    /**
     * TODO:
     * localstrageにpasswordが入っている。サーバから戻さないようにする。
     */
    let storageUser;
    const storageUserAsStr = localStorage.getItem('currentUser');
    if (storageUserAsStr) {
      storageUser = JSON.parse(storageUserAsStr);
    }

    const jwt: any = jwtDecode(storageUser.accessToken);
    console.log(jwt);

    /**
     * TODO:
     * SpringSecurityの都合で、ロールの前にROLE_がついているので除外する。
     * ロールをlocalStorageに持たないようにしようとしたが、ROLE_で問題発生。
     */
    const userToReStore: User = {
      id: jwt.userId,
      username: jwt.sub,
      name: storageUser.name,
      role: jwt.roles.substring(5), // とりあえず、ROLE_ を除外することに。
      accessToken: storageUser.accessToken,
      refreshToken: storageUser.refreshToken,
    };

    console.log('AuthService.constructor', userToReStore);
    this.currentUserSubject$.next(userToReStore);
  }

  /**
   * TODO: Patial<User>にして、Userの?を消す。
   * ⇒Partialにしなくても大丈夫そう。
   */
  signin(user: User) {
    return this.httpClient.post<User>(`${API_URL}/signin`, user).pipe(
      tap((user) => {
        if (user) {
          this.setSessionUser(user);
        }
      })
    );
  }

  /**
   * TODO: Patial<User>にして、Userの?を消す。
   * ⇒Partialにしなくても大丈夫そう。
   */
  signup(user: User) {
    return this.httpClient.post<User>(`${API_URL}/signup`, user);
  }

  signout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject$.next(null);
  }

  refreshToken() {
    const token = this.currentUserSubject$?.value?.refreshToken;
    return this.httpClient.post<User>(
      `${API_URL}/refresh-token?token=${token}`,
      {}
    );
  }

  setSessionUser(user: User) {
    /**
     * TODO:
     * localStrageには、最低限のものだけを入れるようにする。
     */
    const userToStore: Partial<User> = {
      name: user.name,
      accessToken: user.accessToken,
      refreshToken: user.refreshToken,
    };
    localStorage.setItem('currentUser', JSON.stringify(userToStore));

    console.log('setSessionUser', user);

    this.currentUserSubject$.next(user);
  }
}
