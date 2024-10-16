import { Component, OnInit } from '@angular/core';
import { Sellers } from './sellers';
import { SellersService } from './sellers.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-form-sellers',
  templateUrl: './form-sellers.component.html',
  styleUrl: './form-sellers.component.css'
})
export class FormSellersComponent implements OnInit {

  sellers:Sellers = new Sellers();
  title:string = "Register Sellers";
  actionValue:string = "";

  constructor(
    private sellersService:SellersService,
    private router:Router,
    private activateRouter:ActivatedRoute) { }

  ngOnInit(): void {
    this.load();
    this.actionValue = this.router.url;
  }

  create():void {
    this.sellersService.create(this.sellers).subscribe(
      res => this.router.navigate(['sellers'])
    )

  }

  load():void {
    this.activateRouter.params.subscribe(
      element => {
        let id = element['id'];
        if(id) {
          this.sellersService.getById(id).subscribe(
            elementGet => this.sellers = elementGet
          );
        }
      } 
    )
  }

  update():void {
    this.sellersService.update(this.sellers).subscribe(
      result => this.router.navigate(['sellers'])
    );
  }
  
}
