import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from './category';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http:HttpClient) { }

  getAll():Observable<Category[]> {
    return this.http.get<Category[]>(environment.urlHost + "item/category");
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
