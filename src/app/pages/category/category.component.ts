import { Component, ElementRef, OnInit, ViewChild, OnDestroy, AfterViewInit } from '@angular/core';
import { LoginService } from '../../auth/login/login.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { Category } from './category';
import { CategoryService } from './category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent implements OnInit, AfterViewInit  {

  @ViewChild(MatSort) sort: MatSort = <MatSort>{};
  @ViewChild(MatPaginator) paginator: MatPaginator = <MatPaginator>{};

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  userLoginOn:boolean=false;

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
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
    });

  }

  delete(category:Category):void {
    this.categoryService.delete(category.id).subscribe(
      result => this.categoryService.getAll().subscribe(
        response => this.categories = response
      )
    );
  }

  printPdf(Category:Category) {
    this.categoryService.printPdf(Category.id).subscribe((response: BlobPart) => {
      const file = new Blob([response], { type: 'application/pdf' });
      const fileURL = URL.createObjectURL(file);
      window.open(fileURL);
    });
  }

  printListPdf() {
    this.categoryService.printListPdf().subscribe((response: BlobPart) => {
      const file = new Blob([response], { type: 'application/pdf' });
      const fileURL = URL.createObjectURL(file);
      window.open(fileURL);
    });
  }

  printListXls() {
    this.categoryService.printListXls().subscribe((response: BlobPart) => {
      const file = new Blob([response], { type: 'application/xls' });
      const fileURL = URL.createObjectURL(file);
      window.open(fileURL);
    });
  }


}