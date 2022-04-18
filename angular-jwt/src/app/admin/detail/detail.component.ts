import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/auth/models/user.model';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
})
export class DetailComponent implements OnInit {
  user: User;

  /**
   * TODO:
   * リフレッシュするとエラーになる。
   */
  constructor(private router: Router) {
    this.user = this.router.getCurrentNavigation()?.extras.state as User;
  }

  ngOnInit(): void {}
}
