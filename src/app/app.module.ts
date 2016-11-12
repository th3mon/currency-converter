import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { CurrencyConverterComponent } from './currency-converter/currency-converter.component';
import { RatesService } from './currency-converter/rates/rates.service';
import { FormComponent } from './currency-converter/form/form.component';

@NgModule({
  declarations: [
    AppComponent,
    CurrencyConverterComponent,
    FormComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
  ],
  providers: [
    RatesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
