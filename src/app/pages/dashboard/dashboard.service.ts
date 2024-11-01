import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { ShoppingByYearDTO } from './shoppingByYearDTO';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http:HttpClient) {}

  getDataByYear(year:number): Observable<ShoppingByYearDTO>{
    return this.http.get<ShoppingByYearDTO>(environment.urlHost + "shopping/year/" + year);
  }

}