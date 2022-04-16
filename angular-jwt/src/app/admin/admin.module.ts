import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin/admin.component';
import { DetailComponent } from './detail/detail.component';



@NgModule({
  declarations: [
    AdminComponent,
    DetailComponent
  ],
  imports: [
    CommonModule
  ]
})
export class AdminModule { }
