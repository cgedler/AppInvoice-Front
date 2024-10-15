import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Sellers } from './sellers';

@Injectable({
  providedIn: 'root'
})
export class SellersService {

  constructor(private http:HttpClient) { }

  getAll():Observable<Sellers[]> {
    return this.http.get<Sellers[]>(environment.urlHost + "seller/");
  }

  getById(id:number):Observable<Sellers> {
    return this.http.get<Sellers>(environment.urlHost + "seller/" + id);
  }

  create(Sellers:Sellers):Observable<Sellers> {
    return this.http.post<Sellers>(environment.urlHost + "seller/add", Sellers);
  }

  update(Sellers:Sellers):Observable<Sellers> {
    return this.http.put<Sellers>(environment.urlHost + "seller/" + Sellers.id, Sellers);
  }

  delete(id:number):Observable<Sellers> {
    return this.http.delete<Sellers>(environment.urlHost + "seller/" + id);
  }

}
