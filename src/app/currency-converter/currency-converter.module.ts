import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrencyConverterComponent } from './currency-converter.component';
import { CurrencyRatesService } from './currency-rates.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [CurrencyConverterComponent],
  providers: [
    CurrencyRatesService
  ]
})
export class CurrencyConverterModule { }
