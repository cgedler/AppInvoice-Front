import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../auth/login/login.service';
import Chart from 'chart.js/auto';
import { DashboardService } from './dashboard.service';
import { ShoppingByYearDTO } from './shoppingByYearDTO';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  
  userLoginOn:boolean=false;
  username:String="";
  chart: any = [];
  data: ShoppingByYearDTO | undefined;

  constructor(
    private loginService:LoginService,
    private dashboardService:DashboardService) { }

  ngOnInit(): void {
    this.loadData();
    this.loginService.currentUserLoginOn.subscribe({
      next:(userLoginOn: boolean) => {
        this.userLoginOn=userLoginOn;
      }
    });
    this.username = this.loginService.currentUserName;
  }

  loadData(): void { 
    this.dashboardService.getDataByYear(2021).subscribe(
      result => {
          console.log(result);
          this.data = result;
          if (this.data != null) {
            //this.dataString = JSON.stringify(result);
            //console.log(this.data);
          } 
          this.loadChart(1);
      });
  }

   loadChart(value:number): void {
    this.chart = new Chart('ctx', {
      type: 'bar',
      data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        datasets: [
          {
            label: '# Shopping by year 2021',
            data: [56864.83, 53297.84, 55163.36, 118692.33, 103870.62, 127694.97, 112818.73, 74720.53, 116146.66, 82684.86, 68651.53, 42374.09],
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
