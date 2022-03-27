import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrenciesAddEditComponent } from './currencies-add-edit.component';

describe('CurrenciesAddEditComponent', () => {
  let component: CurrenciesAddEditComponent;
  let fixture: ComponentFixture<CurrenciesAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CurrenciesAddEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrenciesAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
