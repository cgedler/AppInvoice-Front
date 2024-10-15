import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Taxes } from './taxes';

@Injectable({
  providedIn: 'root'
})
export class TaxesService {

  constructor(private http:HttpClient) { }

  getAll():Observable<Taxes[]> {
    return this.http.get<Taxes[]>(environment.urlHost + "taxes/");
  }

  getById(id:number):Observable<Taxes> {
    return this.http.get<Taxes>(environment.urlHost + "taxes/" + id);
  }

  create(Taxes:Taxes):Observable<Taxes> {
    return this.http.post<Taxes>(environment.urlHost + "taxes/add", Taxes);
  }

  update(Taxes:Taxes):Observable<Taxes> {
    return this.http.put<Taxes>(environment.urlHost + "taxes/" + Taxes.id, Taxes);
  }

  delete(id:number):Observable<Taxes> {
    return this.http.delete<Taxes>(environment.urlHost + "taxes/" + id);
  }

}
