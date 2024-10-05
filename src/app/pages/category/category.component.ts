import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { LoginService } from 'src/app/auth/login/login.service';
import { Category } from './category';
import { CategoryService } from './category.service';

declare var $: (arg0: any) => ElementRef<any>;

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  userLoginOn:boolean=false;

  categories:Category[]=[];

  @ViewChild('dataTable') table!: ElementRef;
  dataTable: any;

  constructor(
    private loginService:LoginService,
    private categoryService:CategoryService) { }

  ngOnInit(): void {
    //this.dataTable = $(this.table.nativeElement);
    //this.dataTable.dataTable();
    this.loginService.currentUserLoginOn.subscribe({
      next:(userLoginOn) => {
        this.userLoginOn=userLoginOn;
      }
    });

    this.categoryService.getAll().subscribe(
      cat => this.categories=cat
    );

  }

  delete(category:Category):void {
    this.categoryService.delete(category.id).subscribe(
      result => this.categoryService.getAll().subscribe(
        response => this.categories = response
      )
    );
  }

}