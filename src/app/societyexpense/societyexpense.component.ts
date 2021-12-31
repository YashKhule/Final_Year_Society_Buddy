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
  reason: any;
  paymentType: string;
  amount:any;
  dateToday:any;

}
const ELEMENT_DATA: PeriodicElement[] = [
  {name:'Rakesh',     reason:'Electrical work',   paymentType: 'UPI',     amount:2500,  dateToday:'' },
  {name:'Yashodeep',  reason:'Pipeline',          paymentType: 'Cash',    amount:500,   dateToday:'' },
  {name:'Vyankatesh', reason:'Electrical work',   paymentType: 'Chaque',  amount:2500,  dateToday:'' },
  {name:'Ramesh',     reason:'Pipeline',          paymentType: 'Cash',    amount:500,   dateToday:'' },
  {name:'Hrugved',    reason:'Electrical work',   paymentType: 'UPI',     amount:2500,  dateToday:'' },
  {name:'Yash',       reason:'Pipeline',          paymentType: 'Cash',    amount:500,   dateToday:'' },
  {name:'Aditya',     reason:'Electrical work',   paymentType: 'UPI',     amount:2500,  dateToday:'' },
  {name:'Omkar',      reason:'Water Tanker',      paymentType: 'Chaque',  amount:1500,  dateToday:'' },
  {name:'Pravin',     reason:'Electrical work',   paymentType: 'UPI',     amount:2500,  dateToday:'' },
  {name:'MSEB',       reason:'Electricity Bill',  paymentType: 'Chaque',  amount:4500,  dateToday:'' },
]
@Component({
  selector: 'app-societyexpense',
  templateUrl: './societyexpense.component.html',
  styleUrls: ['./societyexpense.component.css']
})
export class SocietyexpenseComponent implements OnInit {
  expenses:any;
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

  displayedColumns: string[] = [ 'name','reason','paymentType', 'amount', 'dateToday' ];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  @ViewChild(MatSort) sort: MatSort;

  ngOnInit() {
    this.getAllExpenses();
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getAllExpenses(){
    this.SpinnerService.show();
    const res = this.apiService.getData('getallexpenses');
    res.subscribe(results => {
      this.expenses = results.reverse();
      this.SpinnerService.hide();
      console.log("expenses are",this.expenses);
    })
  }
}
