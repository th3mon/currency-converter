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

  master = {
    code: 'PLN',
    value: 1
  };

  slave = {
    code: 'USD',
    value: 0
  };

  constructor(private _currencyRateService: CurrencyRatesService) {}

  ngOnInit() {
    this.getRates();
  }

  getRates() {
    this._currencyRateService.getRates().subscribe(
      rates => this.rates = rates,
      error => this.errorMessage = <any>error,
      () => this.setDefaults()
    );
  }

  setDefaults() {
    this.slave.value = this.getValueFromRate(this.slave.code);
  }


  getValueFromRate (code: string): number {
    return this.rates.filter((rate) => {
      return rate.code === code;
    })[0].value;
  }

  updateCurrencyValue(changes) {
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

  onCurrencyCodeUpdateSlave(changes) {
    this.updateCurrencyValue(JSON.stringify({
      currencyCode: this.master.code,
      value: this.master.value
    }));
  }

  onCurrencyCodeUpdateMaster(changes) {
    this.updateCurrencyValue(changes);
  }
}
