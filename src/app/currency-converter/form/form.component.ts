import { Component, OnInit, Input, Output, OnChanges, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-currency-converter-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit, OnChanges {
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
