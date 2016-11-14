/* tslint:disable:no-unused-variable */

import {
  async,
  getTestBed,
  TestBed,
  inject
} from '@angular/core/testing';

import {
  BaseRequestOptions,
  Http,
  Response,
  ResponseOptions,
  XHRBackend
} from '@angular/http';

import {
  MockBackend,
  MockConnection
} from '@angular/http/testing';

import { RatesService } from './rates.service';

describe('Service: Rates', () => {
  let
    backend: MockBackend,
    service: RatesService;

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        providers: [
          BaseRequestOptions,
          MockBackend,
          RatesService,
          {
            deps: [
              MockBackend,
              BaseRequestOptions
            ],
            provide: Http,
            useFactory: (backend: XHRBackend, defaultOptions: BaseRequestOptions) => {
              return new Http(backend, defaultOptions);
            }
          }
        ]
      });

      const testbed = getTestBed();

      backend = testbed.get(MockBackend);
      service = testbed.get(RatesService);
    }));

  function setupConnections(backend: MockBackend, options: any) {
    backend.connections.subscribe((connection: MockConnection) => {
      const
        responseOptions = new ResponseOptions(options),
        response = new Response(responseOptions);

      connection.mockRespond(response);
    });
  }

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });

  it('should return the list of currencies rates from server on success', () => {
    setupConnections(backend, {
      body: [{
        table: 'C',
        no: '219/C/NBP/2016',
        tradingDate: '2016-11-10',
        effectiveDate: '2016-11-14',
        rates: [{
          currency: 'dolar amerykański',
          code: 'USD',
          bid: 3.9784,
          ask: 4.0588
        }, {
          currency: 'dolar australijski',
          code: 'AUD',
          bid: 3.0196,
          ask: 3.0806
        }, {
          currency: 'dolar kanadyjski',
          code: 'CAD',
          bid: 2.9461,
          ask: 3.0057
        }, {
          currency: 'euro',
          code: 'EUR',
          bid: 4.3251,
          ask: 4.4125
        }, {
          currency: 'funt szterling',
          code: 'GBP',
          bid: 4.9656,
          ask: 5.0660
        }]
      }],
      status: 200
    });

    service.getRates().subscribe((rates) => {
      expect(rates.length).toBe(4);

      expect(rates[0].code).toBe('USD');
      expect(rates[1].code).toBe('EUR');
      expect(rates[2].code).toBe('GBP');
      expect(rates[3].code).toBe('PLN');
    });
  });

  it('should log an error', () => {
    setupConnections(backend, {
      body: {
        error: 'BadRequest'
      },
      status: 500
    });

    spyOn(console, 'error');

    service.getRates().subscribe(null, () => {
      expect(console.error).toHaveBeenCalledWith('BadRequest');
    });
  });
});
