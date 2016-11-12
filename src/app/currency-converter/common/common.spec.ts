/* tslint:disable:no-unused-variable */
import { Common } from './common';

describe('Common', () => {
  let component: Common = new Common();

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Parsing values', () => {
    it('should parse String to Number', function() {
      expect(typeof Common.parseToNumber('5000')).toBe('number');
    });

    it(`should return value if it doesn't have number itself`, function() {
      expect(typeof Common.parseToNumber('There is no number')).toBe('string');
    });
  });

  describe('Testing values', () => {
    it('should test float positively', function() {
      expect(Common.isFloat(5.55)).toBeTruthy();
    });

    it('should test float negatively', function() {
      expect(Common.isFloat(5)).toBeFalsy();
    });

    it('should test number positively', function() {
      expect(Common.isNumber(5)).toBeTruthy();
    });

    it('should test number negatively', function() {
      expect(Common.isNumber(null)).toBeFalsy();
    });
  });
});
