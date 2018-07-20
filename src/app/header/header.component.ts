import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { DataService } from '../data.service';
import { Router } from '@angular/router';
import * as $ from 'jquery';
import { CookieService } from 'ngx-cookie-service';
import { PushNotificationsService } from '../push-notifications.service'; 
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
datas;
length;
  constructor(public auth: AuthService, private dataService: DataService, private router: Router,
   private cookieService: CookieService,
   private _notificationService: PushNotificationsService) { }
  email : string;
  i : any;
  ngOnInit() {
  		//this.email = sessionStorage.getItem("LoggedInUser");
      this.email = this.cookieService.get('LoggedInUser');
  		this.dataService.GetUnseenNotification(this.email).subscribe(res=> { this.datas = res
        this.length = res.length;
        /*if(this.length <= '0' ){
          console.log(this.length);
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
  
  asseptnotification(projectid, id,invite){
    if(!invite){
       this.dataService.Setnotification(id).subscribe(data =>  this.datas = data);
    this.router.navigateByUrl('/notification');
    }
    else{
      this.dataService.Setnotification(id).subscribe(data =>  this.datas = data);
      sessionStorage.setItem('notificationid', projectid);
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