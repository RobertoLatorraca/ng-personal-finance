import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Tag } from '../models/tag';
import { Url } from '../url/url';

@Injectable({
  providedIn: 'root'
})
export class TagService {

  constructor(private http: HttpClient) { }

  public findAll(): Observable<Tag[]> {
    return this.http.get(Url.TAGS)
      .pipe(
        map(resp => resp as Tag[])
      );
  }

  public findById(id: string): Observable<Tag> {
    return this.http.get(Url.TAGS + '/' + id)
      .pipe(
        map(resp => resp as Tag)
      );
  }

  public save(tag: Tag): Observable<Tag> {
    return this.http.post(Url.TAGS, tag)
      .pipe(
        map(resp => resp as Tag)
      );
  }

  public update(tag: Tag): Observable<Tag> {
    return this.http.put(Url.TAGS + '/' + tag.id, tag)
      .pipe(
        map(resp => resp as Tag)
      );
  }

}