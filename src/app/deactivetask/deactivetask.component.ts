import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { AuthService } from '../auth/auth.service';
import { DataService } from '../data.service'; 
import {NgForm} from '@angular/forms';
import * as $ from 'jquery';
import { CookieService } from 'ngx-cookie-service';
import { CallcomponentService } from '../callcomponent.service';
import { Http } from '@angular/http';  
import { CreatetaskComponent } from '../createtask/createtask.component';
@Component({
  selector: 'app-deactivetask',
  templateUrl: './deactivetask.component.html',
  styleUrls: ['./deactivetask.component.css']
})
export class DeactivetaskComponent implements OnInit {
public show:boolean = false;
public shows:boolean = false;
public duedate:boolean = false;
public moves:boolean = false;
public buttonName:any = ' + Add new Tasks';
public buttonsName:any = ' Add User';
commentdata;
projectname;
projectid;
form;
user;
asign;
time;
date:any='';
createtasks;
maildata;
selectedFile: File = null;
  constructor(private dataService: DataService, 
    private router: Router,
    private auth: AuthService,
    private cookieService: CookieService,
    private callcomponentService:CallcomponentService,
    private http:Http) { 
  	 /*this.callcomponentService.listend().subscribe((m:any) => {
            this.onFilterClick(m);
        })*/
}
/*async onFilterClick(event) {
  if(event ==='true'){
  	console.log(event);
    await this.Gettasks(this.projectid);
  }
}
*///let saro = new CreatetaskComponent(this.http);
  datas;
  datass;
  users;
  taskuser;
  attach;
  ngOnInit() {
  	sessionStorage.setItem('headername', 'Create Task');
  	this.projectname = sessionStorage.getItem("projectname");
    this.projectid = sessionStorage.getItem("projectid");
    this.user = this.cookieService.get('LoggedInUser');
    this.createtasks = sessionStorage.getItem("createtask");
      this.Gettasks(this.projectid); 
      this.GettaskUsers(this.projectid);
      this.time = "12:00"

  }
  Gettasks(projectid){
  	this.dataService.Getdeactivetasks(projectid).subscribe(form => {this.form = form});
  }
  GettaskUsers(projectid){
    this.dataService.GettaskUsers(projectid).subscribe(form => {this.taskuser = form});
  }
  GetassignUser(taskid){
   this.getcomments(taskid);
   this.getAttachment(taskid);
    this.dataService.GetassignUser(taskid,this.projectid).subscribe(data =>this.asign = data);
  }
  getcomments(taskid){
    this.dataService.getComments(taskid,this.projectid).subscribe(data =>this.commentdata = data);
  }
  getAttachment(id){
    this.dataService.getAttachment(id).subscribe(data =>this.attach = data);
  }
  confirmdelete(id){
    $("#"+ id).show();
  }
  nodelete(id){
    $("#"+ id).hide();

  } 
  deletetask(ind,id){
    this.dataService.deleteTask(id).subscribe(data =>  {this.Gettasks(this.projectid)});
    $("#hidetemp"+ ind).click();
  }
  archive(ind,id){
    $("#hidetemp"+ ind).click();
    this.dataService.activeArchive(id).subscribe(data => { this.Gettasks(this.projectid) });
   //this.saro.Gettasks(this.projectid)
    //setTimeout(this.callcomponentService.filter('rrrrr'),3000);
  }
}
