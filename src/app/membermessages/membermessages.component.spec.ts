import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MembermessagesComponent } from './membermessages.component';

describe('MembermessagesComponent', () => {
  let component: MembermessagesComponent;
  let fixture: ComponentFixture<MembermessagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MembermessagesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MembermessagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
