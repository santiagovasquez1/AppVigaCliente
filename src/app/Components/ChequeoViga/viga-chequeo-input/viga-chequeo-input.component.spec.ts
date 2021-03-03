import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VigaChequeoInputComponent } from './viga-chequeo-input.component';

describe('VigaChequeoInputComponent', () => {
  let component: VigaChequeoInputComponent;
  let fixture: ComponentFixture<VigaChequeoInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VigaChequeoInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VigaChequeoInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
