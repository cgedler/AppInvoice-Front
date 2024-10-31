import { Component, OnDestroy, OnInit } from '@angular/core';
import { LoginService } from '../../auth/login/login.service';
import Chart from 'chart.js/auto';
import { ShoppingByYearDTO } from './shoppingByYearDTO';
import { DashboardService } from './dashboard.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { response } from 'express';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  
  userLoginOn:boolean=false;
  username:String="";
  chart: any = [];
  shoppingData: ShoppingByYearDTO = new ShoppingByYearDTO();
 

  constructor(
    private loginService:LoginService,
    private dashboardService:DashboardService) { }

  ngOnInit(): void {
    this.loginService.currentUserLoginOn.subscribe({
      next:(userLoginOn: boolean) => {
        this.userLoginOn=userLoginOn;
      }
    });

    this.dashboardService.getDataByYear(2021).subscribe(
      data => { this.shoppingData = (data); }
    );
    
    

    console.log(this.shoppingData);


    this.chart = new Chart('ctx', {
      type: 'bar',
      data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        datasets: [
          {
            label: '# of Votes',
            data: [4, 19.5, 3, 5, 2, 3, 4, 1, 7, 8, 9, 12],
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });

    this.username = this.loginService.currentUserName;
  }

}
