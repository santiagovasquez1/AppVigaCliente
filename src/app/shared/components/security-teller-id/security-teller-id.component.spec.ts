import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SecurityTellerIdComponent } from './security-teller-id.component';

describe('SecurityTellerIdComponent', () => {
  let component: SecurityTellerIdComponent;
  let fixture: ComponentFixture<SecurityTellerIdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SecurityTellerIdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecurityTellerIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
