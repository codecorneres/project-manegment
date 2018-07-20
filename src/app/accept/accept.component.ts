import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { DataService } from '../data.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-accept',
  templateUrl: './accept.component.html',
  styleUrls: ['./accept.component.css']
})
export class AcceptComponent implements OnInit {
 id;
 useremail;
 sessionid;
 sessionemail;
 action;
 email;
 datas;
 notificationid;
 projectname;
  constructor(private dataService: DataService, private router: Router, private auth: AuthService,
    private cookieService: CookieService) { }


  ngOnInit() {
  	this.email = this.cookieService.get('LoggedInUser');
    this.notificationid = sessionStorage.getItem("notificationid");
    this.useremail = sessionStorage.getItem("useremail");
    this.action = sessionStorage.getItem("action");
    this.projectname = sessionStorage.getItem("projectname");

    if(this.useremail != null){
	    if(this.useremail != this.email){
	      this.cookieService.delete('LoggedInUser');
	      this.router.navigate(["/login"]);
	    }
	    else{
    		console.log(this.projectname);
    		this.dataService.GetOneInvitation(this.email,this.notificationid).subscribe(data => {
    			var createmember = {
	    				projectname : this.projectname,
					    projectid: this.notificationid,
					    id: data[0]._id,
					    user: this.email,		
				    };
	    		if(this.action == "accept"){

	    			this.dataService.acceptrequest(createmember).subscribe(data =>  {this.datas = data.data});
    			}
    			else{
    				this.dataService.declinerequest(createmember).subscribe(data =>  {this.datas = data.data});
	   			}
	   		})
	    }
  	}
  }
}
