/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { CurrencyConverterDataComponent } from './currency-converter-data.component';

describe('CurrencyConverterDataComponent', () => {
  let component: CurrencyConverterDataComponent;
  let fixture: ComponentFixture<CurrencyConverterDataComponent>;

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
});
