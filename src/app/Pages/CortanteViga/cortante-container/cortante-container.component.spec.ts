import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CortanteContainerComponent } from './cortante-container.component';

describe('CortanteContainerComponent', () => {
  let component: CortanteContainerComponent;
  let fixture: ComponentFixture<CortanteContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CortanteContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CortanteContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
