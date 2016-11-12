/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { CurrencyConverterComponent } from './currency-converter/mock/currency-converter-component.mock';

describe('App: CurrencyConverter', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        CurrencyConverterComponent
      ]
    });
  });

  it('should create the app', async(() => {
    let
      fixture = TestBed.createComponent(AppComponent),
      app = fixture.debugElement.componentInstance;

    expect(app).toBeTruthy();
  }));

  it(`should have as title 'Currency Converter'`, async(() => {
    let
      fixture = TestBed.createComponent(AppComponent),
      app = fixture.debugElement.componentInstance;

    expect(app.title).toEqual('Currency Converter');
  }));

  it('should render title in a h1 tag', async(() => {
    let
      fixture = TestBed.createComponent(AppComponent),
      compiled = fixture.debugElement.nativeElement;

    fixture.detectChanges();

    expect(compiled.querySelector('h1').textContent).toContain('Currency Converter');
  }));
});
