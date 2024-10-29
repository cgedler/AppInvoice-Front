import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Category } from './category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http:HttpClient) { }

  getAll():Observable<Category[]> {
    return this.http.get<Category[]>(environment.urlHost + "item/category/");
  }

  printPdf(id:number): any {
    const httpOptions = {
      responseType: 'arraybuffer' as 'json'
    };
    return this.http.get<any>(environment.urlHost + 'item/category/pdf/' + id, httpOptions);
  }

  printListPdf(): any {
    const httpOptions = {
      responseType: 'arraybuffer' as 'json'
    };
    return this.http.get<any>(environment.urlHost + 'item/category/pdf', httpOptions);
  }

  printListXls(): any {
    const httpOptions = {
      responseType: 'arraybuffer' as 'json'
    };
    return this.http.get<any>(environment.urlHost + 'item/category/xls', httpOptions);
  }

  getById(id:number):Observable<Category> {
    return this.http.get<Category>(environment.urlHost + "item/category/" + id);
  }

  create(category:Category):Observable<Category> {
    return this.http.post<Category>(environment.urlHost + "item/category/add", category);
  }

  update(category:Category):Observable<Category> {
    return this.http.put<Category>(environment.urlHost + "item/category/" + category.id, category);
  }

  delete(id:number):Observable<Category> {
    return this.http.delete<Category>(environment.urlHost + "item/category/" + id);
  }

}
