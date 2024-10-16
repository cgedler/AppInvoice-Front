import { Component, OnInit } from '@angular/core';
import { Customers } from './customers';
import { CustomersService } from './customers.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-form-customers',
  templateUrl: './form-customers.component.html',
  styleUrl: './form-customers.component.css'
})
export class FormCustomersComponent implements OnInit {

  customers:Customers = new Customers();
  title:string = "Register Customers";
  actionValue:string = "";

  constructor(
    private customersService:CustomersService,
    private router:Router,
    private activateRouter:ActivatedRoute) { }

  ngOnInit(): void {
    this.load();
    this.actionValue = this.router.url;
  }

  create():void {
    this.customersService.create(this.customers).subscribe(
      res => this.router.navigate(['customers'])
    )

  }

  load():void {
    this.activateRouter.params.subscribe(
      element => {
        let id = element['id'];
        if(id) {
          this.customersService.getById(id).subscribe(
            elementGet => this.customers = elementGet
          );
        }
      } 
    )
  }

  update():void {
    this.customersService.update(this.customers).subscribe(
      result => this.router.navigate(['customers'])
    );
  }
  
}
