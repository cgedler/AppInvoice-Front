import { Component, OnInit } from '@angular/core';
import { Item } from './item';
import { ItemsService } from './items.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from '../category/category';
import { CategoryService } from '../category/category.service';

@Component({
  selector: 'app-form-items',
  templateUrl: './form-items.component.html',
  styleUrl: './form-items.component.css'
})
export class FormItemsComponent implements OnInit {

  items:Item = new Item();
  title:string = "Register Items";
  categories:Category[]=[];
  actionValue:string = "";

  constructor(
    private itemsService:ItemsService,
    private categoryService:CategoryService,
    private router:Router,
    private activateRouter:ActivatedRoute) { }

  ngOnInit(): void {
    this.load();

    this.categoryService.getAll().subscribe(
      response => {
        this.categories = response;
    });

    this.actionValue = this.router.url;

  }

  create():void {
    this.itemsService.create(this.items).subscribe(
      res => this.router.navigate(['items'])
    )
    console.log(this.items);
  }

  load():void {
    this.activateRouter.params.subscribe(
      element => {
        let id = element['id'];
        if(id) {
          this.itemsService.getById(id).subscribe(
            elementGet => this.items = elementGet
          );
        }
      } 
    )
  }

  update():void {
    this.itemsService.update(this.items).subscribe(
      result => this.router.navigate(['items'])
    );
  }
  
}
