import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VigaInputComponent } from './viga-input.component';

describe('VigaInputComponent', () => {
  let component: VigaInputComponent;
  let fixture: ComponentFixture<VigaInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VigaInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VigaInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
