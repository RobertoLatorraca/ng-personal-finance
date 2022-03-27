import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Payee } from '../models/payee';
import { Url } from '../url/url';

@Injectable({
  providedIn: 'root'
})
export class PayeeService {

  constructor(private http: HttpClient) { }

  public findAll(): Observable<Payee[]> {
    return this.http.get(Url.PAYEES).pipe(
      map(resp => resp as Payee[])
    );
  }

  public findById(id: string): Observable<Payee> {
    return this.http.get(Url.PAYEES + '/' + id).pipe(
      map(resp => resp as Payee)
    )
  }

  public save(payee: Payee): Observable<Payee> {
    return this.http.post(Url.PAYEES, payee).pipe(
      map(resp => resp as Payee)
    );
  }

  public update(payee: Payee): Observable<Payee> {
    return this.http.put(Url.PAYEES, payee).pipe(
      map(resp => resp as Payee)
    );
  }

}
