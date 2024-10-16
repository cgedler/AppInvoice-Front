import { Component, OnInit } from '@angular/core';
import { Shopping } from './shopping';
import { ShoppingService } from './shopping.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-form-shopping',
  templateUrl: './form-shopping.component.html',
  styleUrl: './form-shopping.component.css'
})
export class FormShoppingComponent implements OnInit {

  shopping:Shopping = new Shopping();
  title:string = "Register Shopping";

  constructor(
    private shoppingService:ShoppingService,
    private router:Router,
    private activateRouter:ActivatedRoute) { }

  ngOnInit(): void {
    this.load();
  }

  create():void {
    this.shoppingService.create(this.shopping).subscribe(
      res => this.router.navigate(['shopping'])
    )

  }

  load():void {
    this.activateRouter.params.subscribe(
      element => {
        let id = element['id'];
        if(id) {
          this.shoppingService.getById(id).subscribe(
            elementGet => this.shopping = elementGet
          );
        }
      } 
    )
  }

  update():void {
    this.shoppingService.update(this.shopping).subscribe(
      result => this.router.navigate(['shopping'])
    );
  }
  
}
