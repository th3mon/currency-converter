/* tslint:disable:no-unused-variable */
import { CurrencyConverterCommon } from './currency-converter-common';

describe('CurrencyConverterCommon', () => {
  let component: CurrencyConverterCommon = new CurrencyConverterCommon();

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should parse String to Number', function() {
    expect(typeof CurrencyConverterCommon.parseToNumber("5000")).toBe("number");
  });

  it(`should return value if it doesn't have number itself`, function() {
    expect(typeof CurrencyConverterCommon.parseToNumber("There is no number")).toBe("string");
  });
});
