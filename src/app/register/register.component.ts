import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import {Md5} from "md5-typescript";
import { CookieService } from 'ngx-cookie-service';

import { Form } from '../form';
import { DataService } from '../data.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
	form = new Form;
  datas;
  loginuser;
  cookieValue = 'UNKNOWN';
  sessionemail;
  sessionid;
  sesaction;
  sesprojectname;
  constructor(private dataService: DataService, 
    private router: Router,
    public auth: AuthService, 
    private cookieService: CookieService) { }

  singUp(form){
    this.form.password = Md5.init(this.form.password);
    this.dataService.singUp(this.form).subscribe(data =>  {
      if(data.data == "Record has been Inserted"){
        this.auth.sendToken(this.form.email);
        if(this.sessionemail == "undefined" || this.sessionemail == null){
          console.log("haii1");
          console.log(this.sessionemail);
         this.router.navigate(['/home']);
        }
        else{
          sessionStorage.setItem('notificationid', this.sessionid);
          sessionStorage.setItem('useremail', this.sessionemail);
          sessionStorage.setItem('action', this.sesaction);
          sessionStorage.setItem('projectname', this.sesprojectname);
          this.router.navigate(['/accept']);
        
        }
      }
      else{
        this.datas = data.data;
      }
    }); 
  }
  ngOnInit() {
      this.sessionemail = sessionStorage.getItem('useremail');
      this.sessionid = sessionStorage.getItem('notificationid');
      this.sesaction = sessionStorage.getItem("action");
      this.sesprojectname = sessionStorage.getItem("projectname");
      if(this.sessionemail != "undefined"){
        console.log(this.sessionemail);
        this.form.email = this.sessionemail;
          
      }
      else{
        this.form.email = '';
      }
    this.cookieValue = this.cookieService.get('LoggedInUser'); 
    if(this.cookieValue!=""){
       this.router.navigate(['/home']);
    }
     /*this.loginuser = sessionStorage.getItem("LoggedInUser");
    if(!this.loginuser){
      console.log(this.loginuser);
    }
    else{
      this.router.navigate(['/home']);
    }*/
  }
}
