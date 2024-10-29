import { Component, ElementRef, OnInit, ViewChild, OnDestroy, AfterViewInit } from '@angular/core';
import { LoginService } from '../../auth/login/login.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { Sellers } from './sellers';
import { SellersService } from './sellers.service';

@Component({
  selector: 'app-sellers',
  templateUrl: './sellers.component.html',
  styleUrl: './sellers.component.css'
})
export class SellersComponent implements OnInit, AfterViewInit {

  @ViewChild(MatSort) sort: MatSort = <MatSort>{};
  @ViewChild(MatPaginator) paginator: MatPaginator = <MatPaginator>{};

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  userLoginOn:boolean=false;

  sellers:Sellers[]=[];
  dataSource = new MatTableDataSource<Sellers>(this.sellers);

  displayedColumns: string[] = ['id', 'description', 'actions'];

  constructor(
    private loginService:LoginService,
    private SellersService:SellersService) { }
  
  ngOnInit(): void {

    this.loginService.currentUserLoginOn.subscribe({
      next:(userLoginOn) => {
        this.userLoginOn=userLoginOn;
      }
    });

    this.SellersService.getAll().subscribe(
      response => {
        this.sellers = response;
        this.dataSource.data = this.sellers;
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
    });

  }

  delete(Sellers:Sellers):void {
    this.SellersService.delete(Sellers.id).subscribe(
      result => this.SellersService.getAll().subscribe(
        response => this.sellers = response
      )
    );
  }

  printPdf(Seller:Sellers) {
    this.SellersService.printPdf(Seller.id).subscribe((response: BlobPart) => {
      const file = new Blob([response], { type: 'application/pdf' });
      const fileURL = URL.createObjectURL(file);
      window.open(fileURL);
    });
  }

  printListPdf() {
    this.SellersService.printListPdf().subscribe((response: BlobPart) => {
      const file = new Blob([response], { type: 'application/pdf' });
      const fileURL = URL.createObjectURL(file);
      window.open(fileURL);
    });
  }

  printListXls() {
    this.SellersService.printListXls().subscribe((response: BlobPart) => {
      const file = new Blob([response], { type: 'application/xls' });
      const fileURL = URL.createObjectURL(file);
      window.open(fileURL);
    });
  }


}
