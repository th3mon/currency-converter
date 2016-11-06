import { Component, OnInit } from '@angular/core';
import { CurrencyRatesService } from './currency-rates.service';
import { CurrencyConverterCommon } from './currency-converter-common/currency-converter-common';

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
    rate: 1,
    value: 1
  };

  slave: any = {
    code: 'USD',
    rate: 0,
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
      () => this.setDefaultsSlave()
    );
  }

  setDefaultsSlave () {
    let value;

    this.slave.rate = this.getRateValue(this.slave.code);

    value = this.convert({
      value: this.master.value,
      code: this.master.code
    }, this.slave.rate);

    value = this.setDecimalPlaces(value);
    this.slave.value = value;
  }

  setDecimalPlaces(value: number, decimalPlaces: number = 3) : string {
    if (CurrencyConverterCommon.isFloat(value)) {
      return value.toFixed(decimalPlaces);
    }

    return value.toString();
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

  onValueChange__Master(from) {
    let value;

    from = JSON.parse(from);
    value = this.convert(from, this.slave.rate);
    value = this.setDecimalPlaces(value);

    this.slave.value = value;
  }

  onCodeChange__Master(from) {
    let value;

    from = JSON.parse(from);
    value = this.convert(from, this.slave.rate);
    value = this.setDecimalPlaces(value);

    this.slave.value = value;
  }

  onValueChange__Slave(from) {
    let value;

    from = JSON.parse(from);
    value = this.convert(from, this.master.rate);
    value = this.setDecimalPlaces(value);

    this.master.value = value;
  }

  onCodeChange__Slave (from) {
    let value;

    from = JSON.parse(from);
    value = this.convert(from, this.master.rate);
    value = this.setDecimalPlaces(value);

    this.slave.value = value;
  }
}
