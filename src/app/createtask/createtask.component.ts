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

  constructor(private dataService: DataService, private router: Router,private auth: AuthService, private cookieService: CookieService) { }
  datas;
  users;

  ngOnInit() {
  	this.projectname = sessionStorage.getItem("projectname");
    this.projectid = sessionStorage.getItem("projectid");
   // this.user = sessionStorage.getItem("LoggedInUser");
   this.user = this.cookieService.get('LoggedInUser');
    this.createtasks = sessionStorage.getItem("createtask");
    console.log(this.createtasks);
      this.Gettasks(this.projectid);
    /****For Email ID OF users***/
  	//this.dataService.GetUsers(this.projectid).subscribe(data => {this.assignusers = data});  
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
    $("."+ id).show();
  }
  nodelete(id){
    console.log(id);
    $("."+ id).hide();

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
      //this.Gettasks(this.projectid);
      
    });
  }
  createassignuser(assignuser){
    assignuser.user = this.user;
    this.dataService.createassignuser(assignuser).subscribe(data => {
        this.GetassignUser(assignuser.projecttaskid);
    });
  }
  deleteUser(userassigned,taskid){
   
     this.dataService.deleteAssignUser(taskid,userassigned, this.user,  this.projectid).subscribe(data => {
        this.GetassignUser(taskid);
    });
  }
  inviteuser = function(createmember){
    createmember.status = "false";
    createmember.notify = ("You are invited by " +createmember.user+ " for " +createmember.projectname+" project");
    this.dataService.inviteprojectuser(createmember).subscribe(data =>  {this.datas = data.data  
   $("#error").show();
      setTimeout(function() { $("#error").hide(); }, 3000);   
    });
    $("#email").val('');
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
