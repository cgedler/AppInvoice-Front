import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Billing } from './billing';

@Injectable({
  providedIn: 'root'
})
export class BillingService {

  constructor(private http:HttpClient) { }

  getAll():Observable<Billing[]> {
    return this.http.get<Billing[]>(environment.urlHost + "billing/");
  }

  getById(id:number):Observable<Billing> {
    return this.http.get<Billing>(environment.urlHost + "billing/" + id);
  }

  create(Billing:Billing):Observable<Billing> {
    return this.http.post<Billing>(environment.urlHost + "billing/add", Billing);
  }

  update(Billing:Billing):Observable<Billing> {
    return this.http.put<Billing>(environment.urlHost + "billing/" + Billing.id, Billing);
  }

  delete(id:number):Observable<Billing> {
    return this.http.delete<Billing>(environment.urlHost + "billing/" + id);
  }

}
