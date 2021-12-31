import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { BreakpointObserver } from '@angular/cdk/layout';
import {Router} from '@angular/router';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ApiserviceService } from '../services/apiservice.service';
import { NgxSpinnerService } from 'ngx-spinner';
export interface PeriodicElement {
  name:string;
  flatNo: any;
  pendingAmount: string;
  reminderIcon:any;
  
}
const ELEMENT_DATA: PeriodicElement[] = [
  {name:'Rakesh',     flatNo:'21',   pendingAmount: '2500',   reminderIcon:'' },
  {name:'Yashodeep',  flatNo:'17',   pendingAmount: '3000',   reminderIcon:'' },
  {name:'Vyankatesh', flatNo:'21',   pendingAmount: '1500',   reminderIcon:'' },
  {name:'Ramesh',     flatNo:'17',   pendingAmount: '3000',   reminderIcon:'' },
  {name:'Hrugved',    flatNo:'21',   pendingAmount: '2500',   reminderIcon:'' },
  {name:'Yash',       flatNo:'17',   pendingAmount: '3000',   reminderIcon:'' },
  {name:'Aditya',     flatNo:'21',   pendingAmount: '2500',   reminderIcon:'' },
  {name:'Omkar',      flatNo:'5',    pendingAmount: '1500',   reminderIcon:'' },
  {name:'Pravin',     flatNo:'21',   pendingAmount: '2500',   reminderIcon:'' },
  {name:'MSEB',       flatNo:'2',    pendingAmount: '1500',   reminderIcon:'' },
]
@Component({
  selector: 'app-reminders',
  templateUrl: './reminders.component.html',
  styleUrls: ['./reminders.component.css']
})
export class RemindersComponent implements OnInit {
  loadermsg:any="Fetching Audit Details";
  auditlist:any;
  dateToday:any=Date.now()
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  constructor(private observer: BreakpointObserver,
    private route:Router,private apiService : ApiserviceService,private SpinnerService : NgxSpinnerService) { }

  ngAfterViewInit() {
    this.observer.observe(['(max-width: 768px)']).subscribe((res) => {
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

  displayedColumns: string[] = [ 'name','flatNo','pendingAmount', 'reminderIcon' ];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  @ViewChild(MatSort) sort: MatSort;

  ngOnInit() {
    this.getFullMaintenanceAudit();
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getFullMaintenanceAudit(){
    this.SpinnerService.show();
    const res = this.apiService.getData('getfullaudit');
    res.subscribe(results => {
      this.auditlist = results;
      console.log("full audit report is ",results);
      this.SpinnerService.hide();
    })
  }

  sendReminder(oname,amt,id){
    this.loadermsg = "Sending Reminder to "+oname;
    this.SpinnerService.show();
    console.log("in send reminder");
    const data = {
      "member_id": id,
      "member_name": oname,
      "reminder_message": "Please pay your remaining due of Rs."+amt
    }
    console.log(JSON.stringify(data));

    const res = this.apiService.postData('sendreminder',JSON.stringify(data));
    res.subscribe(results => {
      console.log("reminder send",results);
      this.SpinnerService.hide();
      alert("Reminder Send Successfully to "+oname);
    },err => {
      this.SpinnerService.hide();
      alert("Cannot Send Reminder");
    })

  }

  emptyReminder(){
    alert("Cannot Send Reminder As Pending Amount is ZERO")
  }

}
