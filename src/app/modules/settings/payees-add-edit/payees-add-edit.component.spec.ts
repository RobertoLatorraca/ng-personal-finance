import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayeesAddEditComponent } from './payees-add-edit.component';

describe('PayeesAddEditComponent', () => {
  let component: PayeesAddEditComponent;
  let fixture: ComponentFixture<PayeesAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PayeesAddEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PayeesAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
