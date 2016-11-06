import { Component, OnInit } from '@angular/core';
import { CurrencyRatesService } from './currency-rates.service';

@Component({
  selector: 'app-currency-converter',
  templateUrl: './currency-converter.component.html',
  styleUrls: ['./currency-converter.component.css']
})
export class CurrencyConverterComponent implements OnInit {
  title: string = 'Currency I Have:';
  updatedCurrencyValue: any;
  errorMessage: string;
  rates: any;

  master: any = {
    code: 'PLN',
    value: 1
  };

  slave: any = {
    code: 'USD',
    value: 0
  };

  constructor(private _currencyRateService: CurrencyRatesService) {}

  ngOnInit() {
    this.getRates();
  }

  convert (from: any, rateValue: number) : number {
    let value: number;

    value = from.value / rateValue;
    value *= this.getRateValue(from.code);

    return value;
  }

  getRates () {
    this._currencyRateService.getRates().subscribe(
      rates => this.rates = rates,
      error => this.errorMessage = <any>error,
      () => this.setDefaults()
    );
  }

  setDefaults () {
    this.slave.value = this.getRateValue(this.slave.code);
  }

  getRateValue (code: string): number {
    let
      filteredRates: [any] = this.rates.filter((rate) => {
        return rate.code === code;
      }),

      value: number;

    if (filteredRates.length) {
      value = filteredRates[0].value;
    }

    return value;
  }

  updateCurrencyValue (changes) {
    changes = JSON.parse(changes);

    if (changes.master) {
      this.master = {
        code: changes.currencyCode,
        value: changes.value
      };

    } else if (changes.slave) {
      this.slave = {
        code: changes.currencyCode,
        value: changes.value
      };
    }

    this.updatedCurrencyValue = changes;
  }

  onCurrencyCodeUpdateSlave (changes) {
    this.updateCurrencyValue(JSON.stringify({
      currencyCode: this.master.code,
      value: this.master.value
    }));
  }

  onCurrencyCodeUpdateMaster (changes) {
    this.updateCurrencyValue(changes);
  }
}
