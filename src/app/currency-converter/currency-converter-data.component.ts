import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { CurrencyRatesService } from './currency-rates.service';

@Component({
  selector: 'app-currency-converter-data',
  templateUrl: './currency-converter-data.component.html',
  styleUrls: ['./currency-converter-data.component.css']
})
export class CurrencyConverterDataComponent implements OnInit, OnChanges {
  amountLabel: string = 'amount:';
  currencyRates: any;
  errorMessage: string;
  currencyValue: number;
  @Input() currencyCode: string = 'USD';

  constructor(private _currencyRateService: CurrencyRatesService) {}

  ngOnInit() {
    this.getRates();
  }

  ngOnChanges(newCurrencyCode) {
    if (typeof newCurrencyCode === 'string') {
      this.getRates();
    }
  }

  getRates() {
    if ('PLN' === this.currencyCode) {
      this.setCurrencyValue({
        rates: [{
          bid: 1
        }]
      });
    }
    else {
      this._currencyRateService.getRates(this.currencyCode)
        .subscribe(
          currencyRates => this.setCurrencyValue(currencyRates),
          error => this.errorMessage = <any>error
        );
    }
  }

  setCurrencyValue(currencyRates): void {
    let currencyValue = Number(currencyRates.rates && currencyRates.rates[0] && currencyRates.rates[0].bid);

    if(!Number.isNaN(currencyValue)) {
      this.currencyValue = currencyValue;
    }
  }
}
