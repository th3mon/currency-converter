import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrencyConverterComponent } from './currency-converter.component';
import { RatesService } from './rates/rates.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [CurrencyConverterComponent],
  providers: [
    RatesService
  ]
})
export class CurrencyConverterModule { }
