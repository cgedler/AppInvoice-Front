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
    return this.http.get<Customers[]>(environment.urlHost + "customer/");
  }


  printPdf(): any {
    const httpOptions = {
      responseType: 'arraybuffer' as 'json'
      // 'responseType'  : 'blob' as 'json'        //This also worked
    };
    return this.http.get<any>(environment.urlHost + 'customer/pdf', httpOptions);
  }

  printXls(): any {
    const httpOptions = {
      responseType: 'arraybuffer' as 'json'
    };
    return this.http.get<any>(environment.urlHost + 'customer/xls', httpOptions);
  }
 
  getById(id:number):Observable<Customers> {
    return this.http.get<Customers>(environment.urlHost + "customer/" + id);
  }

  create(Customers:Customers):Observable<Customers> {
    return this.http.post<Customers>(environment.urlHost + "customer/add", Customers);
  }

  update(Customers:Customers):Observable<Customers> {
    return this.http.put<Customers>(environment.urlHost + "customer/" + Customers.id, Customers);
  }

  delete(id:number):Observable<Customers> {
    return this.http.delete<Customers>(environment.urlHost + "customer/" + id);
  }

}
