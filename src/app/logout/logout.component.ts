import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiserviceService } from '../services/apiservice.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(
    private apiService : ApiserviceService,
    private router : Router
  ) { }

  ngOnInit(): void {
    this.logout();
  }

  logout(){
    const data = {
      "session_id":localStorage.getItem('sessionid'),
      "adminid":localStorage.getItem('adminid'),
      "date_in":localStorage.getItem('datein'),
      "time_in":localStorage.getItem('timein')
  }
  const res = this.apiService.postData('endsession',JSON.stringify(data));
  res.subscribe(results => {
    console.log("logout done",results);
    localStorage.clear();
    this.router.navigateByUrl('');
  },err =>{
    alert("Currently Cannot Logout");
  })
  
  }

}
