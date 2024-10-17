import { Component, OnInit } from '@angular/core';
import { Shopping } from './shopping';
import { ShoppingService } from './shopping.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Taxes } from '../taxes/taxes';
import { Suppliers } from '../suppliers/suppliers';
import { Bank } from '../bank/bank';
import { SuppliersService } from '../suppliers/suppliers.service';
import { TaxesService } from '../taxes/taxes.service';
import { BankService } from '../bank/bank.service';
import { ShoppingDetails } from './shoppingDetails';

@Component({
  selector: 'app-form-shopping',
  templateUrl: './form-shopping.component.html',
  styleUrl: './form-shopping.component.css'
})
export class FormShoppingComponent implements OnInit {

  shopping:Shopping = new Shopping();
  title:string = "Register Shopping";
  suppliers:Suppliers[]=[];
  banks:Bank[]=[];
  taxes:Taxes[]=[];
  actionValue:string = "";
  shoppingDetails:ShoppingDetails[] = [];

  constructor(
    private suppliersService:SuppliersService,
    private bankService:BankService,
    private taxesService:TaxesService,
    private shoppingService:ShoppingService,
    private router:Router,
    private activateRouter:ActivatedRoute) { }

  ngOnInit(): void {
    this.load();
    this.actionValue = this.router.url;

    this.suppliersService.getAll().subscribe(
      response => {
        this.suppliers = response;
    });

    this.bankService.getAll().subscribe(
      response => {
        this.banks = response;
    });

    this.taxesService.getAll().subscribe(
      response => {
        this.taxes = response;
    });

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

  delete():void {}

  addItem():void {
    let item:ShoppingDetails = new ShoppingDetails();
    item.id = 1;
    item.item_id = 2;
    item.quantity = 3;
    item.amount = 43; 
    this.shoppingDetails.push(item);
  } 
  
}
