import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthGuard } from './auth/auth.guard'; 

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { SlidbarComponent } from './slidbar/slidbar.component';
import { CreateprojectComponent } from './createproject/createproject.component';
import { CreatetaskComponent } from './createtask/createtask.component';
import { InviteComponent } from './invite/invite.component';
import { NotificationComponent } from './notification/notification.component';
import { AssingtaskComponent } from './assingtask/assingtask.component';
import { AcceptComponent } from './accept/accept.component';
const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
    canActivate: [AuthGuard]
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'createproject',
    component: CreateprojectComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'createtast',
    component: CreatetaskComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'invite',
    component: InviteComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'notification',
    component: NotificationComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'assigntask',
    component: AssingtaskComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'accept',
    component: AcceptComponent,
    canActivate: [AuthGuard]
  }
  
]; 

@NgModule({
   	imports: [RouterModule.forRoot(routes)],
  	exports: [RouterModule],
    declarations: [],
  	providers: [AuthGuard]
})
export class AppRoutingModule { }