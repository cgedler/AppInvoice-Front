import { Component, OnInit } from '@angular/core';
import { Category } from './category';
import { CategoryService } from './category.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-form-category',
  templateUrl: './form-category.component.html',
  styleUrls: ['./form-category.component.css']
})
export class FormCategoryComponent implements OnInit {

  category:Category = new Category();
  title:string = "Register Category";

  constructor(
    private categoryService:CategoryService,
    private router:Router,
    private activateRouter:ActivatedRoute) { }

  ngOnInit(): void {
    this.load();
  }

  create():void {
    this.categoryService.create(this.category).subscribe(
      res => this.router.navigate(['category'])
    )

  }

  load():void {
    this.activateRouter.params.subscribe(
      element => {
        let id = element['id'];
        if(id) {
          this.categoryService.getById(id).subscribe(
            elementGet => this.category = elementGet
          );
        }
      } 
    )
  }

  update():void {
    this.categoryService.update(this.category).subscribe(
      result => this.router.navigate(['category'])
    );
  }


}
