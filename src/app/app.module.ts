import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {DefaultModule} from "./layouts/default/default.module";
import {AdminLayoutModule} from "./layouts/admin/admin-layout.module";
import {FlexLayoutModule} from '@angular/flex-layout';
import {HttpClientModule, HTTP_INTERCEPTORS} from "@angular/common/http";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { JwtInterceptor } from './modules/common/interceptor/jwt.interceptor';
import { AdminAuthorizationGuard } from './modules/common/guard/adminAuthorizationGuard';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FlexLayoutModule,
    AdminLayoutModule,
    DefaultModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
