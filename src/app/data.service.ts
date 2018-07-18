import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';     
import { Observable } from 'rxjs/Observable';  
import 'rxjs/add/operator/map';  
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/catch';
import { Form } from './form';
@Injectable()

export class DataService {

  	constructor(private http: Http) { }
  	private headers = new Headers({'Content-Type': 'application/json'});

  	match(form : Form){     
    return this.http.post('api/Match/', JSON.stringify(form), {headers: this.headers}) 
           .map((response: Response) =>response.json())              
  	} 

  	login(form : Form){     
    return this.http.post('http://localhost:8080/api/login/', JSON.stringify(form), {headers: this.headers}) 
           .map((response: Response) =>response.json())              
  	}
  	singUp(form : Form){     
    return this.http.post('http://localhost:8080/api/singUp/', JSON.stringify(form), {headers: this.headers}) 
           .map((response: Response) =>response.json())              
    }

  	createnewproject(create : String){     
    return this.http.post('http://localhost:8080/api/createnewproject/', JSON.stringify(create), {headers: this.headers}) 
           .map((response: Response) =>response.json())           
  	} 

    createnewtasks(createtask : String){     
    return this.http.post('http://localhost:8080/api/createnewtasks/', JSON.stringify(createtask), {headers: this.headers}) 
           .map((response: Response) =>response.json())           
    }
  	GetAllProject(email : String){       
    return this.http.post('http://localhost:8080/api/GetAllProject/',{'email': email})  
           .map((response: Response) => response.json())              
  	} 
    GetAllInvitation(email : String){       
    return this.http.post('http://localhost:8080/api/GetAllInvitation/',{'email': email})  
           .map((response: Response) => response.json())              
    } 
    GetOneInvitation(email,projectid){       
    return this.http.post('http://localhost:8080/api/GetOneInvitation/',{'email': email,'projectid': projectid})  
           .map((response: Response) => response.json())              
    }
    Gettasks(projectid){  
     return this.http.post('http://localhost:8080/api/getbyprojectid/',{'projectid': projectid})  
            .map((response: Response) =>response.json())               
    }
    GetAssigntasks(projectid,user){  
     return this.http.post('http://localhost:8080/api/getbyassinedprojectid/',{'projectid': projectid, 'user': user})  
            .map((response: Response) =>response.json())               
    }
    GetAcceptdProject(email : String){       
    return this.http.post('http://localhost:8080/api/GetAcceptdProject/',{'email': email})  
           .map((response: Response) => response.json())              
    } 
    Setdescription(updatetask : String){     
    return this.http.post('http://localhost:8080/api/Setdescription/', JSON.stringify(updatetask), {headers: this.headers}) 
           .map((response: Response) =>response.json())           
    }
    inviteprojectuser(newuser : String){     
    return this.http.post('http://localhost:8080/api/inviteprojectuser/', JSON.stringify(newuser), {headers: this.headers}) 
           .map((response: Response) =>response.json())           
    } 
    createassignuser(assignuser : String){     
    return this.http.post('http://localhost:8080/api/createassignuser/', JSON.stringify(assignuser), {headers: this.headers}) 
           .map((response: Response) =>response.json())           
    }
    deleteAssignUser(taskid, userassigned, user, projectid){     
    return this.http.post('http://localhost:8080/api/deleteAssignUser/',{'taskid': taskid, 'userassigned':userassigned, 'user':user, 'projectid' : projectid})  
           .map((response: Response) =>response.json())           
    }
    GetassignUser(taskid,projectid){  
     return this.http.post('http://localhost:8080/api/getbytaskid/',{'taskid': taskid, 'projectid':projectid})  
            .map((response: Response) =>response.json())               
    }
    createcomment(comments : String){     
    return this.http.post('http://localhost:8080/api/createcomment/', JSON.stringify(comments), {headers: this.headers}) 
           .map((response: Response) =>response.json())           
    }
    getComments(taskid,projectid){  
     return this.http.post('http://localhost:8080/api/getComments/',{'taskid': taskid, 'projectid':projectid})  
            .map((response: Response) =>response.json())               
    }
    deleteComment(commentid){     
    return this.http.post('http://localhost:8080/api/deleteComment/',{'commentid': commentid})  
           .map((response: Response) =>response.json())           
    }
    updateComment(update ){   
     return this.http.post('http://localhost:8080/api/updateComment/', JSON.stringify(update), {headers: this.headers})   
            .map((response: Response) =>response.json())               
    }
    Getnotification(email){  
     return this.http.post('http://localhost:8080/api/Getnotification/',{'email': email})  
            .map((response: Response) =>response.json())               
    }
    acceptrequest(createmember){     
    return this.http.post('http://localhost:8080/api/acceptrequest/', JSON.stringify(createmember), {headers: this.headers})
           .map((response: Response) =>response.json())           
    }
    deleteProject(id){     
    return this.http.post('http://localhost:8080/api/deleteProject/',{'id': id})  
           .map((response: Response) =>response.json())           
    }
    updatproject(update){   
     return this.http.post('http://localhost:8080/api/updatproject/', JSON.stringify(update), {headers: this.headers})   
            .map((response: Response) =>response.json())               
    }
    GetTaskDescription(taskid){  
     return this.http.post('http://localhost:8080/api/getTaskDescription/',{'taskid': taskid})  
            .map((response: Response) =>response.json())               
    }
    Setnotification(id){  
     return this.http.post('http://localhost:8080/api/Setnotification/',{'id': id})  
            .map((response: Response) =>response.json())               
    }
    GetUnseenNotification(email){  
     return this.http.post('http://localhost:8080/api/GetUnseenNotification/',{'email': email})  
            .map((response: Response) =>response.json())               
    }
    deleteNotification(id){
      return this.http.post('http://localhost:8080/api/deleteNotification/',{'id': id})  
        .map((response: Response) =>response.json())
    }
/******/
/****/
/**/
/*
GetUsers(projectid){  
     return this.http.post('http://localhost:8080/api/GetUsers/',{'projectid': projectid}) 
            .map((response: Response) =>response.json())               
    }*/
    /*uploadimage(fd){  
    return this.httpclient.post('http://localhost:8080/api/uploadImage/', fd) 
           .map((response: Response) =>response.json()) 

    } */ 

    private handleError(error: any): Promise<any> {
    console.error('Error', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}

