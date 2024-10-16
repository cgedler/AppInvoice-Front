import { Component, ElementRef, OnInit, ViewChild, OnDestroy, AfterViewInit } from '@angular/core';
import { LoginService } from '../../auth/login/login.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { Shopping } from './shopping';
import { ShoppingService } from './shopping.service';

@Component({
  selector: 'app-shopping',
  templateUrl: './shopping.component.html',
  styleUrl: './shopping.component.css'
})
export class ShoppingComponent implements OnInit, AfterViewInit {

  @ViewChild(MatSort) sort: MatSort = <MatSort>{};
  @ViewChild(MatPaginator) paginator: MatPaginator = <MatPaginator>{};

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  userLoginOn:boolean=false;

  shoppings:Shopping[]=[];
  dataSource = new MatTableDataSource<Shopping>(this.shoppings);

  displayedColumns: string[] = [
    'id',
    'amount_tax',
    'date',
    'description',
    'subtotal',
    'total',
    'bank_id',
    'customer_id',
    'seller_id',
    'taxes_id',
    'actions'];

  constructor(
    private loginService:LoginService,
    private ShoppingService:ShoppingService) { }
  
  ngOnInit(): void {

    this.loginService.currentUserLoginOn.subscribe({
      next:(userLoginOn) => {
        this.userLoginOn=userLoginOn;
      }
    });

    this.ShoppingService.getAll().subscribe(
      response => {
        this.shoppings = response;
        this.dataSource.data = this.shoppings;
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
    });

  }

  delete(Shopping:Shopping):void {
    this.ShoppingService.delete(Shopping.id).subscribe(
      result => this.ShoppingService.getAll().subscribe(
        response => this.shoppings = response
      )
    );
  }

}
