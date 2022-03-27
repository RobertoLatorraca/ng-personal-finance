import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BanksAddEditComponent } from './banks-add-edit.component';

describe('BanksAddEditComponent', () => {
  let component: BanksAddEditComponent;
  let fixture: ComponentFixture<BanksAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BanksAddEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BanksAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
