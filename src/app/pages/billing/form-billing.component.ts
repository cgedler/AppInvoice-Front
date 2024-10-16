import { Component, OnInit } from '@angular/core';
import { Billing } from './billing';
import { BillingService } from './billing.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-form-billing',
  templateUrl: './form-billing.component.html',
  styleUrl: './form-billing.component.css'
})
export class FormBillingComponent implements OnInit {
  
  billing:Billing = new Billing();
  title:string = "Register Billing";

  constructor(
    private billingService:BillingService,
    private router:Router,
    private activateRouter:ActivatedRoute) { }

  ngOnInit(): void {
    this.load();
  }

  create():void {
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
  
}
