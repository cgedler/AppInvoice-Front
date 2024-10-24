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
  supplier:Suppliers = new Suppliers();
  banks:Bank[]=[];
  bank:Bank = new Bank();
  taxes:Taxes[]=[];
  tax:Taxes = new Taxes();
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
  qty:string = "";
  price:string = "";
  amount:string = "";
  index:number = 1;
  
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

  onChangeSuppliers(supplierId: string) {
    let num:number = 0;
    num = Number(supplierId);
    if (num == 0 ) {
      num = 1;
      this.suppliersService.getById(num).subscribe(
        response => {
          this.supplier = response;
      });
    } else {
      this.suppliersService.getById(num).subscribe(
        response => {
          this.supplier = response;
      });
    }
  }

  onChangeBank(bankId: string) {
    let num:number = 0;
    num = Number(bankId);
    if (num == 0 ) {
      num = 1;
      this.bankService.getById(num).subscribe(
        response => {
          this.bank = response;
      });
    } else {
      this.bankService.getById(num).subscribe(
        response => {
          this.bank = response;
      });
    }
  }

  onChangeTaxes(taxId: string) {
    let num:number = 0;
    num = Number(taxId);
    if (num == 0 ) {
      num = 1;
      this.taxesService.getById(num).subscribe(
        response => {
          this.tax = response;
      });
    } else {
      this.taxesService.getById(num).subscribe(
        response => {
          this.tax = response;
      });
    }
  }

  onChangeCategory(categoryId: string) {
    this.categorySelectedOption = categoryId;
    let num:number = 0;
    num = Number(this.categorySelectedOption);
    this.itemService.getItemDataByCategoryId(num).subscribe(
      response => {
        this.items = response;
    });
  }

  onChangeItem(itemId: string) {
    this.itemSelectedOption = itemId;
    let num:number = 0;
    num = Number(this.itemSelectedOption);
    this.itemService.getById(num).subscribe(
          elementGet => this.newItem = elementGet
    );
    this.newItemPrice = this.newItem.price.price;
  }

  onChangeQuantity(event: Event) {
    const qty = (event.target as HTMLInputElement).value;
    let num:number = 0;
    num = Number(qty);
    this.newItemAmount = this.newItemPrice * num;
  }

  create():void {
    let newShopping:Shopping = new Shopping();
    newShopping.id = this.shopping.id;
    newShopping.date = this.shopping.date;
    newShopping.description = this.shopping.description;
    newShopping.supplier = this.supplier;
    newShopping.bank = this.bank;
    newShopping.taxes = this.tax;
    newShopping.subtotal = this.shopping.subtotal;
    newShopping.amount_tax = this.shopping.amount_tax;
    newShopping.total = this.shopping.total;
    newShopping.shoppingDetails  = this.shoppingDetails;
    this.shoppingService.create(newShopping).subscribe(
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
    let itemqty:number = Number(this.qty);
    item.id = this.index;
    item.description = this.newItem.id + ' ' + this.newItem.description;
    item.item = this.newItem;
    item.quantity = itemqty;
    item.amount = this.newItemAmount; 
    this.shoppingDetails.push(item);
    this.index = this.index + 1;
    this.shopping.subtotal = this.shoppingDetails.map(t => t.amount).reduce((acc, value) => acc + value, 0);
    this.shopping.amount_tax = (this.tax.tax * this.shopping.subtotal) / 100;
    this.shopping.total = this.shopping.subtotal + this.shopping.amount_tax;
  } 

}