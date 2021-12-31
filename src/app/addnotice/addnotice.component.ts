import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ApiserviceService } from '../services/apiservice.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-addnotice',
  templateUrl: './addnotice.component.html',
  styleUrls: ['./addnotice.component.css']
})
export class AddnoticeComponent implements OnInit {
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
     myForm() {
      this.requiredForm = this.fb.group({
        noticeDate: ['', Validators.required],
        notice_subject:['',Validators.required],
        notice_body: ['', Validators.required],
      });
   }
  cancel(){
    this.route.navigateByUrl('/notices');
  }

  sendNotice(){
    if(this.requiredForm.get('notice_subject').value == '' || this.requiredForm.get('noticeDate').value == '' || this.requiredForm.get('notice_body').value == ''){
      alert("Please Fill All The Fields");
    }else{
      this.SpinnerService.show();
      const data =  {
        "notice_subject": this.requiredForm.get('notice_subject').value,
        "notice_body": this.requiredForm.get('notice_body').value,
        "notice_date": this.requiredForm.get('noticeDate').value
      }
      console.log("in send notice with notice",data);
  
      const res = this.apiService.postData("sendnotice",JSON.stringify(data));
      res.subscribe(results => {
        console.log("notice added",results);
        this.SpinnerService.hide();
        alert("Notice Send Successfully !!");
      },err => {
        this.SpinnerService.hide();
        alert("Currently cannot send notice");
      })
    }
    
  }

}
