import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Category } from '../models/category';
import { Url } from '../url/url';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  public findAll(): Observable<Category[]> {
    return this.http.get(Url.CATEGORIES)
      .pipe(
        map(resp => resp as Category[])
      );
  }

  public findById(id: string): Observable<Category> {
    return this.http.get(Url.CATEGORIES + '/' + id)
      .pipe(
        map(resp => resp as Category)
      );
  }

  public save(category: Category): Observable<Category> {
    return this.http.post(Url.CATEGORIES, category)
      .pipe(
        map(resp => resp as Category)
      );
  }

  public update(category: Category): Observable<Category> {
    return this.http.put(Url.CATEGORIES + '/' + category.id, category)
      .pipe(
        map(resp => resp as Category)
      );
  }

}
