import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { DataService } from '../data.service';
import { Router } from '@angular/router';
import * as $ from 'jquery';
import { CookieService } from 'ngx-cookie-service';
import { PushNotificationsService } from '../push-notifications.service'; 
import { PushNotificationService } from 'ng-push-notification';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
datas;
length;
headername;
  constructor(public auth: AuthService, private dataService: DataService, private router: Router,
   private cookieService: CookieService,
   private pushNotification: PushNotificationService,
   private _notificationService: PushNotificationsService) { }
  email : string;
  i : any;
  ngOnInit() {
      this.headername = sessionStorage.getItem("headername");
  		//this.email = sessionStorage.getItem("LoggedInUser");
      this.email = this.cookieService.get('LoggedInUser');
  		this.dataService.GetUnseenNotification(this.email).subscribe(res=> { this.datas = res
        this.length = res.length;
        /*if(this.length <= '0' ){
        }
        else{
          for(this.i='0'; this.i<this.length; this.i++ ){
            let data: Array < any >= [];  
            data.push({  
                'title': res[this.i].assignuser,  
                'alertContent': res[this.i].notify
           
            });  
            this._notificationService.generateNotification(data);
          }
        }*/
        });
  }

  showNav(){
    $("#collapsibleNavbar1").show();
    $(".closebtn").show();
  }
  closeNav(){
     $("#collapsibleNavbar1").hide();
     $(".closebtn").hide();
  }
  asseptnotification(user,projectid, id,invite){
    if(!invite){
       this.dataService.Setnotification(id).subscribe(data =>  this.datas = data);
    this.router.navigateByUrl('/notification');
    }
    else{
      this.dataService.Setnotification(id).subscribe(data =>  this.datas = data);
      sessionStorage.setItem('notificationid', projectid);
      sessionStorage.setItem('user', user);
      this.router.navigateByUrl('/invite');
    }
    
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