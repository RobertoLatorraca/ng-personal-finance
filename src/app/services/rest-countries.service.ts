import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, throwError, timeout } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RestCountriesService {

  URLBASE_RESTCOUNTRIES: string = "https://restcountries.com/v3.1"

  constructor(private http: HttpClient) { }

  public findAll(): Observable<any[]> {
    return this.http.get(this.URLBASE_RESTCOUNTRIES + "/all")
      .pipe(
        timeout({
          each: 2500,
          with: () => throwError(() => new Error("Error connection with REST COUNTRIES API"))
        }),
        map(resp => resp as any[]),
        map(countries => countries.sort((x, y) => x.name.official.localeCompare(y.name.official)))
      );
  }

  public getCurrenciesFromCountry(countryJson: any): any[] {
    let result: any[] = [];
    let currencies = countryJson.currencies;
    if (currencies != null) {
      let keys: string[] = Object.keys(currencies);
      keys.forEach(key => {
        var c = {
          code: key,
          name: currencies[key].name,
          symbol: currencies[key].symbol
        };
        result.push(c);
      });
    }
    return result;
  }

}
