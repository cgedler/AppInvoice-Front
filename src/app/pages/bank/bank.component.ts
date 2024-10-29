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
    private bankService:BankService) { }
  
  ngOnInit(): void {

    this.loginService.currentUserLoginOn.subscribe({
      next:(userLoginOn) => {
        this.userLoginOn=userLoginOn;
      }
    });

    this.bankService.getAll().subscribe(
      response => {
        this.banks = response;
        this.dataSource.data = this.banks;
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
    });

  }

  delete(Bank:Bank):void {
    this.bankService.delete(Bank.id).subscribe(
      result => this.bankService.getAll().subscribe(
        response => this.banks = response
      )
    );
  }

  printPdf(Bank:Bank) {
    this.bankService.printPdf(Bank.id).subscribe((response: BlobPart) => {
      const file = new Blob([response], { type: 'application/pdf' });
      const fileURL = URL.createObjectURL(file);
      window.open(fileURL);
    });
  }

  printListPdf() {
    this.bankService.printListPdf().subscribe((response: BlobPart) => {
      const file = new Blob([response], { type: 'application/pdf' });
      const fileURL = URL.createObjectURL(file);
      window.open(fileURL);
    });
  }

  printListXls() {
    this.bankService.printListXls().subscribe((response: BlobPart) => {
      const file = new Blob([response], { type: 'application/xls' });
      const fileURL = URL.createObjectURL(file);
      window.open(fileURL);
    });
  }

}
