import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddsocietyexpensesComponent } from './addsocietyexpenses.component';

describe('AddsocietyexpensesComponent', () => {
  let component: AddsocietyexpensesComponent;
  let fixture: ComponentFixture<AddsocietyexpensesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddsocietyexpensesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddsocietyexpensesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
