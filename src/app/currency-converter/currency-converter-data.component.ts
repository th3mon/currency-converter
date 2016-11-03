import { Component, OnInit, Input, Output, OnChanges, EventEmitter } from '@angular/core';
import { CurrencyRatesService } from './currency-rates.service';

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
  @Input() currencyCode: string = 'USD';
  @Input() updateCurrencyValue: number;
  @Input() mode: string;
  rates: any;

  constructor(private _currencyRateService: CurrencyRatesService) {}

  ngOnInit() {
    this.getRates();
  }

  ngOnChanges(changes) {

    if (typeof changes === 'string') {
      console.log(changes, this);

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
        if (this.rates) {
          this.countValue(currentValue, code);
        } else {
          this._currencyRateService.getRates()
            .subscribe((
              rates => this.countValue(currentValue, code)
            ));
          }
      }
    }
  }

  countValue (currentValue, code) {
    if ('to' === this.mode) {
      if ('PLN' !== this.currencyCode) {
        currentValue = currentValue / this.getValueFromRate(this.currencyCode);
      }

      this.value = currentValue * this.getValueFromRate(code);
    } else if ('from' === this.mode) {
      if ('PLN' !== code) {
        currentValue = currentValue * this.getValueFromRate(code);
      }

      this.value = currentValue / this.getValueFromRate(this.currencyCode);
    }
  }

  getValueFromRate (code: string) : number {
    return 'PLN' === code ? 1 : this.rates.filter((rate) => {
      return rate.code === code;
    })[0].value;
  }

  parseToNumber (value) {
    let parsedValue = Number(value);

    if (!Number.isNaN(parsedValue)) {
      return parsedValue;
    }

    return value
  }

  getRates() {
    this._currencyRateService.getRates().subscribe(
      rates => {
        this.rates = rates;
        this.countValue(1, 'PLN');
      },
      error => this.errorMessage = <any>error
    );
  }

  onCurrencyValueChange(changes, currencyCode) {
    let data: string;

    currencyCode = currencyCode ? currencyCode : this.currencyCode;

    data = JSON.stringify({
      value: changes,
      currencyCode
    });

    this.currencyValueUpdate.emit(data);
  }
}
