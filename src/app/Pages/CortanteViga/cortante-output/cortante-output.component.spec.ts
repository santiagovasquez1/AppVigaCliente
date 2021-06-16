import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CortanteOutputComponent } from './cortante-output.component';

describe('CortanteOutputComponent', () => {
  let component: CortanteOutputComponent;
  let fixture: ComponentFixture<CortanteOutputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CortanteOutputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CortanteOutputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
