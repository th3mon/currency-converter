import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';

@Injectable()
export class CurrencyRatesService {
  private _serviceUrl = 'http://api.nbp.pl/api/exchangerates/rates/C/';
  private _jsonFormatParametr = '?format=json';

  constructor(private _http: Http) {}

  getRates(currencyCode: string): Observable<any> {
    let url: string = `${this._serviceUrl}${currencyCode}${this._jsonFormatParametr}`;

    return this._http.get(url)
      .map((response: Response) => <any> response.json())
      .do(data => console.log(`${JSON.stringify(data)}`))
      .catch(this.handleError);
  }

  private handleError(error: Response) {
    console.error(error);

    return Observable.throw(error.json().error || 'Server error');
  }
}
