import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SocietyexpenseComponent } from './societyexpense.component';

describe('SocietyexpenseComponent', () => {
  let component: SocietyexpenseComponent;
  let fixture: ComponentFixture<SocietyexpenseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SocietyexpenseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SocietyexpenseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
