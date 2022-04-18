import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from 'src/app/auth/models/user.model';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  users$ = new Observable<User[] | null>();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private adminService: AdminService
  ) {}

  ngOnInit(): void {
    this.users$ = this.adminService.findAllUsers();
  }

  detail(user: User) {
    /**
     * TODO:
     * /admin/:id ではなく、/admin からの相対パスにしたい。
     */
    // this.router.navigate(['/admin', user.id]);
    // これで、/adminから相対パスで、/admin/7 になる。
    this.router.navigate([user.id], { relativeTo: this.route });
  }
}
