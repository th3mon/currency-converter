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

  constructor(private _currencyRateService: CurrencyRatesService) {}

  ngOnInit() {
    this.getRates();
  }

  ngOnChanges(changes) {
    console.log(changes);
    if (typeof changes === 'string') {
      this.getRates();
    }
    else if (changes.updateCurrencyValue) {
      if (changes.updateCurrencyValue.currentValue !== this.currencyValue) {
        console.log(changes.updateCurrencyValue.currentValue);
        console.log(this.currencyValue);

        if ('from' === this.mode) {
          this.currencyValue = changes.updateCurrencyValue.currentValue / this.currencyRate;
        }
        else if ('to' === this.mode) {
          this.currencyValue = changes.updateCurrencyValue.currentValue * this.currencyRate;
        }
      }
    }
  }

  getRates() {
    let polishCurrencyRate = {
      rates: [{
        bid: 1
      }]
    };

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

  onCurrencyValueChange(changes) {
    this.currencyValueUpdate.emit(changes);
  }
}
