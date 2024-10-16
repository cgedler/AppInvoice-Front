import { Component, OnInit } from '@angular/core';
import { Taxes } from './taxes';
import { TaxesService } from './taxes.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-form-taxes',
  templateUrl: './form-taxes.component.html',
  styleUrl: './form-taxes.component.css'
})
export class FormTaxesComponent implements OnInit {

  taxes:Taxes = new Taxes();
  title:string = "Register Taxes";
  actionValue:string = "";

  constructor(
    private taxesService:TaxesService,
    private router:Router,
    private activateRouter:ActivatedRoute) { }

  ngOnInit(): void {
    this.load();
    this.actionValue = this.router.url;
  }

  create():void {
    this.taxesService.create(this.taxes).subscribe(
      res => this.router.navigate(['taxes'])
    )

  }

  load():void {
    this.activateRouter.params.subscribe(
      element => {
        let id = element['id'];
        if(id) {
          this.taxesService.getById(id).subscribe(
            elementGet => this.taxes = elementGet
          );
        }
      } 
    )
  }

  update():void {
    this.taxesService.update(this.taxes).subscribe(
      result => this.router.navigate(['taxes'])
    );
  }

}
