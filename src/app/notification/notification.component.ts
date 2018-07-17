import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { DataService } from '../data.service';
import * as $ from 'jquery';
@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {

  constructor(public auth: AuthService, private dataService: DataService) { }
	email;
	datas;
  ngOnInit() {
  	this.email = sessionStorage.getItem("LoggedInUser");
  		this.dataService.Getnotification(this.email).subscribe(data =>  this.datas = data);
  }

}