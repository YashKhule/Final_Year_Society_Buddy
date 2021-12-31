import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { BreakpointObserver } from '@angular/cdk/layout';
import {Router} from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ApiserviceService } from '../services/apiservice.service'
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-addmember',
  templateUrl: './addmember.component.html',
  styleUrls: ['./addmember.component.css']
})
export class AddmemberComponent implements OnInit {
  name:any;
  email:any;
  mobile:any;
  housenumber:number;
  rdate:any;
  ownership:number;
  prev_owner_name:any;
  rmember:any;
  scertf:any;
  unit:any;
  rentname:any
  rentmobile:any;
  rcopysub:any;
  nominee:any;
  land712:any;
  mtax:any;
  ownername:any;
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  requiredForm: FormGroup;
  constructor(private observer: BreakpointObserver,
    private route: Router, private fb: FormBuilder,private apiService : ApiserviceService,private SpinnerService : NgxSpinnerService) {
     this.myForm();
    }

  ngOnInit(): void {
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

     myForm() {
      this.requiredForm = this.fb.group({
        name: ['', Validators.required],
        email: ['', Validators.required],
        mobile: ['', Validators.required ],
        house: ['', Validators.required],
        date: ['', Validators.required],
        ownership: ['', Validators.required],
        authorized: ['', Validators.required ],
        sharecertificate: ['', Validators.required ],
        unit: ['', Validators.required ],
        registrycopy: ['', Validators.required ],
        nominee: ['', Validators.required ],
        endrose: ['', Validators.required ],
        municipaltax: ['', Validators.required ],
        firstowner:['',Validators.required],
        rname:['',Validators.required],
        rmobile:['',Validators.required],
      });
   }

   addMember(){
     if(this.requiredForm.get('name').value == '' || this.requiredForm.get('email').value == '' || this.requiredForm.get('mobile').value == '' || this.requiredForm.get('house').value == '' || this.requiredForm.get('date').value == '' || this.requiredForm.get('ownership').value == '' || this.requiredForm.get('authorized').value == '' || this.requiredForm.get('sharecertificate').value == '' || this.requiredForm.get('unit').value == '' || this.requiredForm.get('registrycopy').value == '' ||this.requiredForm.get('nominee').value == '' || this.requiredForm.get('endrose').value == '' || this.requiredForm.get('municipaltax').value == '' ){
      alert("Please Fill Required Fields");
     }else{
       this.ownername = this.requiredForm.get('name').value;
       this.SpinnerService.show();
      this.housenumber = this.requiredForm.get('house').value;
    this.ownership = this.requiredForm.get('ownership').value;
    const data = {
      "member_name": this.requiredForm.get('name').value,
      "member_email": this.requiredForm.get('email').value,
      "member_mobile": this.requiredForm.get('mobile').value,
      "member_unit_number": this.housenumber,
      "unit_registry_date": this.requiredForm.get('date').value,
      "ownership_rank": this.ownership,
      "first_owner_name":this.requiredForm.get('firstowner').value,
      "registered_member":this.requiredForm.get('authorized').value,
      "received_share_certificate": this.requiredForm.get('sharecertificate').value,
      "unit_occupied_by": this.requiredForm.get('unit').value,
      "rented_person_name": this.requiredForm.get('rname').value,
      "rented_person_mobile": this.requiredForm.get('rmobile').value,
      "registry_copy_submitted": this.requiredForm.get('registrycopy').value,
      "nominee_details_submitted": this.requiredForm.get('nominee').value,
      "registered_on_7_12": this.requiredForm.get('endrose').value,
      "muncipal_tax_paid": this.requiredForm.get('municipaltax').value,
      
  }
  console.log(JSON.stringify(data));
  const res = this.apiService.postData('addmember',JSON.stringify(data));
  res.subscribe(result => {
    console.log(result);
    this.SpinnerService.hide();
    alert("Member Added Successfully !!");
  },err => {
    alert("Currently Cannot Add Member");
  })
     }
    
  }

  logout(){
    this.route.navigateByUrl('/login');
  }

  saveMember() {
    console.warn(this.requiredForm.value);
    alert('Member Added Successfully');
    this.route.navigateByUrl('/members');
  }

  cancel(){
    this.route.navigateByUrl('/members');
  }

  
 
}
