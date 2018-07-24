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
  selector: 'app-createtask',
  templateUrl: './createtask.component.html',
  styleUrls: ['./createtask.component.css']
})
export class CreatetaskComponent implements OnInit {
public show:boolean = false;
public shows:boolean = false;
public buttonName:any = ' + Add new Tasks';
public buttonsName:any = ' Add User';
commentdata;
projectname;
projectid;
form;
user;
asign;
createtasks;
maildata;
  constructor(private dataService: DataService, private router: Router,private auth: AuthService, private cookieService: CookieService) { }
  datas;
  users;

  ngOnInit() {
     sessionStorage.setItem('headername', 'Create Task');

  	this.projectname = sessionStorage.getItem("projectname");
    this.projectid = sessionStorage.getItem("projectid");
   // this.user = sessionStorage.getItem("LoggedInUser");
   this.user = this.cookieService.get('LoggedInUser');
    this.createtasks = sessionStorage.getItem("createtask");
      this.Gettasks(this.projectid); 
  }
  
  toggle() {
    this.show = !this.show;
    if(this.show) { 
      this.buttonName = "X";
  		$("#bt1").hide();
  	}
    else{
      this.buttonName = " + Add new Tasks";
      $("#bt1").show();
    }
  }
  showtoggle(arr) {
    $(".hidediv"+ arr).hide();
    $(".showclstdiv"+ arr).show();
  }

  confirmdelete(id){
    $("#"+ id).show();
  }
  nodelete(id){
    console.log(id);
    $("#"+ id).hide();

  } 
  hidetoggle(arr) {
    $(".hidediv"+ arr).show();
    $(".showclstdiv"+ arr).hide();
  }
  showdiv() {
    this.shows = !this.shows;
    if(this.shows) { 
      this.buttonsName = "Add Users";
    }
    else{
      this.buttonsName = "Add Users";
    }
  }
  showDescriptionDiv(){
    $(".divd").show();
    $(".divs").hide();
  }
  
  Gettasks(projectid){
  	this.dataService.Gettasks(projectid).subscribe(form => {this.form = form});
  }
  
  GetassignUser(taskid){
   this.getcomments(taskid);
    this.dataService.GetassignUser(taskid,this.projectid).subscribe(data =>this.asign = data);
  }
  createtask(createtasks){
  	this.dataService.createnewtasks(createtasks).subscribe(data => {this.datas = data.data
      $("#email").val('');
  		this.Gettasks(this.projectid);  
  	});
  }
  Setdescription(updatetask){
  	this.dataService.Setdescription(updatetask).subscribe(data =>{
      /*this.GettaskDescription(updatetask.task);*/
      $(".divd").hide();
      $(".divs").show();
    });
  }
  /*GettaskDescription(taskid){
    var forms = {
              description : ""
            };
    this.dataService.GetTaskDescription(taskid).subscribe(form => {forms.description = form.data
      console.log(forms.description);
      console.log(form.data);
    });
  }*/
  createassignuser(assignuser){
    assignuser.user = this.user;
    this.dataService.createassignuser(assignuser).subscribe(data => {
        this.GetassignUser(assignuser.projecttaskid);
    });
  }
  deleteUser(userassigned,taskid,taskname){
     this.dataService.deleteAssignUser(taskid,userassigned, this.user,  this.projectid, taskname).subscribe(data => {
        this.GetassignUser(taskid);
    });
  }
  inviteuser = function(createmember){
    if(this.user == createmember.assignuser){
      this.datas = "You can't send invitation on own project";
      $("#error").show();
          setTimeout(function() { $("#error").hide(); }, 3000);
        $("#email").val('');
    }
    else{
        this.dataService.inviteprojectuser(createmember).subscribe(data =>  {this.datas = data.data  
       $("#error").show();
          setTimeout(function() { $("#error").hide(); }, 3000);   
        });
        $("#email").val('');
    }
    
  }

   /*Comments */
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
