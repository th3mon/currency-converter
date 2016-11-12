import { Component, OnInit } from '@angular/core';
import { RatesService } from './rates/rates.service';
import { Common } from './common/common';

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

  BASE: any = {
    code: 'PLN',
    rate: 1
  };

  have: any = {
    code: 'PLN',
    rate: 1,
    value: 1
  };

  target: any = {
    code: 'USD',
    rate: 0,
    value: 0
  };

  constructor(private _currencyRateService: RatesService) {}

  ngOnInit() {
    this.getRates();
  }

  getRates () {
    this._currencyRateService.getRates().subscribe(
      rates => this.rates = rates,
      error => this.errorMessage = <any>error,
      () => this.setDefaultsTarget()
    );
  }

  setDefaultsTarget () {
    let value;

    this.target.rate = this.getRateValue(this.target.code);

    value = this.convertToBase(this.have);
    value = this.convert(value, this.target.rate);
    value = this.setDecimalPlaces(value);

    this.target.value = value;
  }

  convertToBase (from) {
    if (from.code !== this.BASE.code) {
      return from.value * from.rate;
    } else {
      return from.value;
    }
  }

  convert (value: number, rate: number) : number {
    return value / rate;
  }

  setDecimalPlaces(value: number, decimalPlaces: number = 3) : string {
    if (Common.isFloat(value)) {
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

  onValueChangeHave(from) {
    let value;

    from = JSON.parse(from);
    from.rate = this.getRateValue(from.code);

    value = this.convertToBase(from);
    value = this.convert(value, this.target.rate);
    value = this.setDecimalPlaces(value);

    this.target.value = value;

    // update have
    this.have.value = from.value;
  }

  onCodeChangeHave(from) {
    let value;

    from = JSON.parse(from);

    // update have
    this.have.code = from.code;
    this.have.value = from.value;
    this.have.rate = this.getRateValue(this.have.code);

    value = this.convertToBase(this.have);
    value = this.convert(value, this.target.rate);
    value = this.setDecimalPlaces(value);

    this.target.value = value;
  }

  onValueChangeTarget(from) {
    let value;

    from = JSON.parse(from);
    from.rate = this.getRateValue(from.code);

    value = this.convertToBase(from);
    value = this.convert(value, this.have.rate);
    value = this.setDecimalPlaces(value);

    this.have.value = value;
  }

  onCodeChangeTarget (from) {
    let value;

    from = JSON.parse(from);
    from.rate = this.getRateValue(from.code);

    value = this.convertToBase(this.have);
    value = this.convert(value, from.rate);
    value = this.setDecimalPlaces(value);

    this.target.code = from.code;
    this.target.rate = from.rate;
    this.target.value = value;
  }
}
