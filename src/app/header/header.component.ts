import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { DataService } from '../data.service';
import { Router } from '@angular/router';
import * as $ from 'jquery';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
datas;
length;
  constructor(public auth: AuthService, private dataService: DataService, private router: Router) { }
  email : string;
  ngOnInit() {
  		this.email = sessionStorage.getItem("LoggedInUser");
  		this.dataService.GetUnseenNotification(this.email).subscribe(data => { this.datas = data
        this.length = data.length;
      });
  }
  
  asseptnotification(projectid, id){
    this.dataService.Setnotification(id).subscribe(data =>  this.datas = data);
    sessionStorage.setItem('notificationid', projectid);
    this.router.navigateByUrl('/invite');
  }
  showtoggle(arr) {
    /*$(".hidediv"+ arr).hide();*/
    $(".showclstdiv"+ arr).show();
  }
    
  hidetoggle(arr) {
    $(".hidediv"+ arr).show();
    $(".showclstdiv"+ arr).hide();
  }
}