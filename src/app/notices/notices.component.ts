import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { BreakpointObserver } from '@angular/cdk/layout';
import {Router} from '@angular/router';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ApiserviceService } from '../services/apiservice.service';
import { NgxSpinnerService } from 'ngx-spinner';

export interface PeriodicElement {
  notice: any;
  dateToday:any;

}
const ELEMENT_DATA: PeriodicElement[] = [
  {notice:'There is Meeting Today in the Evening at 7:00PM sharp, All are requested to be present',   dateToday:'' },
  {notice:'There is Meeting Today in the Evening at 7:00PM sharp, All are requested to be present',   dateToday:'' },
  {notice:'There is Meeting Today in the Evening at 7:00PM sharp, All are requested to be present',   dateToday:'' },
  {notice:'There is Meeting Today in the Evening at 7:00PM sharp, All are requested to be present',   dateToday:'' },
  {notice:'There is Meeting Today in the Evening at 7:00PM sharp, All are requested to be present',   dateToday:'' },
  {notice:'There is Meeting Today in the Evening at 7:00PM sharp, All are requested to be present',   dateToday:'' },
  {notice:'There is Meeting Today in the Evening at 7:00PM sharp, All are requested to be present',   dateToday:'' },
  {notice:'There is Meeting Today in the Evening at 7:00PM sharp, All are requested to be present',   dateToday:'' },
  {notice:'There is Meeting Today in the Evening at 7:00PM sharp, All are requested to be present',   dateToday:'' },
  {notice:'There is Meeting Today in the Evening at 7:00PM sharp, All are requested to be present',   dateToday:'' },
]
@Component({
  selector: 'app-notices',
  templateUrl: './notices.component.html',
  styleUrls: ['./notices.component.css']
})
export class NoticesComponent implements OnInit {
  dateToday:any=Date.now()
  notices:any;
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

  displayedColumns: string[] = [ 'dateToday','noticesubject','notice' ];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  @ViewChild(MatSort) sort: MatSort;

  ngOnInit() {
    this.getAllNotices();
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  addNotice(){
    this.route.navigateByUrl('/addnotice');
  }
  getAllNotices(){
    this.SpinnerService.show();
    const res = this.apiService.getData('/getnotice');
    res.subscribe(results => {
      console.log("notices are",results);
      this.notices = results.reverse();
      this.SpinnerService.hide();
    })
  }
}
