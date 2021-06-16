import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CortanteBaseControlComponent } from './cortante-base-control.component';

describe('CortanteBaseControlComponent', () => {
  let component: CortanteBaseControlComponent;
  let fixture: ComponentFixture<CortanteBaseControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CortanteBaseControlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CortanteBaseControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
