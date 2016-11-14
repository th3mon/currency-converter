import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';

@Injectable()
export class RatesService {
  private _url: string = '//api.nbp.pl/api/exchangerates/tables/C/?format=json';
  // TODO: Make enum for translates
  private _translate: any = {
    USD: 'US Dollar',
    EUR: 'Euro',
    GBP: 'Pound Sterling',
    PLN: 'Zloty'
  };

  constructor(private _http: Http) {}

  getRates(): Observable<any> {
    let
      currenciesOfInterest: Array<string> = Object.keys(this._translate),
      regCurrenciesOfInterest: RegExp = new RegExp(currenciesOfInterest.join('|'));

    return this._http.get(this._url)
      .map((response: Response) => {
        let
          data = <any> response.json()[0],
          rates: any;

        if (data) {
          rates = data.rates
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
        }

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
