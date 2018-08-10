import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule, FormGroup } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { CommonModule } from '@angular/common';
import { PushNotificationModule } from 'ng-push-notification';
import { HttpClientModule } from '@angular/common/http';
import { EmojiPickerModule } from 'ng-emoji-picker';
import { PickerModule } from '@ctrl/ngx-emoji-mart';

import { CallcomponentService } from './callcomponent.service';
import { DataService } from './data.service';
import { AuthService } from './auth/auth.service';
import { AuthGuard } from './auth/auth.guard'; 

import { AppRoutingModule } from './/app-routing.module'; 

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { SlidbarComponent } from './slidbar/slidbar.component';
import { CreateprojectComponent } from './createproject/createproject.component';
import { CreatetaskComponent } from './createtask/createtask.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { InviteComponent } from './invite/invite.component';
import { NotificationComponent } from './notification/notification.component';
import { AssingtaskComponent } from './assingtask/assingtask.component';
import { AcceptComponent } from './accept/accept.component';
import { SettingComponent } from './setting/setting.component';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';

import { PushNotificationsService } from './push-notifications.service';
import { CookieService } from 'ngx-cookie-service';
import { DeactivetaskComponent } from './deactivetask/deactivetask.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    SlidbarComponent,
    CreateprojectComponent,
    CreatetaskComponent,
    InviteComponent,
    NotificationComponent,
    AssingtaskComponent,
    AcceptComponent,
    SettingComponent,
    ResetpasswordComponent,
    DeactivetaskComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    ReactiveFormsModule,
    HttpModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    AngularFontAwesomeModule,
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production }),
    PushNotificationModule.forRoot(/* Default settings here, interface PushNotificationSettings */),
    EmojiPickerModule
  
  ],
  providers: [AuthService, DataService, PushNotificationsService, CookieService,CallcomponentService],
  bootstrap: [AppComponent]
})
export class AppModule { }
