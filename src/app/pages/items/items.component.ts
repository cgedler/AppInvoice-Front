import { Component, ElementRef, OnInit, ViewChild, OnDestroy, AfterViewInit } from '@angular/core';
import { LoginService } from '../../auth/login/login.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { Item } from './item';
import { ItemsService } from './items.service';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrl: './items.component.css'
})
export class ItemsComponent implements OnInit, AfterViewInit {

  @ViewChild(MatSort) sort: MatSort = <MatSort>{};
  @ViewChild(MatPaginator) paginator: MatPaginator = <MatPaginator>{};

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  userLoginOn:boolean=false;

  items:Item[]=[];
  dataSource = new MatTableDataSource<Item>(this.items);

  displayedColumns: string[] = ['id', 'description', 'category', 'price', 'stock', 'actions'];

  constructor(
    private loginService:LoginService,
    private ItemService:ItemsService) { }
  
  ngOnInit(): void {

    this.loginService.currentUserLoginOn.subscribe({
      next:(userLoginOn) => {
        this.userLoginOn=userLoginOn;
      }
    });

    this.ItemService.getAll().subscribe(
      response => {
        this.items = response;
        this.dataSource.data = this.items;
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        
    });

  }

  delete(Item:Item):void {
    this.ItemService.delete(Item.id).subscribe(
      result => this.ItemService.getAll().subscribe(
        response => this.items = response
      )
    );
  }

}
