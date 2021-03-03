import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VigaChequeoOutputComponent } from './viga-chequeo-output.component';

describe('VigaChequeoOutputComponent', () => {
  let component: VigaChequeoOutputComponent;
  let fixture: ComponentFixture<VigaChequeoOutputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VigaChequeoOutputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VigaChequeoOutputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
