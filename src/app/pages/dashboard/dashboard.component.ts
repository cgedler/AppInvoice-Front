import { Component, OnDestroy, OnInit } from '@angular/core';
import { LoginService } from '../../auth/login/login.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  
  userLoginOn:boolean=false;

  username:String="";

  constructor(private loginService:LoginService) { }

  ngOnInit(): void {
    this.loginService.currentUserLoginOn.subscribe({
      next:(userLoginOn: boolean) => {
        this.userLoginOn=userLoginOn;
      }
    });

    this.username = this.loginService.currentUserName;

  }
}
