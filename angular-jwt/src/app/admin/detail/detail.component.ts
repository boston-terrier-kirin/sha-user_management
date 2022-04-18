import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { User } from 'src/app/auth/models/user.model';
import { UserService } from 'src/app/profile/services/user.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
})
export class DetailComponent implements OnInit {
  user$ = new Observable<User>();

  // /**
  //  * TODO:
  //  * リフレッシュするとエラーになる。
  //  */
  // constructor(private router: Router) {
  //   this.user = this.router.getCurrentNavigation()?.extras.state as User;
  // }

  constructor(
    private route: ActivatedRoute,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.user$ = this.route.params.pipe(
      // 一覧を次々にクリックする構成の場合、ユーザの取得が終わらないうちに次のユーザの取得が始まってしまう。
      // switchMapを使って、新しいリクエストが走ったら、進行中のリクエストをキャンセルする。
      switchMap((param) => {
        const { id } = param;
        return this.userService.getUser(id);
      })
    );
  }
}
