import { Component, OnInit, Input, Output, OnChanges, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-currency-converter-data',
  templateUrl: './currency-converter-data.component.html',
  styleUrls: ['./currency-converter-data.component.css']
})
export class CurrencyConverterDataComponent implements OnInit, OnChanges {
  amountLabel: string = 'amount:';
  errorMessage: string;
  @Input() value: number;
  @Output() currencyValueUpdate: EventEmitter<string> = new EventEmitter<string>();
  @Output() currencyCodeChange: EventEmitter<string> = new EventEmitter<string>();
  @Input() currencyCode: string = 'USD';
  @Input() updateCurrencyValue: number;
  @Input() mode: string;
  @Input() rates: any;
  @Input() master;

  ngOnInit() {}

  ngOnChanges(changes) {
    if (changes.rates && changes.rates.currentValue) {
      this.countValue(1, 'PLN');
    }

    if (changes.updateCurrencyValue) {
      let
        currentValue: number,
        code: string;

      if (changes.updateCurrencyValue.currentValue) {
        currentValue = this.parseToNumber(changes.updateCurrencyValue.currentValue.value);
        code = changes.updateCurrencyValue.currentValue.currencyCode;
      }

      if (code && code !== this.currencyCode) {
        this.countValue(currentValue, code);
      } else if (code && code === this.currencyCode && currentValue !== this.value) {
        this.countValue(currentValue, code);
      }
    }
  }

  onCurrencyCodeChange(changes) {
    this.currencyCodeChange.emit(JSON.stringify({
      value: this.parseToNumber(this.value),
      currencyCode: changes,
      master: this.master
    }));
  }

  countValue (currentValue, code) {
    let value = currentValue;

    if ('to' === this.mode) {
      if ('PLN' !== this.currencyCode) {
        value = currentValue / this.getValueFromRate(this.currencyCode);
      }

      value = value * this.getValueFromRate(code);
    } else if ('from' === this.mode) {
      if ('PLN' !== code) {
        value = currentValue * this.getValueFromRate(code);
      }

      value = value / this.getValueFromRate(this.currencyCode);
    }

    if (value % 1 !== 0) {
      value = value.toFixed(3);
    }

    this.value = value;
  }

  getValueFromRate (code: string): number {
    return this.rates.filter((rate) => {
      return rate.code === code;
    })[0].value;
  }

  parseToNumber (value) {
    let parsedValue = Number(value);

    if (!Number.isNaN(parsedValue)) {
      return parsedValue;
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
