import { Component, OnInit, Input, Output, OnChanges, EventEmitter } from '@angular/core';
import { CurrencyConverterCommon } from './currency-converter-common/currency-converter-common';

@Component({
  selector: 'app-currency-converter-data',
  templateUrl: './currency-converter-data.component.html',
  styleUrls: ['./currency-converter-data.component.css']
})
export class CurrencyConverterDataComponent implements OnInit, OnChanges {
  private BASE_CODE: string = 'PLN';

  amountLabel: string = 'amount:';
  errorMessage: string;
  @Input() value: number;
  @Output() currencyValueUpdate: EventEmitter<string> = new EventEmitter<string>();
  @Output() currencyCodeChange: EventEmitter<string> = new EventEmitter<string>();
  @Input() currencyCode: string = 'USD';
  @Input() updateCurrencyValue: number;
  @Input() mode: string = 'from';
  @Input() rates: any;
  @Input() master;

  ngOnInit() {}

  ngOnChanges(changes) {
    let value: any;

    if (changes.value) {
      value = changes.value.currentValue;
    }

    if (changes.rates && changes.rates.currentValue) {
      value = this.convert(1, this.BASE_CODE);
    }

    if (changes.updateCurrencyValue) {
      let
        currentValue: number,
        code: string;

      if (changes.updateCurrencyValue.currentValue) {
        currentValue = CurrencyConverterCommon.parseToNumber(changes.updateCurrencyValue.currentValue.value);
        code = changes.updateCurrencyValue.currentValue.currencyCode;
      }

      if (code && code !== this.currencyCode) {
        value = this.convert(currentValue, code);
      } else if (code && code === this.currencyCode && currentValue !== this.value) {
        value = this.convert(currentValue, code);
      } else if (typeof currentValue === "number") {
        value = currentValue;
      }

      if (CurrencyConverterCommon.isFloat(value)) {
        value = value.toFixed(3);
      }

      this.value = value;
    }
  }

  onCurrencyCodeChange(changes) {
    this.currencyCodeChange.emit(JSON.stringify({
      value: this.value,
      currencyCode: changes,
      master: this.master
    }));
  }

  convert (value: number, code: string) : number {
    if ('from' === this.mode) {
      if (this.BASE_CODE !== code) {
        value *= this.getRateValue(code);
      }

      value = value / this.getRateValue(this.currencyCode);
    } else if ('to' === this.mode) {
      if (this.BASE_CODE !== this.currencyCode) {
        value /= this.getRateValue(this.currencyCode);
      }

      value = value * this.getRateValue(code);
    }

    return value;
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

  onCurrencyValueChange(changes, currencyCode) {
    currencyCode = currencyCode ? currencyCode : this.currencyCode;

    this.currencyValueUpdate.emit(JSON.stringify({
      value: changes,
      currencyCode,
      master: this.master
    }));
  }
}
