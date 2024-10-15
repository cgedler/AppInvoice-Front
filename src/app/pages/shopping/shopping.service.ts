import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Shopping } from './shopping';


@Injectable({
  providedIn: 'root'
})
export class ShoppingService {

  constructor(private http:HttpClient) { }

  getAll():Observable<Shopping[]> {
    return this.http.get<Shopping[]>(environment.urlHost + "shopping/");
  }

  getById(id:number):Observable<Shopping> {
    return this.http.get<Shopping>(environment.urlHost + "shopping/" + id);
  }

  create(Shopping:Shopping):Observable<Shopping> {
    return this.http.post<Shopping>(environment.urlHost + "shopping/add", Shopping);
  }

  update(Shopping:Shopping):Observable<Shopping> {
    return this.http.put<Shopping>(environment.urlHost + "shopping/" + Shopping.id, Shopping);
  }

  delete(id:number):Observable<Shopping> {
    return this.http.delete<Shopping>(environment.urlHost + "shopping/" + id);
  }

}
