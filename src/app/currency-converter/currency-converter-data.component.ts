import { Component, OnInit, Input, Output, OnChanges, EventEmitter } from '@angular/core';
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
  @Input() currencyValue: number;
  @Output() currencyValueUpdate: EventEmitter<string> = new EventEmitter<string>();
  @Input() currencyCode: string = 'USD';
  @Input() updateCurrencyValue: number;
  currencyRate: number;
  @Input() mode: string;
  rates: any;

  constructor(private _currencyRateService: CurrencyRatesService) {}

  ngOnInit() {
    this.getRates();
  }

  ngOnChanges(changes) {
    if (typeof changes === 'string') {
    }
    else if (changes.updateCurrencyValue) {
      let currentValue = changes.updateCurrencyValue.currentValue,
        currentCurrencyValue = this.parseToNumber(this.currencyValue),
        code = changes.updateCurrencyValue.currentValue && changes.updateCurrencyValue.currentValue.currencyCode;

      if (currentValue && typeof currentValue === "string") {
        currentValue = this.parseToNumber(currentValue);
      }
      else if (currentValue && typeof currentValue !== 'number') {
        currentValue = this.parseToNumber(currentValue.value);
      }

      if (code && code !== this.currencyCode) {
        this._currencyRateService.getRates()
          .subscribe((
            rates => {
              this.rates = rates;

              if('to' === this.mode) {
                if('PLN' !== this.currencyCode) {
                  currentValue = currentValue / this.getValueFromRate(this.currencyCode);
                }

                this.currencyValue = currentValue * this.getValueFromRate(code);
              }
              else if('from' === this.mode) {
                if('PLN' !== code) {
                  currentValue = currentValue * this.getValueFromRate(code);
                }

                this.currencyValue = currentValue / this.getValueFromRate(this.currencyCode);
              }
            }
          ));
      }
    }
  }

  getValueFromRate(code: string) : number {
    let rate = 'PLN' === code ? 1 : this.rates.filter((rate) => {
      return rate.code === code;
    })[0].value;

    return rate;
  }

  parseToNumber (value) {
    let parsedValue = Number(value);

    if (!Number.isNaN(parsedValue)) {
      return parsedValue;
    }

    return value
  }

  getRates() {
    let polishCurrencyRate = {
      rates: [{
        bid: 1
      }]
    };

    this._currencyRateService.getRates()
      .subscribe(
        rates => this.rates = rates,
        error => this.errorMessage = <any>error
      );

    if ('PLN' === this.currencyCode) {
      this.setCurrencyValue(polishCurrencyRate);
      this.setCurrencyRate(polishCurrencyRate);
    }
    else {
      this._currencyRateService.getRate(this.currencyCode)
        .subscribe(
          currencyRates => {
            this.setCurrencyValue(currencyRates);
            this.setCurrencyRate(currencyRates);
          },
          error => this.errorMessage = <any>error
        );
    }
  }

  setCurrencyValue(currencyRates): void {
    this.currencyValue = this.parseCurrencyRates(currencyRates);
  }

  setCurrencyRate(currencyRates) {
    this.currencyRate = this.parseCurrencyRates(currencyRates);
  }

  parseCurrencyRates(currencyRates): number {
    let value = Number(currencyRates.rates && currencyRates.rates[0] && currencyRates.rates[0].bid);

    if(!Number.isNaN(value)) {
      return value;
    }

    return null;
  }

  onCurrencyValueChange(changes, currencyCode) {
    let data: string;

    currencyCode = currencyCode ? currencyCode : this.currencyCode;

    data =  JSON.stringify({
      value: changes,
      currencyCode
    });

    this.currencyValueUpdate.emit(data);
  }
}
