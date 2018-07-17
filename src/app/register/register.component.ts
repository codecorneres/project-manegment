import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import {Md5} from "md5-typescript";

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
  constructor(private dataService: DataService, private router: Router,public auth: AuthService) { }

  singUp(form){
  	this.form.password = Md5.init(this.form.password);
   this.dataService.singUp(this.form).subscribe(data =>  {
      if(data.data == "Record has been Inserted"){
        this.auth.sendToken(this.form.email);
        this.router.navigate(['/home']);
      }
      else{
        this.datas = data.data;
      }
    }); 
  }
  ngOnInit() {
     this.loginuser = sessionStorage.getItem("LoggedInUser");
    if(!this.loginuser){
      console.log(this.loginuser);
    }
    else{
      this.router.navigate(['/home']);
    }
  }
}
