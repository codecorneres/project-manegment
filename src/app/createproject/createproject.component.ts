import { Component, OnInit, EventEmitter, Output } from '@angular/core'; 
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { AuthService } from '../auth/auth.service';
import { DataService } from '../data.service';
import { Form } from '../form';
import { PushNotificationsService } from '../push-notifications.service';  
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-createproject',
  templateUrl: './createproject.component.html',
  styleUrls: ['./createproject.component.css']
})
export class CreateprojectComponent implements OnInit {
form = new Form;
datas;
email;
 private title: string = 'Browser Push Notifications!'; 
constructor(private dataService: DataService, private router: Router,
  public auth: AuthService, private _notificationService: PushNotificationsService,
  private cookieService: CookieService) { 
    this._notificationService.requestPermission();
}
 /*notify() {  
        let data: Array < any >= [];  
        data.push({  
            'title': 'Approval',  
            'alertContent': 'This is First Alert'  
        });  
        data.push({  
            'title': 'Request',  
            'alertContent': 'This is Second Alert'  
        });  
        data.push({  
            'title': 'Leave Application',  
            'alertContent': 'This is Third Alert'  
        });  
        data.push({  
            'title': 'Approval',  
            'alertContent': 'This is Fourth Alert'  
        });  
        data.push({  
            'title': 'To Do Task',  
            'alertContent': 'This is Fifth Alert'  
        }); 
        this._notificationService.generateNotification(data);  
    } */
createproject(form){
  form.email = this.email;
		this.dataService.createnewproject(form).subscribe(data => {
		if(data.data == "Record has been Inserted"){
        this.router.navigate(['/home']);
        //sessionStorage.setItem('projectname', create.name);
    }
      });

}
/*sendNotification(){
      this.socket.emit('create notification','Notification Test');
   }*/
createmember(createmember){
	console.log(createmember);
}
  ngOnInit() {
    sessionStorage.setItem('headername', 'Add Project');
   // this.email = sessionStorage.getItem("LoggedInUser");
    this.email = this.cookieService.get('LoggedInUser');
  }
}
