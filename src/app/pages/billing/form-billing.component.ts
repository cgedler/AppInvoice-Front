import { Component, Input, OnInit } from '@angular/core';
import { Billing } from './billing';
import { BillingService } from './billing.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Customers } from '../customers/customers';
import { Sellers } from '../sellers/sellers';
import { BillingDetails } from './billingDetails';
import { Item } from '../items/item';
import { Taxes } from '../taxes/taxes';
import { Bank } from '../bank/bank';
import { Category } from '../category/category';
import { CustomersService } from '../customers/customers.service';
import { SellersService } from '../sellers/sellers.service';
import { BankService } from '../bank/bank.service';
import { TaxesService } from '../taxes/taxes.service';
import { CategoryService } from '../category/category.service';
import { ItemsService } from '../items/items.service';

@Component({
  selector: 'app-form-billing',
  templateUrl: './form-billing.component.html',
  styleUrl: './form-billing.component.css'
})
export class FormBillingComponent implements OnInit {
  
  billing:Billing = new Billing();
  title:string = "Register Billing";
  customers:Customers[]=[];
  customer:Customers = new Customers();
  sellers:Sellers[]=[];
  seller:Sellers = new Sellers();
  banks:Bank[]=[];
  bank:Bank = new Bank();
  taxes:Taxes[]=[];
  tax:Taxes = new Taxes();
  actionValue:string = "";
  billingDetails:BillingDetails[] = [];
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
    private customersService:CustomersService,
    private sellerService:SellersService,
    private bankService:BankService,
    private taxesService:TaxesService,
    private billingService:BillingService,
    private router:Router,
    private activateRouter:ActivatedRoute,
    private itemService:ItemsService,
    private categoryService:CategoryService) { }

  ngOnInit(): void {
    this.load();
    this.actionValue = this.router.url;

    this.customersService.getAll().subscribe(
      response => {
        this.customers = response;
    });

    this.sellerService.getAll().subscribe(
      response => {
        this.sellers = response;
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

  onChangeCustomers(customerId: string) {
    let num:number = 0;
    num = Number(customerId);
    if (num == 0 ) {
      num = 1;
      this.customersService.getById(num).subscribe(
        response => {
          this.customer = response;
      });
    } else {
      this.customersService.getById(num).subscribe(
        response => {
          this.customer = response;
      });
    }
  }

  onChangeSellers(sellerId: string) {
    let num:number = 0;
    num = Number(sellerId);
    if (num == 0 ) {
      num = 1;
      this.sellerService.getById(num).subscribe(
        response => {
          this.seller = response;
      });
    } else {
      this.sellerService.getById(num).subscribe(
        response => {
          this.seller = response;
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
    let newBilling:Billing = new Billing();
    newBilling.id = this.billing.id;
    newBilling.date = this.billing.date;
    newBilling.description = this.billing.description;
    newBilling.customer = this.customer;
    newBilling.seller = this.seller;
    newBilling.bank = this.bank;
    newBilling.taxes = this.tax;
    newBilling.subtotal = this.billing.subtotal;
    newBilling.amount_tax = this.billing.amount_tax;
    newBilling.total = this.billing.total;
    newBilling.billingDetails  = this.billingDetails;
    this.billingService.create(this.billing).subscribe(
      res => this.router.navigate(['billing'])
    )
  }

  load():void {
    this.activateRouter.params.subscribe(
      element => {
        let id = element['id'];
        if(id) {
          this.billingService.getById(id).subscribe(
            elementGet => this.billing = elementGet
          );
        }
      } 
    )
  }

  update():void {
    this.billingService.update(this.billing).subscribe(
      result => this.router.navigate(['billing'])
    );
  }
  
  delete():void {}
  
  addItem():void {
    let item:BillingDetails = new BillingDetails();
    let itemqty:number = Number(this.qty);
    item.id = this.index;
    item.description = this.newItem.id + ' ' + this.newItem.description;
    item.item = this.newItem;
    item.quantity = itemqty;
    item.amount = this.newItemAmount; 
    this.billingDetails.push(item);
    this.index = this.index + 1;
    this.billing.subtotal = this.billingDetails.map(t => t.amount).reduce((acc, value) => acc + value, 0);
    this.billing.amount_tax = (this.tax.tax * this.billing.subtotal) / 100;
    this.billing.total = this.billing.subtotal + this.billing.amount_tax;
  } 

}
