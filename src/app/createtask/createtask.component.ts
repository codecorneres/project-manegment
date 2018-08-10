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
    private cookieService: CookieService) {   
}

  datas;
  datass;
  users;
  taskuser;
  attach;
  ngOnInit() {
     sessionStorage.setItem('headername', 'Create Task');

  	this.projectname = sessionStorage.getItem("projectname");
    this.projectid = sessionStorage.getItem("projectid");
   // this.user = sessionStorage.getItem("LoggedInUser");
   this.user = this.cookieService.get('LoggedInUser');
    this.createtasks = sessionStorage.getItem("createtask");
      this.Gettasks(this.projectid); 
      this.GettaskUsers(this.projectid);
      this.time = "12:00"
      /*$(document).ready(function(){
        downloadFile(data: Response){
          var blob = new Blob([data], { type: 'text/csv' });
          var url= window.URL.createObjectURL(blob);
          window.open(url);
        }
      })*/      
  }
  clickimageupload(){
     $(".FileUpload2").click();
     $(".FileUpload2").change(function () {
             
        var fileName = $(this).val().split('\\')[$(this).val().split('\\').length - 1];
        //$(".spnFilePath2").html("<a href=assets/images/fileUpload/"+fileName+ ">"+fileName +"</a>");
      });
  }
  onFileSelecet(event,id){
    this.selectedFile = <File>event.target.files[0];
    const fd = new FormData();
    fd.append('id', id);
    fd.append('file', this.selectedFile, this.selectedFile.name); 
      this.dataService.uploadattachment(fd).subscribe(respponse => {this.getAttachment(id)});  
  }
  deactive(){
    this.dataService.Getdeactivetasks(this.projectid).subscribe(form => {this.form = form});
    $(".addtsk").hide();
  }
  active(){
    this.Gettasks(this.projectid); 
    $(".addtsk").show();;
  }
  all(){
    this.dataService.GetAlltasks(this.projectid).subscribe(form => {this.form = form});
    $(".addtsk").show();
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
  /*--for due date*/
  showduedate() {
    this.duedate = !this.duedate;
  }
showmove(){
  this.moves = !this.moves;
}
  showDescriptionDiv(){
    $(".divd").show();
    $(".divs").hide();
  }
  /*---*/
  showtasktoggle(arr) {
    $(".hidetaskdiv"+ arr).hide();
    $(".showtaskdiv"+ arr).show();
  }

  confirmtaskdelete(id){
    $("#"+ id).show();
  }
  notaskdelete(id){
    $("#"+ id).hide();

  } 
  hidetasktoggle(arr) {
    $(".hidetaskdiv"+ arr).show();
    $(".showtaskdiv"+ arr).hide();
  }
  
  Gettasks(projectid){
  	this.dataService.Gettasks(projectid).subscribe(form => {this.form = form});
  }
  GettaskUsers(projectid){
    this.dataService.GettaskUsers(projectid).subscribe(form => {this.taskuser = form});
  }
  getAttachment(id){
    this.dataService.getAttachment(id).subscribe(data =>this.attach = data);
  }
  removeattachment(id,taskid){
    this.dataService.removeattachment(id).subscribe(data =>{this.getAttachment(taskid)});
  }
  GetassignUser(taskid){
   this.getcomments(taskid);
   this.getAttachment(taskid);
    this.dataService.GetassignUser(taskid,this.projectid).subscribe(data =>this.asign = data);
  }
  createtask(createtasks){
  	this.dataService.createnewtasks(createtasks).subscribe(data => {this.datass = data.data
      createtasks.task == '';
  		this.Gettasks(this.projectid);  
  	});
  }
  Setdescription(updatetask){
  	this.dataService.Setdescription(updatetask).subscribe(data =>{
      $(".divd").hide();
      $(".divs").show();
    });
  }

  createassignuser(ind,assignuser){
    assignuser.user = this.user;
    assignuser.shortname = assignuser.assignuser.substring(0, 1);
    assignuser.shortname = assignuser.shortname.toUpperCase();
    this.dataService.createassignuser(assignuser).subscribe(data => {
    this.GetassignUser(assignuser.projecttaskid);
    $("#hidemodaltemp"+ ind).click();
    this.GettaskUsers(this.projectid);
    });
  }
  deleteUser(userassigned,taskid,taskname,ind){
    this.dataService.deleteAssignUser(taskid,userassigned, this.user,  this.projectid, taskname).subscribe(data => {
      this.GetassignUser(taskid);
      $("#hidemodaltemp"+ ind).click();
      this.GettaskUsers(this.projectid);
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
  /*---*/
 updateTask(form){
    this.dataService.updateTask(form).subscribe(data =>  {this.Gettasks(this.projectid)});
  }
  /*--for duedate and move--*/
  sendDueDate(updatetask){
    this.dataService.sendDueDate(updatetask).subscribe(data => this.datas = data)
    $(".demoshow").show();
    $(".demoshow").html("<label for='duedate' class='control-label'><i class='fa fa-clock-o' aria-hidden='true'></i> Due Date:</label><p>"+ updatetask.date +"at "+updatetask.time+"</p>");
    $(".databaseshow").hide();
  }
  removedate(id){
   this.date = "";
    this.dataService.removedate(id,this.date).subscribe(data => this.datas = data);
    $(".databaseshow").hide();
    $(".demoshow").hide();
  }
  sendmove(ind,form){
    this.dataService.sendMove(form).subscribe(data => { this.Gettasks(this.projectid); });
    $("#hidemodaltemp"+ ind).click();
  }
  archive(ind,id){
    $("#hidemodaltemp"+ ind).click();
    this.dataService.archive(id).subscribe(data => { this.Gettasks(this.projectid) });
  }
  activearchive(ind,id){
    $("#hidemodaltemp"+ ind).click();
    $(".addtsk").show();
    this.dataService.activeArchive(id).subscribe(data => { this.Gettasks(this.projectid) });
  }
   confirmdeletetask(id){
    $("#"+ id).show();
  }
  nodeletetask(id){
    $("#"+ id).hide();

  } 
  deletetask(ind,id){
    this.dataService.deleteTask(id).subscribe(data =>  {this.Gettasks(this.projectid)});
    $("#hidemodaltemp"+ ind).click();
    $(".addtsk").show();

  }
}
