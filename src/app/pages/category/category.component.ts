import { Component, ElementRef, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { LoginService } from '../../auth/login/login.service';
import { Category } from './category';
import { CategoryService } from './category.service';
import { Config } from 'datatables.net';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  dtOptions: Config = {};

  userLoginOn:boolean=false;

  categories:Category[]=[];

  constructor(
    private loginService:LoginService,
    private categoryService:CategoryService) { }
  
  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10
    };

   

    this.loginService.currentUserLoginOn.subscribe({
      next:(userLoginOn) => {
        this.userLoginOn=userLoginOn;
      }
    });

    this.categoryService.getAll().subscribe(
      cat => this.categories = cat
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
