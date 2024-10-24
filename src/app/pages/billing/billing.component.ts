import { Component, ElementRef, OnInit, ViewChild, OnDestroy, AfterViewInit } from '@angular/core';
import { LoginService } from '../../auth/login/login.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { Billing } from './billing';
import { BillingService } from './billing.service';

@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrl: './billing.component.css'
})
export class BillingComponent implements OnInit, AfterViewInit {

  @ViewChild(MatSort) sort: MatSort = <MatSort>{};
  @ViewChild(MatPaginator) paginator: MatPaginator = <MatPaginator>{};

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  userLoginOn:boolean=false;

  billings:Billing[]=[];
  dataSource = new MatTableDataSource<Billing>(this.billings);

  displayedColumns: string[] = [
    'id',
    'date',
    'description',
    'customer_id',
    'seller_id',
    'bank_id',
    'taxes_id',
    'subtotal',
    'amount_tax',
    'total',
    'actions'];

  constructor(
    private loginService:LoginService,
    private BillingService:BillingService) { }
  
  ngOnInit(): void {

    this.loginService.currentUserLoginOn.subscribe({
      next:(userLoginOn) => {
        this.userLoginOn=userLoginOn;
      }
    });

    this.BillingService.getAll().subscribe(
      response => {
        this.billings = response;
        this.dataSource.data = this.billings;
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
    });

  }

  delete(Billing:Billing):void {
    this.BillingService.delete(Billing.id).subscribe(
      result => this.BillingService.getAll().subscribe(
        response => this.billings = response
      )
    );
  }

}
