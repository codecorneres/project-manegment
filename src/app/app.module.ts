import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
/*
import { SocketIoModule, SocketIoConfig } from 'ng-socket-io';
const config: SocketIoConfig = { url: 'http://localhost:8000', options: {} };
  SocketIoModule.forRoot(config)*/

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

import { PushNotificationsService } from './push-notifications.service';


 
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
    AssingtaskComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpModule,
    FormsModule,
    AppRoutingModule,
    AngularFontAwesomeModule,
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production })
  
  ],
  providers: [AuthService, DataService, PushNotificationsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
