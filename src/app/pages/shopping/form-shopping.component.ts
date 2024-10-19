import { Component, Input, OnInit } from '@angular/core';
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
import { ItemsService } from '../items/items.service';
import { Item } from '../items/item';
import { Category } from '../category/category';
import { CategoryService } from '../category/category.service';

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
  items:Item[]=[];
  categories:Category[]=[];
  categorySelectedOption:string = '';
  itemSelectedOption:string = '';
  newItem:Item = new Item();
  newItemPrice:number = 0;
  newItemAmount:number = 0;
  @Input() element: any;

  index:number = 0;
  
  constructor(
    private suppliersService:SuppliersService,
    private bankService:BankService,
    private taxesService:TaxesService,
    private shoppingService:ShoppingService,
    private router:Router,
    private activateRouter:ActivatedRoute,
    private itemService:ItemsService,
    private categoryService:CategoryService) { }

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

    this.categoryService.getAll().subscribe(
      response => {
        this.categories = response;
    });

  }

  onChangeCategory(newValue: string) {
    this.categorySelectedOption = newValue;
    let num:number = 0;
    num = Number(this.categorySelectedOption);
    this.itemService.getItemDataByCategoryId(num).subscribe(
      response => {
        this.items = response;
    });
  }

  onChangeItem(newValue: string) {
    this.itemSelectedOption = newValue;
    console.log(`Selected option: ${this.itemSelectedOption}`);
    
    let num:number = 0;
    num = Number(this.itemSelectedOption);
    this.itemService.getById(num).subscribe(
          elementGet => this.newItem = elementGet
    );

    console.log(this.newItem);

    this.newItemPrice = this.newItem.price.price;
    
    //crear un item y cargarlo con los datos del servicio item
    
  }

  onChangeQuantity(event: Event) {
    const newValuet = (event.target as HTMLInputElement).value;
    console.log('Input value changed:', newValuet);

    let num:number = 0;
    num = Number(newValuet);
    this.newItemAmount = this.newItemPrice * num;

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


