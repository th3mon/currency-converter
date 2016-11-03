import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';

@Injectable()
export class CurrencyRatesService {
  private _serviceUrl = 'https://api.nbp.pl/api/exchangerates/rates/C/';
  private _serviceTablesUrl = 'https://api.nbp.pl/api/exchangerates/tables/C/';
  private _jsonFormatParametr = '?format=json';

  constructor(private _http: Http) {}

  getRate(currencyCode: string): Observable<any> {
    let url = `${this._serviceUrl}${currencyCode}${this._jsonFormatParametr}`;

    return this._http.get(url)
      .map((response: Response) => {
        let r = response.json();

        return <any> {
          value: r.rates[0].bid,
          code: r.code
        };
      })
      .catch(this.handleError);
  }

  getRates(): Observable<any> {
    let url = `${this._serviceTablesUrl}`,
      regCurrenciesOfInterest = /USD|EUR|PLN|GBP/;

    return this._http.get(url)
      .map((response: Response) => {
        return <any> response.json()[0].rates
          .filter((rate) => regCurrenciesOfInterest.test(rate.code))
          .map((rate) => {
            return {
              value: rate.bid,
              code: rate.code
            };
          });
      })
      .do(data => console.log(`${JSON.stringify(data)}`))
      .catch(this.handleError);
  }

  private handleError(error: Response) {
    console.error(error);

    return Observable.throw(error.json().error || 'Server error');
  }
}
