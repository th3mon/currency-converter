/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { CurrencyConverterFormComponent } from './currency-converter-form.component';

describe('CurrencyConverterFormComponent', () => {
  let component: CurrencyConverterFormComponent;
  let fixture: ComponentFixture<CurrencyConverterFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule ],
      declarations: [ CurrencyConverterFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrencyConverterFormComponent);
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

  it('should raise valueChanged event when value is changed', function() {
    let
      expectedValue: number = 10,
      input = fixture.debugElement.query(By.css('.currency-converter__data-input')),
      changedValue: string;

    component.valueChanged.subscribe((value) => {
      changedValue = value
    });

    input.triggerEventHandler('keyup', {
      target: {
        value: expectedValue
      }
    });

    expect(changedValue).toBe(expectedValue);
  });
});
