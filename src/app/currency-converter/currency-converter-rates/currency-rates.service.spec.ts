/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { Http, BaseRequestOptions, Response } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { CurrencyRatesService } from './currency-rates.service';

xdescribe('Service: CurrencyRates', () => {
  beforeEach(() => {
    this.currencyRatesStub = {
      table: "C",
      currency: "dolar amerykański",
      code: "USD",
      rates: [
        {
          no: "212/C/NBP/2016",
          effectiveDate: "2016-11-02",
          bid: 3.9177,
          ask: 3.9969
        }
      ]
    };

    TestBed.configureTestingModule({
      providers: [
        Http,
        CurrencyRatesService
      ]
    });
  });

  it('should be defined', inject([CurrencyRatesService], (service: CurrencyRatesService) => {
    expect(service).toBeTruthy();
  }));

  it('should get currency rates', inject([CurrencyRatesService, MockBackend], (service: CurrencyRatesService, mockbackend: MockBackend) => {
    mockbackend.connections.subscribe(connection => {
      connection.mockRespond(new Response(<any>{
        body: JSON.stringify(this.currencyRatesStub)
      }))
    });
    service.getRates().subscribe(rates => {
      expect(rates).toBeTruthy();
    });
  }));
});
