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
  @Output() valueChanged: EventEmitter<string> = new EventEmitter<string>();
  @Output() codeChanged: EventEmitter<string> = new EventEmitter<string>();

  ngOnInit () {}

  ngOnChanges (changes) {
  }

  changeValue (value) {
    this.valueChanged.next(JSON.stringify({
      value,
      code: this.code
    }));
  }

  changeCode (code) {
    this.codeChanged.next(JSON.stringify({
      value: this.value,
      code
    }));
  }
}
