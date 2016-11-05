/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CurrencyConverterCommon } from './currency-converter-common/currency-converter-common';

import { CurrencyConverterDataComponent } from './currency-converter-data.component';

describe('CurrencyConverterDataComponent', () => {
  let component: CurrencyConverterDataComponent;
  let fixture: ComponentFixture<CurrencyConverterDataComponent>;
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
      imports: [ FormsModule ],
      declarations: [ CurrencyConverterDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrencyConverterDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render label in a .currency-converter__data-label element', async(() => {
    let compiled = fixture.debugElement.nativeElement;

    expect(compiled.querySelector('.currency-converter__data-label').textContent)
      .toContain(component.amountLabel.toLocaleUpperCase());
  }));

  describe('convert', () => {
    beforeEach(() => {
      component.rates = ratesMock;
    });

    afterEach(() => {
      component.rates = null;
    });

    it('should not convert if currencies are same in to mode', function() {
      let
        currentValue = 100,
        code = 'PLN';

      component.mode = 'to';
      component.currencyCode = 'PLN';

      expect(component.convert(currentValue, code)).toBe(currentValue);
    });

    it('should not convert if currencies are same in from mode', function() {
      let
        currentValue = 100,
        code = 'PLN';

      component.mode = 'from';
      component.currencyCode = 'PLN';

      expect(component.convert(currentValue, code)).toBe(currentValue);
    });

    it('should convert value to mode', function() {
      let givenValue: number = 100;

      component.mode = 'to';
      component.currencyCode = 'USD';

      ratesMock.forEach((rate) => {
        let value: any = 0;

        value = givenValue / component.getRateValue(component.currencyCode);
        value *= component.getRateValue(rate.code);

        expect(component.convert(givenValue, rate.code)).toBe(value);
      });
    });

    it('should convert value to mode when components currency code is set to PLN', function() {
      let givenValue: number = 100;

      component.mode = 'to';
      component.currencyCode = 'PLN';

      ratesMock.forEach((rate) => {
        let value: any = 0;

        value = givenValue * component.getRateValue(rate.code);

        expect(component.convert(givenValue, rate.code)).toBe(value);
      });
    });

    it('should convert value from mode', function() {
      let givenValue: number = 100;

      component.mode = 'from';
      component.currencyCode = 'PLN';

      ratesMock.forEach((rate) => {
        let value: any = 0;

        value = givenValue * component.getRateValue(rate.code);
        value /= component.getRateValue(component.currencyCode);

        expect(component.convert(givenValue, rate.code)).toBe(value);
      });
    });
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
  });
});
