import { NgModule } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './shared/not-found/not-found.component';
import { UnauthorizedComponent } from './shared/unauthorized/unauthorized.component';

const routes: Routes = [
  {
    path: 'profile',
    loadChildren: () =>
      import('./profile/profile.module').then((m) => m.ProfileModule),
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./admin/admin.module').then((m) => m.AdminModule),
  },
  { path: '404', component: NotFoundComponent },
  { path: '401', component: UnauthorizedComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
  constructor(private router: Router) {
    this.router.errorHandler = (err) => {
      this.router.navigateByUrl('/404');
    };
  }
}
