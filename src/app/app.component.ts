import { Component} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'DesktopApp';
  constructor(private router : Router){
    this.login();
  }
  login(){
    if(localStorage.getItem("sessionid") == '' || localStorage.getItem("sessionid") == null){
      this.router.navigateByUrl('');
    }else{
      this.router.navigateByUrl('home');
    }
  }
}
