import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Customers } from './customers';


@Injectable({
  providedIn: 'root'
})
export class CustomersService {

  constructor(private http:HttpClient) { }

  getAll():Observable<Customers[]> {
    return this.http.get<Customers[]>(environment.urlHost + "customers/");
  }

  getById(id:number):Observable<Customers> {
    return this.http.get<Customers>(environment.urlHost + "customers/" + id);
  }

  create(Customers:Customers):Observable<Customers> {
    return this.http.post<Customers>(environment.urlHost + "customers/add", Customers);
  }

  update(Customers:Customers):Observable<Customers> {
    return this.http.put<Customers>(environment.urlHost + "customers/" + Customers.id, Customers);
  }

  delete(id:number):Observable<Customers> {
    return this.http.delete<Customers>(environment.urlHost + "customers/" + id);
  }

}
