import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CortanteInputComponent } from './cortante-input.component';

describe('CortanteInputComponent', () => {
  let component: CortanteInputComponent;
  let fixture: ComponentFixture<CortanteInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CortanteInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CortanteInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
