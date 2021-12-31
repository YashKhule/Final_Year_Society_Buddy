import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit ,ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { ApiserviceService } from '../services/apiservice.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import {  NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-membermessages',
  templateUrl: './membermessages.component.html',
  styleUrls: ['./membermessages.component.css']
})
export class MembermessagesComponent implements OnInit {

  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  messages:any;
  
  member_name:any;
  subject:any;
  message:any;
  reply:any;
  messageid:any

  loadingmsg:any;

  requiredForm: FormGroup;
  constructor(private observer: BreakpointObserver,private apiService : ApiserviceService,private fb: FormBuilder,private SpinnerService : NgxSpinnerService) { 
    this.myForm();
  }

  ngOnInit(): void {
    this.getAllMessages();
  }

  myForm() {
    this.requiredForm = this.fb.group({
      memberName: ['', Validators.required],
      subject: ['', Validators.required],
      message: ['', Validators.required],
      reply: ['', Validators.required],
     
    });
 }

  displayedColumns: string[] = [ 'Date','From','Subject', 'Message' ];
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

  getAllMessages(){
    this.loadingmsg = "Fetching All Messages";
    this.SpinnerService.show();
    const res = this.apiService.getData('getallmessages');
    res.subscribe(results =>{
      console.log(results);
      this.messages = results;
      this.messages.sort(function(a,b){
        return b.message_id - a.message_id;
      });
      console.log("sorted",this.messages);
      this.SpinnerService.hide();
    })
  }

  openMessage(i){
    console.log("in open message with index",i);
    this.member_name = this.messages[i]['membername']
    this.subject = this.messages[i]['message_subject']
    this.message = this.messages[i]['message_body']
    this.reply = this.messages[i]['message_reply']
    this.messageid = this.messages[i]['message_id']
    if(this.reply == "not replied"){
      this.reply = ''
    }else{
      this.reply = this.messages[i]['message_reply']
    }
    this.requiredForm.controls['memberName'].setValue(this.member_name);
    this.requiredForm.controls['subject'].setValue(this.subject);
    this.requiredForm.controls['message'].setValue(this.message);
    this.requiredForm.controls['reply'].setValue(this.reply);
  }

  sendReply(){
    this.loadingmsg = "Sending Reply To "+this.requiredForm.get('memberName').value;
    this.SpinnerService.show();
    const data = {
      "message_id": this.messageid,
      "message_reply": this.requiredForm.get('reply').value
    }
    const res = this.apiService.putData('sendreply',JSON.stringify(data));
    res.subscribe(results => {
      console.log("reply send");
      this.getAllMessages();
      this.requiredForm.controls['memberName'].setValue('');
    this.requiredForm.controls['subject'].setValue('');
    this.requiredForm.controls['message'].setValue('');
    this.requiredForm.controls['reply'].setValue('');
    this.SpinnerService.hide();
    })
  }

}
