import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Account } from '../models/account';
import { Url } from '../url/url';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http: HttpClient) { }

  public findAll(): Observable<Account[]> {
    return this.http.get(Url.ACCOUNTS)
      .pipe(
        map(resp => resp as Account[])
      );
  }

}
