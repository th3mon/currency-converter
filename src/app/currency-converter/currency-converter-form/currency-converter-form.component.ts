import { Component, OnInit, Input, Output, OnChanges, EventEmitter } from '@angular/core';
import { CurrencyConverterCommon } from '../currency-converter-common/currency-converter-common';

@Component({
  selector: 'app-currency-converter-form',
  templateUrl: './currency-converter-form.component.html',
  styleUrls: ['./currency-converter-form.component.css']
})
export class CurrencyConverterFormComponent implements OnInit, OnChanges {
  amountLabel: string = 'amount:';
  @Input() rates: any;
  @Input() rate: number;
  @Input() code: string;
  @Input() value: number;

  ngOnInit () {}

  ngOnChanges (changes) {
  }

  @Output() valueChanged: EventEmitter<string> = new EventEmitter<string>();
  changeValue (value) {
    this.valueChanged.next(JSON.stringify({
      value,
      code: this.code
    }));
  }

  @Output() codeChanged: EventEmitter<string> = new EventEmitter<string>();
  changeCode (code) {
    this.codeChanged.next(JSON.stringify({
      value: this.value,
      code
    }));
  }
}
