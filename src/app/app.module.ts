import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { CurrencyConverterComponent } from './currency-converter/currency-converter.component';
import { CurrencyRatesService } from './currency-converter/currency-rates.service';
import { CurrencyConverterDataComponent } from './currency-converter/currency-converter-data.component';

@NgModule({
  declarations: [
    AppComponent,
    CurrencyConverterComponent,
    CurrencyConverterDataComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
  ],
  providers: [
    CurrencyRatesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
