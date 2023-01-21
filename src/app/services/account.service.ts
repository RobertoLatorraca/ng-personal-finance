import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { Account } from '../models/account';
import { Url } from '../url/url';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  accountTypes: Observable<any> = of(
    {
      "title": "Bank",
      "type": "BANK",
      "icon": "fas fa-university"
    },
    {
      "title": "Credit Card",
      "type": "CREDIT_CARD",
      "icon": "fas fa-credit-card"
    },
    {
      "title": "Investment",
      "type": "INVESTMENT",
      "icon": "fas fa-university"
    },
    {
      "title": "Cash",
      "type": "CASH",
      "icon": "fas fa-wallet"
    }
  );

  constructor(private http: HttpClient) { }

  public findAll(): Observable<Account[]> {
    return this.http.get(Url.ACCOUNTS)
      .pipe(
        map(resp => resp as Account[])
      );
  }

  public getAccountTypes(): Observable<any> {
    return this.accountTypes;
  }
/*
  public save(account: Account): Observable<Account> {

  }
*/
}
