import { Component,OnInit, OnChanges,Input, ViewEncapsulation } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { DataService } from '../data.service';
import { Router, ActivatedRoute, Params} from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import * as $ from 'jquery';
@Component({
  selector: 'app-slidbar',
  templateUrl: './slidbar.component.html',
  styleUrls: ['./slidbar.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class SlidbarComponent implements OnInit {
	selectedValue = [];
	selectedFile: File = null;
	datas;
	public show:boolean = false;
	url = '';
	email;
	user;
  constructor(public auth: AuthService,
  	private dataService: DataService,
  	private router: Router,
  	private cookieService: CookieService) { }

text: string = '';
openPopup: Function;

  setPopupAction(fn: any) {
    console.log(fn);
    this.openPopup = fn;
    console.log(this.openPopup);
  }

  ngOnInit() {
  	sessionStorage.setItem('headername', 'Profile');
  	this.email = this.cookieService.get('LoggedInUser');
  	this.dataService.getUserProfile(this.email).subscribe(data =>  this.user = data);
     /*$(document).ready(function(){
     	$("#mytext").emojioneArea({
     		pickerPosition: "right"
     	});
     }) */  
  }
	maintainanceTypeList = [
	    {maintenancetype: 'Steak'},
	    {maintenancetype: 'Pizza'},
	    {maintenancetype: 'Tacos'}
	];

	async change(isChecked: boolean, type){
	    if(isChecked){
	      await this.selectedValue.push(type);

	    }
	    else{
	     let updateItem = this.selectedValue.find(this.findIndexToUpdate, type.maintenancetype);

	     let index = this.selectedValue.indexOf(updateItem);

	     this.selectedValue.splice(index, 1);
	    }
	}

	findIndexToUpdate(type) { 
	    return type.maintenancetype === this;
	}

	onFileSelecet(event){
		if (event.target.files && event.target.files[0]) {
	      var reader = new FileReader();

	      reader.readAsDataURL(event.target.files[0]); 
	      reader.onload = (event:any) => { 
	        this.url = event.target.result;
	      }
	    }
	    $("#btss1").show();
	  	this.selectedFile = <File>event.target.files[0];
		if(!this.selectedFile.name){
			$("#btss1").hide();
			$(".img").show();
		}else{
			
			$("#btss1").show();
			$(".img").hide();
			$(".img2").show();
			$(".clssp").hide();
		}
	}	
	
	onUpload(): void{
	  	const fd = new FormData();
	  	fd.append('email', this.email);
	  	fd.append('image', this.selectedFile, this.selectedFile.name); 
	  	this.dataService.uploadimage(fd).subscribe(data =>  this.datas = data.data);
	  	$("#btss1").hide();
	  	$(".clssp").show();
	}

  	login(form){
    	form.checkedValue =this.selectedValue;
    	this.dataService.checkboxValue(form).subscribe(data =>  this.datas = data.data);
  	}
  	showtoggle() {
   		$(".hidediv").hide();
    	$(".showclstdiv").show();
  	}
    
	hidetoggle() {
		$(".hidediv").show();
		$(".showclstdiv").hide();
	}
	updatusername(form){
		this.dataService.updatusername(form).subscribe(data =>  this.datas = data.data);
		$(".hidediv").show();
		$(".showclstdiv").hide();
	}
}
