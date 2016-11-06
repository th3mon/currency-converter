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

  constructor(private _currencyRateService: CurrencyRatesService) {}

  ngOnInit() {
    this.getRates();
  }

  convert (from: any, rateValue: number) : number {
    let value: number;

    // value = from.value / rateValue;
    value = from.value * this.getRateValue(from.code);

    return value;
  }

  getRates () {
    this._currencyRateService.getRates().subscribe(
      rates => this.rates = rates,
      error => this.errorMessage = <any>error,
      () => {
        this.have.code = 'EUR';
        this.have.value = 10;
        this.have.rate = this.getRateValue(this.have.code);

        this.target.code = 'GBP';

        this.setDefaultsTarget();
      }
    );
  }

  setDefaultsTarget () {
    let value;

    this.target.rate = this.getRateValue(this.target.code);

    value = this.convertToBase(this.have);
    value = this.convertHaveToTarget(value, this.target.rate);
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

  convertHaveToTarget (haveValue, targetRate) {
    return haveValue / targetRate;
  }

  convertTargetToHave (targetValue, haveRate) {
    return targetValue / haveRate;
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

  onValueChange__have(from) {
    let value;

    from = JSON.parse(from);
    from.rate = this.getRateValue(from.code);

    value = this.convertToBase(from);
    value = this.convertHaveToTarget(value, this.target.rate);
    value = this.setDecimalPlaces(value);

    this.target.value = value;

    // update have
    this.have.value = from.value;
  }

  onCodeChange__have(from) {
    let value;

    from = JSON.parse(from);

    // update have
    this.have.code = from.code;
    this.have.value = from.value;
    this.have.rate = this.getRateValue(this.have.code);

    value = this.convertToBase(this.have);
    value = this.convertHaveToTarget(value, this.target.rate);
    value = this.setDecimalPlaces(value);

    this.target.value = value;
  }

  onValueChange__target(from) {
    let value;

    from = JSON.parse(from);
    from.rate = this.getRateValue(from.code);

    value = this.convertToBase(from);
    value = this.convertTargetToHave(value, this.have.rate);
    value = this.setDecimalPlaces(value);

    this.have.value = value;
  }

  isCodeSame (fromCode: string, toCode: string) : boolean {
    return fromCode === toCode;
  }

  onCodeChange__target (from) {
    let value;

    from = JSON.parse(from);
    from.rate = this.getRateValue(from.code);

    value = this.convertToBase(this.have);
    value = this.convertHaveToTarget(value, from.rate);
    // if (this.isCodeSame(from.code, this.have.code)) {
    //   value = this.have.value;
    // } else {
    // // value = from.value / rateValue;
    //   // value = from.value * this.have.rate;
    //   // value = this.convert(from, this.have.rate);

    //   // value = from.value * this.getRateValue(from.code);
    //   // value = value / this.have.rate;

    value = this.setDecimalPlaces(value);
    // }

    // this.target.value = value;
    this.target.code = from.code;
    this.target.rate = from.rate;
    this.target.value = value;
  }
}
