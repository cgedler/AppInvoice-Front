import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Item } from './item';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  constructor(private http:HttpClient) { }

  getAll():Observable<Item[]> {
    return this.http.get<Item[]>(environment.urlHost + "item/item");
  }

  printPdf(id:number): any {
    const httpOptions = {
      responseType: 'arraybuffer' as 'json'
    };
    return this.http.get<any>(environment.urlHost + 'item/pdf/' + id, httpOptions);
  }

  printListPdf(): any {
    const httpOptions = {
      responseType: 'arraybuffer' as 'json'
    };
    return this.http.get<any>(environment.urlHost + 'item/pdf', httpOptions);
  }

  printListXls(): any {
    const httpOptions = {
      responseType: 'arraybuffer' as 'json'
    };
    return this.http.get<any>(environment.urlHost + 'item/xls', httpOptions);
  }

  getById(id:number):Observable<Item> {
    return this.http.get<Item>(environment.urlHost + "item/" + id);
  }

  getItemDataByCategoryId(id:number):Observable<Item[]> {
    return this.http.get<Item[]>(environment.urlHost + "item/categoryid/" + id);
  }

  create(item:Item):Observable<Item> {
    return this.http.post<Item>(environment.urlHost + "item/add", item);
  }

  update(item:Item):Observable<Item> {
    return this.http.put<Item>(environment.urlHost + "item/" + item.id, item);
  }

  delete(id:number):Observable<Item> {
    return this.http.delete<Item>(environment.urlHost + "item/" + id);
  }

}
