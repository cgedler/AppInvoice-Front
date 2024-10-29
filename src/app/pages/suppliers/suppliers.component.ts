import { Component, ElementRef, OnInit, ViewChild, OnDestroy, AfterViewInit } from '@angular/core';
import { LoginService } from '../../auth/login/login.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { Suppliers } from './suppliers';
import { SuppliersService } from './suppliers.service';

@Component({
  selector: 'app-suppliers',
  templateUrl: './suppliers.component.html',
  styleUrl: './suppliers.component.css'
})
export class SuppliersComponent implements OnInit, AfterViewInit {

  @ViewChild(MatSort) sort: MatSort = <MatSort>{};
  @ViewChild(MatPaginator) paginator: MatPaginator = <MatPaginator>{};

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  userLoginOn:boolean=false;

  suppliers:Suppliers[]=[];
  dataSource = new MatTableDataSource<Suppliers>(this.suppliers);

  displayedColumns: string[] = ['id', 'description', 'actions'];

  constructor(
    private loginService:LoginService,
    private SuppliersService:SuppliersService) { }
  
  ngOnInit(): void {

    this.loginService.currentUserLoginOn.subscribe({
      next:(userLoginOn) => {
        this.userLoginOn=userLoginOn;
      }
    });

    this.SuppliersService.getAll().subscribe(
      response => {
        this.suppliers = response;
        this.dataSource.data = this.suppliers;
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
    });

  }

  delete(Suppliers:Suppliers):void {
    this.SuppliersService.delete(Suppliers.id).subscribe(
      result => this.SuppliersService.getAll().subscribe(
        response => this.suppliers = response
      )
    );
  }

  printPdf(Suppliers:Suppliers) {
    this.SuppliersService.printPdf(Suppliers.id).subscribe((response: BlobPart) => {
      const file = new Blob([response], { type: 'application/pdf' });
      const fileURL = URL.createObjectURL(file);
      window.open(fileURL);
    });
  }

  printListPdf() {
    this.SuppliersService.printListPdf().subscribe((response: BlobPart) => {
      const file = new Blob([response], { type: 'application/pdf' });
      const fileURL = URL.createObjectURL(file);
      window.open(fileURL);
    });
  }

  printListXls() {
    this.SuppliersService.printListXls().subscribe((response: BlobPart) => {
      const file = new Blob([response], { type: 'application/xls' });
      const fileURL = URL.createObjectURL(file);
      window.open(fileURL);
    });
  }


}
