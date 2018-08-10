import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { AuthService } from '../auth/auth.service';
import { DataService } from '../data.service'; 
import {NgForm} from '@angular/forms';
import * as $ from 'jquery';
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-assingtask',
  templateUrl: './assingtask.component.html',
  styleUrls: ['./assingtask.component.css']
})
export class AssingtaskComponent implements OnInit {

constructor(private dataService: DataService, private router: Router,private auth: AuthService,
  private cookieService: CookieService) { }
assingtaskform;
projectname;
projectid;
user;
createtasks;
commentdata;
taskdata;
taskuser;
attach;
  ngOnInit() {
    sessionStorage.setItem('headername', 'Add Task');
  	this.projectname = sessionStorage.getItem("projectname");
    this.projectid = sessionStorage.getItem("projectid");
   // this.user = sessionStorage.getItem("LoggedInUser");
    this.user = this.cookieService.get('LoggedInUser');
    this.createtasks = sessionStorage.getItem("createtask");

      this.GetAssigntasks(this.projectid, this.user);
      this.GettaskUsers(this.projectid);
  }
  showtoggle(arr) {
    $(".hidediv"+ arr).hide();
    $(".showclstdiv"+ arr).show();
  }
    
  hidetoggle(arr) {
    $(".hidediv"+ arr).show();
    $(".showclstdiv"+ arr).hide();
  }
  GetAssigntasks(projectid,user){
    this.dataService.GetAssigntasks(projectid,user).subscribe(form => {this.assingtaskform = form});
  }
  GettaskUsers(projectid){
    this.dataService.GetAlltasks(projectid).subscribe(form => {this.taskuser = form});
  }
  GetassignUser(taskid){
  	this.dataService.GetTaskDescription(taskid).subscribe(form => this.taskdata = form);
  	this.getcomments(taskid);
    this.getAttachment(taskid);
  }
  getAttachment(id){
    this.dataService.getAttachment(id).subscribe(data =>this.attach = data);
  }
  
  confirmdelete(id){
  	$("#"+ id).show();
  }
  nodelete(id){
  	console.log(id);
  	$("#"+ id).hide();

  }
  /*----comments------0*/
  createcomments = function(comment){
    this.dataService.createcomment(comment).subscribe(data =>  {this.getcomments(comment.taskid)});
    $("#comment").val('');
  }
  getcomments(taskid){
    this.dataService.getComments(taskid,this.projectid).subscribe(data =>this.commentdata = data);
  }
  deleteComment(commentid,taskid){
   this.dataService.deleteComment(commentid).subscribe(data => {
       this.getcomments(taskid);
    });
  }
  updatcomment(update){
    this.dataService.updateComment(update).subscribe(data => {
       this.getcomments(update.taskid);
       
    });
  }
}
