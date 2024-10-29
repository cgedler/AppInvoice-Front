import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Suppliers } from './suppliers';

@Injectable({
  providedIn: 'root'
})
export class SuppliersService {

  constructor(private http:HttpClient) { }

  getAll():Observable<Suppliers[]> {
    return this.http.get<Suppliers[]>(environment.urlHost + "supplier/");
  }

  printPdf(id:number): any {
    const httpOptions = {
      responseType: 'arraybuffer' as 'json'
    };
    return this.http.get<any>(environment.urlHost + 'supplier/pdf/' + id, httpOptions);
  }

  printListPdf(): any {
    const httpOptions = {
      responseType: 'arraybuffer' as 'json'
    };
    return this.http.get<any>(environment.urlHost + 'supplier/pdf', httpOptions);
  }

  printListXls(): any {
    const httpOptions = {
      responseType: 'arraybuffer' as 'json'
    };
    return this.http.get<any>(environment.urlHost + 'supplier/xls', httpOptions);
  }

  getById(id:number):Observable<Suppliers> {
    return this.http.get<Suppliers>(environment.urlHost + "supplier/" + id);
  }

  create(Suppliers:Suppliers):Observable<Suppliers> {
    return this.http.post<Suppliers>(environment.urlHost + "supplier/add", Suppliers);
  }

  update(Suppliers:Suppliers):Observable<Suppliers> {
    return this.http.put<Suppliers>(environment.urlHost + "supplier/" + Suppliers.id, Suppliers);
  }

  delete(id:number):Observable<Suppliers> {
    return this.http.delete<Suppliers>(environment.urlHost + "supplier/" + id);
  }

}
