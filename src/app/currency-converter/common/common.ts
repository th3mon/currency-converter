export class Common {
  static parseToNumber (value: string) : any {
    let parsedValue: number = Number(value);

    if (!Number.isNaN(parsedValue)) {
      return parsedValue;
    }

    return value;
  }

  static isFloat (value: number) : boolean {
    return value % 1 !== 0;
  }

  static isNumber (value: any) : boolean {
    return typeof value === 'number';
  }
}
