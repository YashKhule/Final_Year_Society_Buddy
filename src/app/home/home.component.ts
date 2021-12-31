import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { BreakpointObserver } from '@angular/cdk/layout';
import {Router} from '@angular/router';
import { ApiserviceService } from '../services/apiservice.service';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  transactions:any;
  maintenanceaudit:any;
  rem_amount:number = 0;
  paid_amount:number = 0;

  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  dateToday: number = Date.now();
  constructor(private observer: BreakpointObserver,
    private route:Router,private apiService : ApiserviceService,private SpinnerService : NgxSpinnerService) { }

  ngOnInit(): void {
    this.getTotalRemainingAndPaidAmount();
    this.getAllTransactions();
  }
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
  addTransaction(){
    this.route.navigateByUrl('/addpayment');
  }

  getAllTransactions(){
    const res = this.apiService.getData('getalltransactions');
    res.subscribe(results => {
      this.transactions = results.reverse();
      console.log('all transactions are ',this.transactions);
      this.SpinnerService.hide();
    })
  }

  getTotalRemainingAndPaidAmount(){
    this.SpinnerService.show();
    const res = this.apiService.getData('getfullaudit');
    res.subscribe(results => {
      console.log("maintenance audit details are",results);
      this.maintenanceaudit = results;
      for(var i=0;i<this.maintenanceaudit.length;i++){
        this.rem_amount = this.rem_amount + this.maintenanceaudit[i]['rem_amount'];
        this.paid_amount = this.paid_amount + this.maintenanceaudit[i]['paid_amount'];
      }
    })
  }
}
