import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatCardModule} from '@angular/material/card';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import { MembersComponent } from './members/members.component';
import { SocietyexpenseComponent } from './societyexpense/societyexpense.component';
import { NoticesComponent } from './notices/notices.component';
import { RemindersComponent } from './reminders/reminders.component';
import {MatListModule} from '@angular/material/list';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import { AddmemberComponent } from './addmember/addmember.component';
import {MatSelectModule} from '@angular/material/select';
import {MatDialogModule} from "@angular/material/dialog";
import { MembersdetailsComponent } from './membersdetails/membersdetails.component';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { AddpaymentComponent } from './addpayment/addpayment.component';
import { AddsocietyexpensesComponent } from './addsocietyexpenses/addsocietyexpenses.component';
import { AddnoticeComponent } from './addnotice/addnotice.component';
import { AddreminderComponent } from './addreminder/addreminder.component';
import { MatTooltipModule } from '@angular/material/tooltip';

import { HttpClientModule } from '@angular/common/http';
import { LogoutComponent } from './logout/logout.component';

import { NgxSpinnerModule } from 'ngx-spinner';
import { MembermessagesComponent } from './membermessages/membermessages.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    MembersComponent,
    SocietyexpenseComponent,
    NoticesComponent,
    RemindersComponent,
    AddmemberComponent,
    MembersdetailsComponent,
    AddpaymentComponent,
    AddsocietyexpensesComponent,
    AddnoticeComponent,
    AddreminderComponent,
    LogoutComponent,
    MembermessagesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatListModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
    MatSelectModule,
    MatDialogModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatTooltipModule,
    HttpClientModule,
    NgxSpinnerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
