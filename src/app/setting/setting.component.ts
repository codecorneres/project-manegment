import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../auth/auth.service';
import { DataService } from '../data.service';
import * as $ from 'jquery';
import { Form } from '../form';
import { CookieService } from 'ngx-cookie-service';
import {Md5} from "md5-typescript";
import { Router } from '@angular/router';
import { Registration } from '../registration';
@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css']
})
export class SettingComponent implements OnInit {
email;
datas;
registrationFormGroup: FormGroup;
  passwordFormGroup: FormGroup;

  constructor(
  	public auth: AuthService,
    private dataService: DataService,
    private cookieService: CookieService,
  	private router: Router,
    private formBuilder: FormBuilder) 
  {

    this.passwordFormGroup = this.formBuilder.group({
      newpassword: ['', Validators.required],
      repeatPassword: ['', Validators.required]
    }, {
      validator: Registration.validate.bind(this)
    });
    this.registrationFormGroup = this.formBuilder.group({
      oldpassword: ['', Validators.required],
      passwordFormGroup: this.passwordFormGroup
    });
  }
form = new Form;
changepassword(form){
	form.password = Md5.init(form.oldpassword); 
  console.log(form.oldpassword);
	form.confirmpassword = Md5.init(form.passwordFormGroup.repeatPassword);
  console.log(form.confirmpassword);
  form.email = this.email;
  console.log(form);
	this.dataService.changepassword(form).subscribe(data => this.datas = data.data)
	$("#error").show();
          setTimeout(function() { $("#error").hide(); }, 3000);
          form.reset();
	
}
  ngOnInit() {
  	sessionStorage.setItem('headername', 'Setting');
  	this.email = this.cookieService.get('LoggedInUser');
  	//this.form.email = this.email;
  }
  

}
