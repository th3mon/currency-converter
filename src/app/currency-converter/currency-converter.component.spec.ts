/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { CurrencyRatesService } from './currency-rates.service';

import { CurrencyConverterComponent } from './currency-converter.component';
import { CurrencyConverterDataComponent } from './currency-converter-data.component';

describe('CurrencyConverterComponent', () => {
  let component: CurrencyConverterComponent;
  let fixture: ComponentFixture<CurrencyConverterComponent>;
  let ratesMock = [{
    code: 'PLN',
    value: 1
  }, {
    code: 'USD',
    value: 0.259
  }, {
    code: 'EUR',
    value: 0.233
  }, {
    code: 'GBP',
    value: 0.208
  }];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpModule,
        FormsModule
      ],
      declarations: [
        CurrencyConverterComponent,
        CurrencyConverterDataComponent
      ],
      providers: [
        CurrencyRatesService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrencyConverterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('getRateValue', () => {
    beforeEach(() => {
      component.rates = ratesMock;
    });

    afterEach(() => {
      component.rates = null;
    });

    it('should return PLN rate value', function() {
      expect(component.getRateValue('PLN')).toBe(ratesMock[0].value);
    });

    it('should return PLN rate value', function() {
      expect(component.getRateValue('USD')).toBe(ratesMock[1].value);
    });

    it('should return PLN rate value', function() {
      expect(component.getRateValue('EUR')).toBe(ratesMock[2].value);
    });

    it('should return PLN rate value', function() {
      expect(component.getRateValue('GBP')).toBe(ratesMock[3].value);
    });

    it('should return falsy when empty string given', function() {
      expect(component.getRateValue('')).toBeFalsy();
    });

    it('should return falsy when null given', function() {
      expect(component.getRateValue(null)).toBeFalsy();
    });
  });

  describe('convert', () => {
    beforeEach(() => {
      component.rates = ratesMock;
    });

    afterEach(() => {
      component.rates = null;
    });

    it('should not convert if currencies are same', function() {
      let
        from = {
          code: 'PLN',
          value: 10
        },

        rateValue: number = component.getRateValue(from.code);

      expect(component.convert(from, rateValue)).toBe(from.value);
    });

    it('should convert value', function() {
      let
        from = {
          code: 'PLN',
          value: 10
        },

        value: number;

      ratesMock.forEach((rate) => {
        value = from.value / rate.value;
        value *= component.getRateValue(from.code);

        expect(component.convert(from, rate.value)).toBe(value);
      });
    });
  });
});
