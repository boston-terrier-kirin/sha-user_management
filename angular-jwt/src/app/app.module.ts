import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AuthModule } from './auth/auth.module';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    // AppModuleで1回importすれば良いかと思っていたけど、各Moduleでimportする必要あり。
    // FontAwesomeModule,
    /* eager load するモジュールはここでimportが必要になる。 */
    AuthModule,
    /* 404と401があるのでここでimportが必要になる。 */
    SharedModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
