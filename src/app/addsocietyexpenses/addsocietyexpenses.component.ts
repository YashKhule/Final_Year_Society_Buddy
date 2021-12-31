import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ApiserviceService } from '../services/apiservice.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-addsocietyexpenses',
  templateUrl: './addsocietyexpenses.component.html',
  styleUrls: ['./addsocietyexpenses.component.css']
})
export class AddsocietyexpensesComponent implements OnInit {

  ngOnInit(): void {
  }
  dateToday:any=Date.now()
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  requiredForm: FormGroup;
  constructor(private observer: BreakpointObserver,
    private route: Router, private fb: FormBuilder,private apiService : ApiserviceService,private SpinnerService : NgxSpinnerService) {
     this.myForm();
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
  addExpense(){
    if(this.requiredForm.get('dealername').value == '' || this.requiredForm.get('amount').value == '' || this.requiredForm.get('paymentType').value == '' || this.requiredForm.get('paymentDate').value == '' || this.requiredForm.get('reason').value == ''){
      alert("Please Fill All The Fields");
    }else{
      this.SpinnerService.show();
      var amount : number = this.requiredForm.get('amount').value;
    
    const data ={
        
      "dealer_name": this.requiredForm.get('dealername').value,
      "amount": amount,
      "payment_type": this.requiredForm.get('paymentType').value,
      "payment_date": this.requiredForm.get('paymentDate').value,
      "payment_reason": this.requiredForm.get('reason').value
      }
      console.log(JSON.stringify(data));
      const res = this.apiService.postData('addexpense',JSON.stringify(data));
      res.subscribe(results => {
        console.log("expense added",results);
        this.SpinnerService.hide();
        alert("Expense Recorded SuccessFully");
      },err => {
        this.SpinnerService.hide();
        alert("Currently Cannot Record Expense");
      })
    }
    
      
  }

  addPayment(){
    this.route.navigateByUrl('/addpayment')
  }

     myForm() {
      this.requiredForm = this.fb.group({
        dealername: ['', Validators.required],
        amount: ['', Validators.required],
        reason: ['', Validators.required],
        paymentType: ['', Validators.required],
        paymentDate: ['', Validators.required ],
      });
   }
  cancel(){
    this.route.navigateByUrl('/home');
  }

  saveExpenses() {
    console.warn(this.requiredForm.value);
    alert('Society Expenses Added Successfully');
    this.route.navigateByUrl('/home');
  }
}
