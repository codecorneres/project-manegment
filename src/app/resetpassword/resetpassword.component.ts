import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../auth/auth.service';
import { DataService } from '../data.service';
import * as $ from 'jquery';
import { Form } from '../form';
import { CookieService } from 'ngx-cookie-service';
import {Md5} from "md5-typescript";
import { Router, ActivatedRoute, Params} from '@angular/router';
import { Registration } from '../registration';
@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css']
})
export class ResetpasswordComponent implements OnInit {

email;
datas;
registrationFormGroup: FormGroup;
  passwordFormGroup: FormGroup;

  constructor(
  	public auth: AuthService,
    private dataService: DataService,
    private cookieService: CookieService,
  	private router: Router,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute) 
  {
  	this.activatedRoute.queryParams.subscribe(params => {
        this.email = params['email'];
    }); 
    this.passwordFormGroup = this.formBuilder.group({
      newpassword: ['', Validators.required],
      repeatPassword: ['', Validators.required]
    }, {
      validator: Registration.validate.bind(this)
    });
    this.registrationFormGroup = this.formBuilder.group({
      passwordFormGroup: this.passwordFormGroup
    });
  }
  form = new Form;
  changepassword(form){
  	form.confirmpassword = Md5.init(form.passwordFormGroup.repeatPassword);
    form.email = this.email;
  	this.dataService.resetpassword(form).subscribe(data => {
  		if(data.data =="Password has been Updated..!!")
  		{
    	
  			this.router.navigate(['/login']);
  			$('#MessageBox').html(data.data);
      		$('#MessageBox').stop(true, true);
      		$('#MessageBox').slideDown(1000).delay(5000).slideUp(1000);
  			/*this.notificationsService.addInfo('Password has been Updated..!!');
  			this.notifier.show( {
			  type: 'success',
			  message: data.data,
			  id: 'THAT_NOTIFICATION_ID' // Again, this is optional
			} );
			setTimeout(function() { this.notifier.hide( 'THAT_NOTIFICATION_ID' ); }, 5000);*/
  		}	
  		else{
  			this.datas = data.data

  		}
  	})
  	$("#error").show();
      setTimeout(function() { $("#error").hide(); }, 5000);
    }
  ngOnInit() {
  	if(!this.email){
  		this.auth.logout();

  	}
  	/*this.notificationsService.addError('Error message here');
	this.notificationsService.addWarning('Some warning message');*/
	
  }
}
