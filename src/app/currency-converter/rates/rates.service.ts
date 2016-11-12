import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';

@Injectable()
export class RatesService {
  private _serviceUrl: string = '//api.nbp.pl/api/exchangerates/rates/C/';
  private _serviceTablesUrl: string = '//api.nbp.pl/api/exchangerates/tables/C/';
  private _jsonFormatParametr: string = '?format=json';
  // TODO: Make enum for translates
  private _translate: any = {
    USD: 'US Dollar',
    EUR: 'Euro',
    GBP: 'Pound Sterling',
    PLN: 'Zloty'
  };

  constructor(private _http: Http) {}

  getRate(currencyCode: string): Observable<any> {
    let url = `${location.protocol}${this._serviceUrl}${currencyCode}${this._jsonFormatParametr}`;

    return this._http.get(url)
      .map((response: Response) => {
        // TODO: Make interface Rate
        let r: any = response.json();

        return <any> {
          value: r.rates[0].bid,
          code: r.code,
          label: r.currency
        };
      })
      .catch(this.handleError);
  }

  getRates(): Observable<any> {
    let
      url = `${this._serviceTablesUrl}${this._jsonFormatParametr}`,
      currenciesOfInterest: Array<string> = Object.keys(this._translate),
      regCurrenciesOfInterest: RegExp = new RegExp(currenciesOfInterest.join('|'));

    return this._http.get(url)
      .map((response: Response) => {
        let rates: any = <any> response.json()[0].rates
          .filter((rate: any) => regCurrenciesOfInterest.test(rate.code))
          .map((rate: any) => {
            // TODO: Make interface Rate
            return <any> {
              value: rate.bid,
              code: rate.code,
              label: this._translate[rate.code]
            };
          });

        rates.push({
          value: 1,
          code: 'PLN',
          label: this._translate.PLN
        });

        return rates;
      })
      .do(data => console.log(`${JSON.stringify(data)}`))
      .catch(this.handleError);
  }

  private handleError(error: Response) {
    console.error(error);

    return Observable.throw(error.json().error || 'Server error');
  }
}
