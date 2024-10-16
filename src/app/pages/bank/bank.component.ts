import { Component, ElementRef, OnInit, ViewChild, OnDestroy, AfterViewInit } from '@angular/core';
import { LoginService } from '../../auth/login/login.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { Bank } from './bank';
import { BankService } from './bank.service';

@Component({
  selector: 'app-bank',
  templateUrl: './bank.component.html',
  styleUrl: './bank.component.css'
})
export class BankComponent implements OnInit, AfterViewInit {

  @ViewChild(MatSort) sort: MatSort = <MatSort>{};
  @ViewChild(MatPaginator) paginator: MatPaginator = <MatPaginator>{};

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  userLoginOn:boolean=false;

  banks:Bank[]=[];
  dataSource = new MatTableDataSource<Bank>(this.banks);

  displayedColumns: string[] = ['id', 'description', 'number','actions'];

  constructor(
    private loginService:LoginService,
    private BankService:BankService) { }
  
  ngOnInit(): void {

    this.loginService.currentUserLoginOn.subscribe({
      next:(userLoginOn) => {
        this.userLoginOn=userLoginOn;
      }
    });

    this.BankService.getAll().subscribe(
      response => {
        this.banks = response;
        this.dataSource.data = this.banks;
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
    });

  }

  delete(Bank:Bank):void {
    this.BankService.delete(Bank.id).subscribe(
      result => this.BankService.getAll().subscribe(
        response => this.banks = response
      )
    );
  }

}
