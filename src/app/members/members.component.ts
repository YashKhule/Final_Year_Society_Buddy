import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { BreakpointObserver } from '@angular/cdk/layout';
import {Router} from '@angular/router';
import { ApiserviceService } from '../services/apiservice.service';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css']
})
export class MembersComponent implements OnInit {
  members:any;
dateToday:number=Date.now();
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  constructor(private observer: BreakpointObserver,
    private route:Router,private apiService : ApiserviceService,private SpinnerService : NgxSpinnerService) { }

  ngOnInit(): void {
    this.getAllMembers();
  }
  ngAfterViewInit() {
    this.observer.observe(['(max-width: 800px)']).subscribe((res) => {
      if (res.matches) {
        this.sidenav.mode = 'over';
        this.sidenav.close();
      } else {
        this.sidenav.mode = 'side';
        this.sidenav.open();
      }
    });
  }
  

  logout(){
    this.route.navigateByUrl('/login');
  }
  addMember(){
    this.route.navigateByUrl('/addmember');
  }
  memberDetails(id,unit){
    console.log(id,unit);
    //this.route.navigateByUrl('/membersdetails');
    this.route.navigate(["/membersdetails",id,unit]);
  }
  getAllMembers(){
    this.SpinnerService.show();
    const res = this.apiService.getData('getallmembers');
    res.subscribe(results => {
      this.members = results;
      this.SpinnerService.hide();
      console.log("members are",results);
    })
  }
}
