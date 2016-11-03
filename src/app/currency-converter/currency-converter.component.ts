import { Component, OnInit } from '@angular/core';
import { CurrencyRatesService } from './currency-rates.service';

@Component({
  selector: 'app-currency-converter',
  templateUrl: './currency-converter.component.html',
  styleUrls: ['./currency-converter.component.css']
})
export class CurrencyConverterComponent implements OnInit {
  title: string = 'Currency I Have:';
  updated: any;
  errorMessage: string;
  rates: any;

  constructor(private _currencyRateService: CurrencyRatesService) {}

  ngOnInit() {
    this.getRates();
  }

  getRates() {
    this._currencyRateService.getRates().subscribe(
      rates => this.rates = rates,
      error => this.errorMessage = <any>error
    );
  }

  update(changes) {
    changes = JSON.parse(changes);

    this.updated = changes;
  }
}
