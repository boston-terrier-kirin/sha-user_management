import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { DetailComponent } from './detail/detail.component';

const routes: Routes = [
  {
    path: ':id',
    component: DetailComponent,
  },
  {
    path: '',
    component: AdminComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
