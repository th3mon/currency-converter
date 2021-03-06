/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { CurrencyRatesService } from './currency-rates.service';

import { CurrencyConverterComponent } from './currency-converter.component';
import { CurrencyConverterFormComponent } from './currency-converter-form/currency-converter-form.component';

describe('CurrencyConverterComponent', () => {
  let component: CurrencyConverterComponent;
  let fixture: ComponentFixture<CurrencyConverterComponent>;
  let ratesMock = [{
      code: 'PLN',
      value: 1
    }, {
      code: 'USD',
      value: 10
    }, {
      code: 'EUR',
      value: 100
    }, {
      code: 'GBP',
      value: 1000
    }];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpModule,
        FormsModule
      ],
      declarations: [
        CurrencyConverterComponent,
        CurrencyConverterFormComponent
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

  beforeEach(() => {
    component.rates = ratesMock;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should setup defaults for TARGET', () => {
    let expected: any = {};

    component.target = {
      code: 'GBP',
      value: null,
      rate: null
    };

    component.have = {
      code: 'PLN',
      value: 1,
      rate: component.getRateValue('PLN')
    };

    expected.code = component.target.code;
    expected.rate = component.getRateValue(component.target.code);
    expected.value = component.convertToBase(component.have);
    expected.value = component.convert(expected.value, expected.rate);
    expected.value = component.setDecimalPlaces(expected.value);

    component.setDefaultsTarget();

    expect(component.target).toEqual(expected);
  });

  describe('getRateValue', () => {
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

      expect(component.convert(from.value, rateValue)).toBe(from.value);
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

        expect(component.convert(from.value, rate.value)).toBe(value);
      });
    });

    it('should convert to base currency', () => {
      let
        from = {
          code: 'GBP',
          rate: component.getRateValue('GBP'),
          value: 10
        },

        expected = component.convertToBase(from);

      expect(from.value * from.rate).toBe(expected);
    });

    it(`should not convert to base currency, should return FROM's value instead`, () => {
      let
        from = {
          code: 'PLN',
          rate: component.getRateValue('GBP'),
          value: 10
        },

        expected = component.convertToBase(from);

      expect(from.value).toBe(expected);
    });
  });

  describe('on changes', () => {
    beforeEach(() => {
      this.from = {
        code: 'EUR',
        value: 10,
        rate: component.getRateValue('EUR')
      };

      this.expected = {
        code: 'EUR',
        value: null,
        rate: component.getRateValue('EUR')
      };
    });

    it(`should convert TARGET when HAVE's value changed`, () => {
      let changed: any = {};

      component.target = {
        code: 'GBP',
        value: null,
        rate: component.getRateValue('GBP')
      };

      this.expected.value = component.convertToBase(this.from);
      this.expected.value = component.convert(this.expected.value, component.target.rate);
      this.expected.value = component.setDecimalPlaces(this.expected.value);

      component.onValueChangeHave(JSON.stringify(this.from));
      changed = component.target;

      expect(changed.value).toEqual(this.expected.value);
    });

    it(`should update HAVE's value when HAVE's value changed`, () => {
      let changed: any = {};

      component.have.value = null;

      component.onValueChangeHave(JSON.stringify(this.from));
      changed = component.have.value;

      expect(changed).toEqual(this.from.value);
    });

    it(`should convert TARGET when HAVE's code changed`, () => {
      let changed: any = {};

      component.have = {
        code: 'PLN',
        value: 10
      };

      component.target = {
        code: 'EUR',
        rate: component.getRateValue('EUR')
      };

      // update have
      component.have = {
        code: this.from.code,
        value: this.from.value,
        rate: component.getRateValue(this.from.code)
      };

      // convert
      this.expected.value = component.convertToBase(component.have);
      this.expected.value = component.convert(this.expected.value, component.target.rate);
      this.expected.value = component.setDecimalPlaces(this.expected.value);

      component.onCodeChangeHave(JSON.stringify(this.from));
      changed = component.target;

      expect(changed).toEqual(this.expected);
    });

    it(`should update HAVE when HAVE's code changed`, () => {
      let
        expected = {
          code: this.from.code,
          value: this.from.value,
          rate: component.getRateValue(this.from.code)
        },

        changed: any = {};

      // set some values which will change
      component.have = {
        code: 'CODE',
        value: 0,
        rate: null
      };

      component.onCodeChangeHave(JSON.stringify(this.from));
      changed = component.have;

      expect(changed).toEqual(expected);
    });

    it(`should update HAVE's data when TARGET's value changed`, () => {
      let changed: any = {};

      component.have = {
        code: 'PLN',
        value: 10,
        rate: component.getRateValue('PLN')
      };

      this.expected.value = component.convertToBase(this.from);
      this.expected.value = component.convert(this.expected.value, component.have.rate);
      this.expected.value = component.setDecimalPlaces(this.expected.value);

      component.onValueChangeTarget(JSON.stringify(this.from));
      changed = component.have;

      expect(changed.value).toEqual(this.expected.value);
    });

    it(`should convert TARGET when TARGET's code changed`, () => {
      let changed: any = {};

      component.have = {
        code: 'PLN',
        value: 10
      };

      // convert
      this.expected.value = component.convertToBase(component.have);
      this.expected.value = component.convert(this.expected.value, this.from.rate);
      this.expected.value = component.setDecimalPlaces(this.expected.value);

      component.onCodeChangeTarget(JSON.stringify(this.from));
      changed = component.target;

      expect(changed).toEqual(this.expected);
    });
  });
});
