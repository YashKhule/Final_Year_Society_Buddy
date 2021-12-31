import { Component, OnInit, ElementRef } from '@angular/core';
import {Router} from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiserviceService } from '../services/apiservice.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  adminid:any;
  loadingmsg:any;
  constructor(private elementRef: ElementRef,
    private route:Router,private apiService : ApiserviceService,private SpinnerService : NgxSpinnerService
   ) { 

    }

  ngOnInit(): void {
  }
  ngAfterViewInit(){
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundImage = 'url("../../assets/bg-login.png")';
 }
 login(){
   this.loadingmsg = "Logging In ..."
   var username = document.getElementsByTagName('input')[0].value;
   var pass = document.getElementsByTagName('input')[1].value;
   if(username == '' || pass == ''){
    alert('Please Fill All The Fields')
   }else{
     this.SpinnerService.show();
    const data = {
      "username":username
     }
    
     const res = this.apiService.postData('adminlogin',JSON.stringify(data));
     res.subscribe(results => {
       console.log(results);
       if(results[0]['password'] == pass){
         console.log("Login Success");
         this.adminid = results[0]['adminid'];
         this.loginSession();
       }else{
         alert('Please Check Username and Password !')
       }
     })
   }
   
   //
 }

 loginSession(){
   this.loadingmsg = "Starting Session"
   const data = {
    "adminid":this.adminid
   }
   console.log("in session begin");
   const res = this.apiService.postData('startsession',JSON.stringify(data));
   res.subscribe(results => {
     console.log("session started",results);
     localStorage.setItem('sessionid',results['session_id']);
     localStorage.setItem('adminid',results['adminid']);
     localStorage.setItem('datein',results['date_in']);
     localStorage.setItem('timein',results['time_in']);
     this.SpinnerService.hide();
     this.route.navigateByUrl('/home');
   })
 }

}
