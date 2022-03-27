import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Bank } from '../models/bank';
import { Url } from '../url/url';

@Injectable({
  providedIn: 'root'
})
export class BankService {

  constructor(private http: HttpClient) { }

  public findAll(): Observable<Bank[]> {
    return this.http.get(Url.BANKS)
      .pipe(
        map(resp => resp as Bank[])
      );
  }

  public findById(id: string): Observable<Bank> {
    return this.http.get(Url.BANKS + '/' + id)
      .pipe(
        map(resp => resp as Bank)
      );
  }

  public save(bank: Bank): Observable<Bank> {
    return this.http.post(Url.BANKS, bank)
      .pipe(
        map(resp => resp as Bank)
      );
  }

  public update(bank: Bank): Observable<Bank> {
    return this.http.put(Url.BANKS, bank)
      .pipe(
        map(resp => resp as Bank)
      );
  }
  
}
