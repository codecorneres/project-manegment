import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { DataService } from '../data.service';
import { Router, ActivatedRoute, Params} from '@angular/router';
import { PushNotificationsService } from '../push-notifications.service'; 
import * as $ from 'jquery'; 
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
forms;
datas;
email;
createtask;
  cookieValue = 'UNKNOWN';

  constructor(
    private dataService: DataService, 
    private router: Router, 
    private auth: AuthService,
    private _notificationService: PushNotificationsService, 
    private cookieService: CookieService,
    private activatedRoute: ActivatedRoute)
    { 
      
  }
   createTask = function(projectname, projectid) {
    sessionStorage.setItem('projectname', projectname);
    sessionStorage.setItem('projectid', projectid);
    sessionStorage.setItem('createtask', "createtask");
    this.router.navigateByUrl('/createtast');
  }
  createAssignTask = function(projectname, projectid) {
    sessionStorage.setItem('projectname', projectname);
    sessionStorage.setItem('projectid', projectid);
    sessionStorage.setItem('createtask', "createassignTask");
    this.router.navigateByUrl('/assigntask');
  }
  showtoggle(arr) {
    $(".hidediv"+ arr).hide();
    $(".showclstdiv"+ arr).show();
  }
    
  hidetoggle(arr) {
    $(".hidediv"+ arr).show();
    $(".showclstdiv"+ arr).hide();
  }
  
   confirmdelete(id){
    $("#"+ id).show();
  }
  nodelete(id){
    console.log(id);
    $("#"+ id).hide();

  } 
  updatproject(form){
    this.dataService.updatproject(form).subscribe(data =>  {this.getAllProject()});
  }
  deleteProject(id){
    this.dataService.deleteProject(id).subscribe(data =>  {this.getAllProject()});

  }
  ngOnInit() {
    this.cookieValue = this.cookieService.get('LoggedInUser');
    sessionStorage.setItem('headername', 'Dashboard');
   // this.email = sessionStorage.getItem("LoggedInUser");
   /* let data: Array < any >= [];  
      data.push({  
          'title': 'Home Notification',  
          'alertContent': 'This is Notification Service Alert'  
      });  
    this._notificationService.generateNotification(data);*/

    this.getAllProject();
    this.dataService.GetAcceptdProject(this.cookieValue).subscribe(data =>  this.datas = data); 
  }
  getAllProject(){
    this.dataService.GetAllProject(this.cookieValue).subscribe(data =>  this.forms = data);
  }
}
