import { Component, ElementRef, OnInit, ViewChild, OnDestroy, AfterViewInit } from '@angular/core';
import { LoginService } from '../../auth/login/login.service';
import { Category } from './category';
import { CategoryService } from './category.service';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { DataSource } from '@angular/cdk/table';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  userLoginOn:boolean=false;

  //categories:Category[]=[];
  categories:Category[]=[];
  dataSource = new MatTableDataSource<Category>(this.categories);

  displayedColumns: string[] = ['id', 'description', 'actions'];

  constructor(
    private loginService:LoginService,
    private categoryService:CategoryService) { }
  
  ngOnInit(): void {

    this.loginService.currentUserLoginOn.subscribe({
      next:(userLoginOn) => {
        this.userLoginOn=userLoginOn;
      }
    });

    this.categoryService.getAll().subscribe(
      response => {
        this.categories = response;
        this.dataSource.data = this.categories;
    });

    console.log(this.dataSource.data);

  
  }
 

  delete(category:Category):void {
    this.categoryService.delete(category.id).subscribe(
      result => this.categoryService.getAll().subscribe(
        response => this.categories = response
      )
    );
  }
}


