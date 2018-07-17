import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  constructor(private myRoute: Router) { }
  sendToken(token: string) {
    sessionStorage.setItem("LoggedInUser", token)
  }
  getToken() {
    return sessionStorage.getItem("LoggedInUser")
  }
  isLoggednIn() {
    return this.getToken() !== null;
  }
  logout() {
    sessionStorage.removeItem("LoggedInUser");
    sessionStorage.removeItem("projectname");
    sessionStorage.removeItem("projectid");
    sessionStorage.removeItem("createtask");
    this.myRoute.navigate(["/login"]);
  }
}