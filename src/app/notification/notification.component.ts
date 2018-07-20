import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { DataService } from '../data.service';
import * as $ from 'jquery';
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {

  constructor(public auth: AuthService, private dataService: DataService, private cookieService: CookieService) { }
	email;
	datas;
  ngOnInit() {
    sessionStorage.setItem('headername', 'Notification');
      this.email = this.cookieService.get('LoggedInUser');
  	//this.email = sessionStorage.getItem("LoggedInUser");
  	this.getnotification()	
  }
  deleteNotification(id){
    this.dataService.deleteNotification(id).subscribe(data =>  {this.getnotification()});
  }
  getnotification(){
    this.dataService.Getnotification(this.email).subscribe(data =>  this.datas = data);
  }
}