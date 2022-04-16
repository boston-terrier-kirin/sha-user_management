import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { InputComponent } from './input/input.component';
import { MessageComponent } from './message/message.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';

@NgModule({
  declarations: [InputComponent, MessageComponent, NotFoundComponent, UnauthorizedComponent],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [InputComponent, MessageComponent],
})
export class SharedModule {}
