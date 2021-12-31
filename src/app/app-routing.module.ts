import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddmemberComponent } from './addmember/addmember.component';
import { AddnoticeComponent } from './addnotice/addnotice.component';
import { AddpaymentComponent } from './addpayment/addpayment.component';
import { AddreminderComponent } from './addreminder/addreminder.component';
import { AddsocietyexpensesComponent } from './addsocietyexpenses/addsocietyexpenses.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { MembermessagesComponent } from './membermessages/membermessages.component';
import { MembersComponent } from './members/members.component';
import { MembersdetailsComponent } from './membersdetails/membersdetails.component';
import { NoticesComponent } from './notices/notices.component';
import { RemindersComponent } from './reminders/reminders.component';
import { SocietyexpenseComponent } from './societyexpense/societyexpense.component';


const routes: Routes = [
  {path:'login', component:LoginComponent},
  {path:'home', component:HomeComponent},
  {path:'members', component:MembersComponent},
  {path:'societyexpense',component:SocietyexpenseComponent},
  {path:'notices', component:NoticesComponent},
  {path:'reminders',component:RemindersComponent},
  {path:'addmember',component:AddmemberComponent},
  {path:'membersdetails/:id/:id1', component:MembersdetailsComponent},
  {path:'addpayment',component:AddpaymentComponent},
  {path:'addsocietyexpenses', component:AddsocietyexpensesComponent},
  {path:'addnotice', component:AddnoticeComponent},
  {path:'addreminder',component:AddreminderComponent},
  {path:'logout',component:LogoutComponent},
  {path:'membermessage',component:MembermessagesComponent},
  {path:'',redirectTo:'/login',pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
