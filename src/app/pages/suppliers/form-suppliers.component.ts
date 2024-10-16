import { Component, OnInit } from '@angular/core';
import { Suppliers } from './suppliers';
import { SuppliersService } from './suppliers.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-form-suppliers',
  templateUrl: './form-suppliers.component.html',
  styleUrl: './form-suppliers.component.css'
})
export class FormSuppliersComponent implements OnInit {

  suppliers:Suppliers = new Suppliers();
  title:string = "Register Suppliers";
  actionValue:string = "";

  constructor(
    private suppliersService:SuppliersService,
    private router:Router,
    private activateRouter:ActivatedRoute) { }

  ngOnInit(): void {
    this.load();
    this.actionValue = this.router.url;
  }

  create():void {
    this.suppliersService.create(this.suppliers).subscribe(
      res => this.router.navigate(['suppliers'])
    )

  }

  load():void {
    this.activateRouter.params.subscribe(
      element => {
        let id = element['id'];
        if(id) {
          this.suppliersService.getById(id).subscribe(
            elementGet => this.suppliers = elementGet
          );
        }
      } 
    )
  }

  update():void {
    this.suppliersService.update(this.suppliers).subscribe(
      result => this.router.navigate(['suppliers'])
    );
  }

}
