import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Currency } from '../models/currency';
import { Url } from '../url/url';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {

  constructor(private http: HttpClient) { }

  public findAll(): Observable<Currency[]> {
    return this.http.get(Url.CURRENCIES)
      .pipe(
        map(resp => resp as Currency[])
      );
  }

  public findById(id: string): Observable<Currency> {
    return this.http.get(Url.CURRENCIES + '/' + id)
      .pipe(
        map(resp => resp as Currency)
      );
  }

  public save(currency: Currency): Observable<Currency> {
    return this.http.post(Url.CURRENCIES, currency)
      .pipe(
        map(resp => resp as Currency)
      );
  }

  public update(currency: Currency): Observable<Currency> {
    return this.http.put(Url.CURRENCIES + '/' + currency.id, currency)
      .pipe(
        map(resp => resp as Currency)
      );
  }

}
