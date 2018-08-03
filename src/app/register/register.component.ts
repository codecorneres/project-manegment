import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import {Md5} from "md5-typescript";
import { CookieService } from 'ngx-cookie-service';
import * as $ from 'jquery';

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

  private save(): void{
    this.form.password = Md5.init(this.form.password);
    this.dataService.singUp(this.form).subscribe(data =>  {
      if(data.data == "Record has been Inserted"){
        this.auth.sendToken(this.form.email);
        if(this.sessionemail == "undefined" || this.sessionemail == null){
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
   singUp(form) {
     if(this.sessionemail != "undefined" && this.sessionemail != "null" && this.sessionemail != null){
      if(this.form.email != this.sessionemail){
       $("#email").css({"border-color": "red", "border-width":"1px", "border-style":"solid"});
      $(".changerror").show();
          setTimeout(function() { $(".changerror").hide(); }, 3000);
          this.form.email = this.sessionemail;
      }
      else{
        this.save();
      }
    }
    else{
      this.save();
    }
   
 }
  ngOnInit() {
      this.sessionemail = sessionStorage.getItem('useremail');
      this.sessionid = sessionStorage.getItem('notificationid');
      this.sesaction = sessionStorage.getItem("action");
      this.sesprojectname = sessionStorage.getItem("projectname");
      if(this.sessionemail != "undefined" && this.sessionemail != null){
        this.form.email = this.sessionemail;
        $("#email").attr('disabled','disabled');
         
      }
      else{
        this.form.email = '';
         $( "#email" ).prop( "disabled", false );
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
