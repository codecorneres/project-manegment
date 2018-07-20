import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { DataService } from '../data.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-invite',
  templateUrl: './invite.component.html',
  styleUrls: ['./invite.component.css']
})
export class InviteComponent implements OnInit {
forms;
datas;
email;
form;
status;
notificationid;
useremail;
assignuser;
  constructor(private dataService: DataService, private router: Router, private auth: AuthService,
    private cookieService: CookieService) { }
  ngOnInit() {
    sessionStorage.setItem('headername', 'Invite');
   // this.email = sessionStorage.getItem("LoggedInUser");
   this.email = this.cookieService.get('LoggedInUser');
    this.notificationid = sessionStorage.getItem("notificationid");
    this.assignuser = sessionStorage.getItem("user");
    if(this.notificationid == null)
    {
      this.GetAllInvitation();
    }
    else{
      this.dataService.GetOneInvitation(this.email,this.notificationid).subscribe(data =>  this.forms = data);
      sessionStorage.removeItem("notificationid");
    }
   } 
  decline(id,user,projectid,projectname,assignuser){
    var createmember = {
              projectname : projectname,
              projectid: projectid,
              id: id,
              user: user, 
              assignuser: assignuser
            };
    this.dataService.declinerequest(createmember).subscribe(data =>  {this.datas = data
    this.router.navigateByUrl('/home');
  });
  }
  accept(createmember){
    createmember.user = this.email;
  	this.dataService.acceptrequest(createmember).subscribe(data =>  {this.datas = data
    this.router.navigateByUrl('/home');
  });
  }
  GetAllInvitation(){
  	this.dataService.GetAllInvitation(this.email).subscribe(data =>  this.forms = data);
  }
}