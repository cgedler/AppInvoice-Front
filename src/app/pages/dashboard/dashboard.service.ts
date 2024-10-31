import { Injectable } from '@angular/core';
import { ShoppingByYearDTO } from './shoppingByYearDTO';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { map, Observable, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http:HttpClient) { }

  getDataByYear(year:number):Observable<ShoppingByYearDTO> {
    return this.http.get<ShoppingByYearDTO>(environment.urlHost + "shopping/year/" + year).pipe(map(data => data));
  }

}