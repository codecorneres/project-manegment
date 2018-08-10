import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';  
import { HttpClient, HttpHeaders } from '@angular/common/http';   
import { Observable } from 'rxjs/Observable';  
import 'rxjs/add/operator/map';  
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/catch';
import { Form } from './form';
@Injectable()

export class DataService {

  	constructor(private http: Http, private httpclient: HttpClient) { }
  	private headers = new Headers({'Content-Type': 'application/json'});
    private httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
  	match(form : Form){     
    return this.http.post('http://localhost:8181/api/Match/', JSON.stringify(form), {headers: this.headers}) 
           .map((response: Response) =>response.json())              
  	} 

  	login(form : Form){     
    return this.http.post('http://localhost:8181/api/login/', JSON.stringify(form), {headers: this.headers}) 
           .map((response: Response) =>response.json())              
  	}
  	singUp(form : Form){     
    return this.http.post('http://localhost:8181/api/singUp/', JSON.stringify(form), {headers: this.headers}) 
           .map((response: Response) =>response.json())              
    }

  	createnewproject(create : String){     
    return this.http.post('http://localhost:8181/api/createnewproject/', JSON.stringify(create), {headers: this.headers}) 
           .map((response: Response) =>response.json())           
  	} 
    createnewtasks(createtask : String){     
    return this.http.post('http://localhost:8181/api/createnewtasks/', JSON.stringify(createtask), {headers: this.headers}) 
           .map((response: Response) =>response.json())           
    }
  	GetAllProject(email : String){       
    return this.http.post('http://localhost:8181/api/GetAllProject/',{'email': email})  
           .map((response: Response) => response.json())              
  	} 
    GetAllInvitation(email : String){       
    return this.http.post('http://localhost:8181/api/GetAllInvitation/',{'email': email})  
           .map((response: Response) => response.json())              
    } 
    GetOneInvitation(email,projectid){       
    return this.http.post('http://localhost:8181/api/GetOneInvitation/',{'email': email,'projectid': projectid})  
           .map((response: Response) => response.json())              
    }
    Gettasks(projectid){  
     return this.http.post('http://localhost:8181/api/getbyprojectid/',{'projectid': projectid})  
            .map((response: Response) =>response.json())               
    }
    Getdeactivetasks(projectid){  
     return this.http.post('http://localhost:8181/api/Getdeactivetasks/',{'projectid': projectid})  
            .map((response: Response) =>response.json())               
    }
    GetAlltasks(projectid){  
     return this.http.post('http://localhost:8181/api/GetAlltasks/',{'projectid': projectid})  
            .map((response: Response) =>response.json())               
    }
    GettaskUsers(projectid){  
     return this.http.post('http://localhost:8181/api/GettaskUsers/',{'projectid': projectid})  
            .map((response: Response) =>response.json())               
    }
    GetAssigntasks(projectid,user){  
     return this.http.post('http://localhost:8181/api/getbyassinedprojectid/',{'projectid': projectid, 'user': user})  
            .map((response: Response) =>response.json())               
    }
    GetAcceptdProject(email : String){       
    return this.http.post('http://localhost:8181/api/GetAcceptdProject/',{'email': email})  
           .map((response: Response) => response.json())              
    } 
    Setdescription(updatetask : String){     
    return this.http.post('http://localhost:8181/api/Setdescription/', JSON.stringify(updatetask), {headers: this.headers}) 
           .map((response: Response) =>response.json())           
    }
    inviteprojectuser(newuser : String){     
    return this.http.post('http://localhost:8181/api/inviteprojectuser/', JSON.stringify(newuser), {headers: this.headers}) 
           .map((response: Response) =>response.json())           
    } 
    createassignuser(assignuser : String){     
    return this.http.post('http://localhost:8181/api/createassignuser/', JSON.stringify(assignuser), {headers: this.headers}) 
           .map((response: Response) =>response.json())           
    }
    deleteAssignUser(taskid, userassigned, user, projectid, taskname){     
    return this.http.post('http://localhost:8181/api/deleteAssignUser/',{'taskid': taskid, 'userassigned':userassigned, 'user':user, 'projectid' : projectid, 'taskname': taskname})  
           .map((response: Response) =>response.json())           
    }
    GetassignUser(taskid,projectid){  
     return this.http.post('http://localhost:8181/api/getbytaskid/',{'taskid': taskid, 'projectid':projectid})  
            .map((response: Response) =>response.json())               
    }
    createcomment(comments : String){     
    return this.http.post('http://localhost:8181/api/createcomment/', JSON.stringify(comments), {headers: this.headers}) 
           .map((response: Response) =>response.json())           
    }
    getComments(taskid,projectid){  
     return this.http.post('http://localhost:8181/api/getComments/',{'taskid': taskid, 'projectid':projectid})  
            .map((response: Response) =>response.json())               
    }
    deleteComment(commentid){     
    return this.http.post('http://localhost:8181/api/deleteComment/',{'commentid': commentid})  
           .map((response: Response) =>response.json())           
    }
    updateComment(update ){   
     return this.http.post('http://localhost:8181/api/updateComment/', JSON.stringify(update), {headers: this.headers})   
            .map((response: Response) =>response.json())               
    }
    Getnotification(email){  
     return this.http.post('http://localhost:8181/api/Getnotification/',{'email': email})  
            .map((response: Response) =>response.json())               
    }
    acceptrequest(createmember){     
    return this.http.post('http://localhost:8181/api/acceptrequest/', JSON.stringify(createmember), {headers: this.headers})
           .map((response: Response) =>response.json())           
    }
    declinerequest(createmember){     
    return this.http.post('http://localhost:8181/api/declinerequest/',JSON.stringify(createmember), {headers: this.headers})  
           .map((response: Response) =>response.json())           
    }
    deleteProject(id){     
    return this.http.post('http://localhost:8181/api/deleteProject/',{'id': id})  
           .map((response: Response) =>response.json())           
    }
    updatproject(update){   
     return this.http.post('http://localhost:8181/api/updatproject/', JSON.stringify(update), {headers: this.headers})   
            .map((response: Response) =>response.json())               
    }
    GetTaskDescription(taskid){  
     return this.http.post('http://localhost:8181/api/getTaskDescription/',{'taskid': taskid})  
            .map((response: Response) =>response.json())               
    }
    Setnotification(id){  
     return this.http.post('http://localhost:8181/api/Setnotification/',{'id': id})  
            .map((response: Response) =>response.json())               
    }
    GetUnseenNotification(email){  
     return this.http.post('http://localhost:8181/api/GetUnseenNotification/',{'email': email})  
            .map((response: Response) =>response.json())               
    }
    deleteNotification(id){
      return this.http.post('http://localhost:8181/api/deleteNotification/',{'id': id})  
        .map((response: Response) =>response.json())
    }
    changepassword(form){  
     return this.http.post('http://localhost:8181/api/changepassword/', JSON.stringify(form), {headers: this.headers}) 
            .map((response: Response) =>response.json())               
    }
    resendpassword(form){  
     return this.http.post('http://localhost:8181/api/resendpassword/', JSON.stringify(form), {headers: this.headers}) 
            .map((response: Response) =>response.json())               
    }
    resetpassword(form){  
     return this.http.post('http://localhost:8181/api/resetpassword/', JSON.stringify(form), {headers: this.headers}) 
            .map((response: Response) =>response.json())               
    }
    getUserProfile(email){  
     return this.http.post('http://localhost:8181/api/getUserProfile/',{'email': email})  
            .map((response: Response) =>response.json())               
    }
    updatusername(update){   
     return this.http.post('http://localhost:8181/api/updatusername/', JSON.stringify(update), {headers: this.headers})   
            .map((response: Response) =>response.json())               
    }
    updateTask(update){   
     return this.http.post('http://localhost:8181/api/updateTask/', JSON.stringify(update), {headers: this.headers})   
            .map((response: Response) =>response.json())               
    }
    deleteTask(id){  
     return this.http.post('http://localhost:8181/api/deleteTask/', {'id': id})   
            .map((response: Response) =>response.json())               
    }
    uploadattachment(fd){  
        return this.httpclient.post('http://localhost:8181/api/uploadattachment/', fd, this.httpOptions)
    }
    sendDueDate(update){   
     return this.http.post('http://localhost:8181/api/sendDueDate/', JSON.stringify(update), {headers: this.headers})   
            .map((response: Response) =>response.json())               
    }
    removedate(id){   
     return this.http.post('http://localhost:8181/api/removedate/',{'id': id})    
            .map((response: Response) =>response.json())               
    }
    sendMove(update){   
     return this.http.post('http://localhost:8181/api/sendMove/', JSON.stringify(update), {headers: this.headers})   
            .map((response: Response) =>response.json())               
    }
    archive(id){   
     return this.http.post('http://localhost:8181/api/archive/',{'id': id})    
            .map((response: Response) =>response.json())               
    }
    activeArchive(id){   
     return this.http.post('http://localhost:8181/api/activeArchive/',{'id': id})    
            .map((response: Response) =>response.json())               
    }
    getAttachment(id){
        return this.http.post('http://localhost:8181/api/getAttachment/',{'id': id})  
            .map((response: Response) =>response.json())  
    }
    removeattachment(id){
        return this.http.post('http://localhost:8181/api/removeattachment/',{'id': id})  
            .map((response: Response) =>response.json())  
    }
/******/
/****/
/**/
/**/
checkboxValue(form){  
     return this.http.post('api/checkboxValue/', JSON.stringify(form), {headers: this.headers}) 
            .map((response: Response) =>response.json())               
    }
/*GetUsers(projectid){  
     return this.http.post('api/GetUsers/',{'projectid': projectid}) 
            .map((response: Response) =>response.json())               
    }*/
    uploadimage(fd) {  
        return this.httpclient.post('http://localhost:8181/api/uploadImage/', fd)
    }                                                                                                                                                                                                                                                                                                                                                       

    private handleError(error: any): Promise<any> {
    console.error('Error', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}

