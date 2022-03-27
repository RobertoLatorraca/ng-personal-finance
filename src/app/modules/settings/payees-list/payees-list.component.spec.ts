import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayeesListComponent } from './payees-list.component';

describe('PayeesListComponent', () => {
  let component: PayeesListComponent;
  let fixture: ComponentFixture<PayeesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PayeesListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PayeesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
