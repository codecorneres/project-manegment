import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router, ActivatedRoute, Params} from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import {Md5} from "md5-typescript";
import { CookieService } from 'ngx-cookie-service';
import * as $ from 'jquery';
import { Form } from '../form';
import { DataService } from '../data.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form = new Form;
  datas;
  loginuser;
  cookieValue = 'UNKNOWN';
  notificationid;
  id;
  useremail;
  sessionid;
  sessionemail;
  action;
  projectname;
  sesaction;
  sesprojectname;
  resenddata;
 /* notificationidr;
  useremailr;
  actionr;
  projectnamer;*/
  //projectid;
  constructor(private dataService: DataService,
  private router: Router,
  public auth: AuthService,
  private cookieService: CookieService,
  private activatedRoute: ActivatedRoute) {
  this.activatedRoute.queryParams.subscribe(params => {
        this.id = params['projectid'];
        this.useremail = params['user'];
        this.action = params['action'];
        this.projectname = params['projectname'];
    }); 
  }

  login(form) {
    this.form.password = Md5.init(this.form.password);
    this.dataService.login(this.form).subscribe(data =>  {
      if(data.data == "Matching"){
        this.auth.sendToken(this.form.email);

        if(this.sessionemail != "undefined" && this.sessionemail != undefined && this.sessionemail != null){
   
          sessionStorage.setItem('notificationid', this.sessionid);
          sessionStorage.setItem('useremail', this.sessionemail);
          sessionStorage.setItem('action', this.sesaction);
          sessionStorage.setItem('projectname', this.sesprojectname);
          this.router.navigate(['/accept']);
        }
        else if(this.id != "undefined" && this.id != null && this.id != undefined){
   
          sessionStorage.setItem('notificationid', this.id);
          sessionStorage.setItem('useremail', this.useremail);
          sessionStorage.setItem('action', this.action);
          sessionStorage.setItem('projectname', this.projectname);
          this.router.navigate(['/accept']);
        }
        else{
          this.router.navigate(['/home']);
        }
      }
      else{
        this.datas = data.data;
      }
    }); 
  }

resendpassword(form){
  this.dataService.resendpassword(form).subscribe(data => this.resenddata = data.data);
  $(".notreg").show();
  setTimeout(function() { $(".notreg").hide(); }, 5000);
}
  ngOnInit() { 
  if(this.id != "undefined" && this.id != undefined){
    sessionStorage.setItem('notificationid', this.id);
    sessionStorage.setItem('useremail', this.useremail);
    sessionStorage.setItem('action', this.action);
    sessionStorage.setItem('projectname', this.projectname); 
  }
   
      this.sessionemail = sessionStorage.getItem('useremail');
      this.sessionid = sessionStorage.getItem('notificationid');
      this.sesaction = sessionStorage.getItem("action");
      this.sesprojectname = sessionStorage.getItem("projectname");
      if(this.sessionemail != "undefined"){
        this.form.email = this.sessionemail;  
      }
      else{
        this.form.email = '';
      }

    this.loginuser = sessionStorage.getItem("LoggedInUser");
    this.cookieValue = this.cookieService.get('LoggedInUser');
    console.log(this.cookieValue);
    if(this.cookieValue !=''){
      console.log(this.id);
      if(this.id != undefined){
        sessionStorage.setItem('notificationid', this.id);
        sessionStorage.setItem('useremail', this.useremail);
        sessionStorage.setItem('action', this.action);
        sessionStorage.setItem('projectname', this.projectname);
        this.router.navigate(['/accept']);
      }
      else{
       this.router.navigate(['/home']);
      }
    }

    }
}
