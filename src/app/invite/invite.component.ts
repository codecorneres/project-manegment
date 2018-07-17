import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { DataService } from '../data.service';
import { Router } from '@angular/router';

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
  constructor(private dataService: DataService, private router: Router, private auth: AuthService) { }
  ngOnInit() {
    this.email = sessionStorage.getItem("LoggedInUser");
    this.notificationid = sessionStorage.getItem("notificationid");
    console.log(this.notificationid);
    if(this.notificationid == null)
    {
      this.GetAllInvitation();
    }
    else{
      this.dataService.GetOneInvitation(this.email,this.notificationid).subscribe(data =>  this.forms = data);
      sessionStorage.removeItem("notificationid");
    }
  }
  accept(createmember){
  	this.dataService.acceptrequest(createmember).subscribe(data =>  {this.datas = data
    this.router.navigateByUrl('/home');
  });
  }
  GetAllInvitation(){
  	this.dataService.GetAllInvitation(this.email).subscribe(data =>  this.forms = data);
  }
}
