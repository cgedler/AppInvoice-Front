import { Component, OnDestroy, OnInit } from '@angular/core';
import { LoginService } from '../../auth/login/login.service';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  
  userLoginOn:boolean=false;
  username:String="";
  chart: any = [];

  constructor(private loginService:LoginService) { }

  ngOnInit(): void {
    this.loginService.currentUserLoginOn.subscribe({
      next:(userLoginOn: boolean) => {
        this.userLoginOn=userLoginOn;
      }
    });

    this.username = this.loginService.currentUserName;

    this.chart = new Chart('ctx', {
      type: 'bar',
      data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        datasets: [
          {
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3, 4, 1, 7, 8, 9, 12],
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

  }
}
