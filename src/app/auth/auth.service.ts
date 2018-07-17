import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  LoggedInUser;
  constructor(private myRoute: Router, private cookieService: CookieService) { }
  sendToken(token: string) {
    sessionStorage.setItem("LoggedInUser", token)
    this.cookieService.set( 'LoggedInUser', token );
    this.cookieService.set('LoggedInUser',token,0.8);
  }
  getToken() {
   //return sessionStorage.getItem("LoggedInUser")
    
   return this.cookieService.get('LoggedInUser');
    
  }
  isLoggednIn() {
    return this.getToken() !== '';
  }
  logout() {
    sessionStorage.removeItem("LoggedInUser");
    sessionStorage.removeItem("projectname");
    sessionStorage.removeItem("projectid");
    sessionStorage.removeItem("createtask");
    this.cookieService.delete('LoggedInUser');
    this.myRoute.navigate(["/login"]);
  }
}