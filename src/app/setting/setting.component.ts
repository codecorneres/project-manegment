import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { DataService } from '../data.service';
import * as $ from 'jquery';
import { Form } from '../form';
import { CookieService } from 'ngx-cookie-service';
import {Md5} from "md5-typescript";
import { Router } from '@angular/router';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css']
})
export class SettingComponent implements OnInit {
email;
datas;
  constructor(
  	public auth: AuthService,
    private dataService: DataService,
    private cookieService: CookieService,
  	private router: Router) { }
form = new Form;
changepassword(form){
	if(form.newpassword != form.confirmpassword)
	{
		this.datas="Password not match";
	}
	else{
		console.log(form);
	this.form.password = Md5.init(this.form.password);
	this.form.confirmpassword = Md5.init(this.form.confirmpassword);
	this.dataService.changepassword(form).subscribe(data => this.datas = data.data)
	$('.frmcls').val('');
	}
	
}
  ngOnInit() {
  	sessionStorage.setItem('headername', 'Setting');
  	this.email = this.cookieService.get('LoggedInUser');
  	this.form.email = this.email;
  }

}
