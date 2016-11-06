import { Component, OnInit, Input, Output, OnChanges, EventEmitter } from '@angular/core';
import { CurrencyConverterCommon } from '../currency-converter-common/currency-converter-common';

@Component({
  selector: 'app-currency-converter-form',
  templateUrl: './currency-converter-form.component.html',
  styleUrls: ['./currency-converter-form.component.css']
})
export class CurrencyConverterFormComponent implements OnInit, OnChanges {
  amountLabel: string = 'amount:';

  ngOnInit () {}

  ngOnChanges (changes) {
    console.log(changes);
  }

  @Output() valueChanged: EventEmitter<string> = new EventEmitter<string>();
  changeValue (value) {
    this.valueChanged.next(value);
  }
}
