import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ApiserviceService } from '../services/apiservice.service';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-addpayment',
  templateUrl: './addpayment.component.html',
  styleUrls: ['./addpayment.component.css']
})
export class AddpaymentComponent implements OnInit {

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

  addExpenses(){
    this.route.navigateByUrl('/addsocietyexpenses')
  }
     myForm() {
      this.requiredForm = this.fb.group({
        ownername: ['', Validators.required],
        houseno: ['', Validators.required],
        month: ['', Validators.required],
        paymentType: ['', Validators.required ],
        date: ['', Validators.required],
        amountpaid:['',Validators.required]
      });
   }
   addTransaction(){
     const data = {
      "owner_name": this.requiredForm.get('ownername').value,
      "house_no": this.requiredForm.get('houseno').value,
      "payment_type": this.requiredForm.get('paymentType').value,
      "payment_date": this.requiredForm.get('date').value,
      "payment_for_month": this.requiredForm.get('month').value,
      "amount_paid":this.requiredForm.get('amountpaid').value
      }
      if(this.requiredForm.get('ownername').value == '' || this.requiredForm.get('houseno').value == '' || this.requiredForm.get('paymentType').value == '' || this.requiredForm.get('date').value == '' || this.requiredForm.get('month').value == '' || this.requiredForm.get('amountpaid').value == ''){
        alert('Please Fill All The Fields');
      }else{
        this.SpinnerService.show();
        const res = this.apiService.postData('addmaintenance',JSON.stringify(data));
      res.subscribe(results => {
        console.log("maintenance recorded",results);
        this.SpinnerService.hide();
        alert("Maintenance Payment Recorded !!");
      },err => {
        this.SpinnerService.hide();
        console.log("error",err);
        alert("Cannot record payment ");
      })
      }
      
   }
  cancel(){
    this.route.navigateByUrl('/home');
  }

  savePayment() {
    console.warn(this.requiredForm.value);
    alert('Payment Added Successfully');
    this.route.navigateByUrl('/home');
  }

}
