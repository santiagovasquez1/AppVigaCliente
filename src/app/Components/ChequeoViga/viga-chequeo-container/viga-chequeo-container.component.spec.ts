import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VigaChequeoContainerComponent } from './viga-chequeo-container.component';

describe('VigaChequeoContainerComponent', () => {
  let component: VigaChequeoContainerComponent;
  let fixture: ComponentFixture<VigaChequeoContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VigaChequeoContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VigaChequeoContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
