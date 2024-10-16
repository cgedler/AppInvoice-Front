import { Component, OnInit } from '@angular/core';
import { Bank } from './bank';
import { BankService } from './bank.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-form-bank',
  templateUrl: './form-bank.component.html',
  styleUrl: './form-bank.component.css'
})
export class FormBankComponent implements OnInit {

  bank:Bank = new Bank();
  title:string = "Register Bank";
  actionValue:string = "";

  constructor(
    private bankService:BankService,
    private router:Router,
    private activateRouter:ActivatedRoute) { }

  ngOnInit(): void {
    this.load();
    this.actionValue = this.router.url;
  }

  create():void {
    this.bankService.create(this.bank).subscribe(
      res => this.router.navigate(['bank'])
    )

  }

  load():void {
    this.activateRouter.params.subscribe(
      element => {
        let id = element['id'];
        if(id) {
          this.bankService.getById(id).subscribe(
            elementGet => this.bank = elementGet
          );
        }
      } 
    )
  }

  update():void {
    this.bankService.update(this.bank).subscribe(
      result => this.router.navigate(['bank'])
    );
  }
  
}
