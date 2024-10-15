import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Bank } from './bank';


@Injectable({
  providedIn: 'root'
})
export class BankService {

  constructor(private http:HttpClient) { }

  getAll():Observable<Bank[]> {
    return this.http.get<Bank[]>(environment.urlHost + "bank/");
  }

  getById(id:number):Observable<Bank> {
    return this.http.get<Bank>(environment.urlHost + "bank/" + id);
  }

  create(Bank:Bank):Observable<Bank> {
    return this.http.post<Bank>(environment.urlHost + "bank/add", Bank);
  }

  update(Bank:Bank):Observable<Bank> {
    return this.http.put<Bank>(environment.urlHost + "bank/" + Bank.id, Bank);
  }

  delete(id:number):Observable<Bank> {
    return this.http.delete<Bank>(environment.urlHost + "bank/" + id);
  }

}
