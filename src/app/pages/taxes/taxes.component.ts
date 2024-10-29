import { Component, ElementRef, OnInit, ViewChild, OnDestroy, AfterViewInit } from '@angular/core';
import { LoginService } from '../../auth/login/login.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { Taxes } from './taxes';
import { TaxesService } from './taxes.service';

@Component({
  selector: 'app-taxes',
  templateUrl: './taxes.component.html',
  styleUrl: './taxes.component.css'
})
export class TaxesComponent implements OnInit, AfterViewInit {

  @ViewChild(MatSort) sort: MatSort = <MatSort>{};
  @ViewChild(MatPaginator) paginator: MatPaginator = <MatPaginator>{};

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  userLoginOn:boolean=false;

  taxes:Taxes[]=[];
  dataSource = new MatTableDataSource<Taxes>(this.taxes);

  displayedColumns: string[] = ['id', 'description', 'tax', 'actions'];

  constructor(
    private loginService:LoginService,
    private TaxesService:TaxesService) { }
  
  ngOnInit(): void {

    this.loginService.currentUserLoginOn.subscribe({
      next:(userLoginOn) => {
        this.userLoginOn=userLoginOn;
      }
    });

    this.TaxesService.getAll().subscribe(
      response => {
        this.taxes = response;
        this.dataSource.data = this.taxes;
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
    });

  }

  delete(Taxes:Taxes):void {
    this.TaxesService.delete(Taxes.id).subscribe(
      result => this.TaxesService.getAll().subscribe(
        response => this.taxes = response
      )
    );
  }

  printPdf(Taxes:Taxes) {
    this.TaxesService.printPdf(Taxes.id).subscribe((response: BlobPart) => {
      const file = new Blob([response], { type: 'application/pdf' });
      const fileURL = URL.createObjectURL(file);
      window.open(fileURL);
    });
  }

  printListPdf() {
    this.TaxesService.printListPdf().subscribe((response: BlobPart) => {
      const file = new Blob([response], { type: 'application/pdf' });
      const fileURL = URL.createObjectURL(file);
      window.open(fileURL);
    });
  }

  printListXls() {
    this.TaxesService.printListXls().subscribe((response: BlobPart) => {
      const file = new Blob([response], { type: 'application/xls' });
      const fileURL = URL.createObjectURL(file);
      window.open(fileURL);
    });
  }

}
