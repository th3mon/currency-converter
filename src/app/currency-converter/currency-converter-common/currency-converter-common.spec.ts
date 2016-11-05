/* tslint:disable:no-unused-variable */
import { CurrencyConverterCommon } from './currency-converter-common';

describe('CurrencyConverterCommon', () => {
  let component: CurrencyConverterCommon = new CurrencyConverterCommon();

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Parsing values', () => {
    it('should parse String to Number', function() {
      expect(typeof CurrencyConverterCommon.parseToNumber("5000")).toBe("number");
    });

    it(`should return value if it doesn't have number itself`, function() {
      expect(typeof CurrencyConverterCommon.parseToNumber("There is no number")).toBe("string");
    });
  });

  describe('Testing values', () => {
    it('should test float positively', function() {
      expect(CurrencyConverterCommon.isFloat(5.55)).toBeTruthy();
    });

    it('should test float negatively', function() {
      expect(CurrencyConverterCommon.isFloat(5)).toBeFalsy();
    });
  });
});
