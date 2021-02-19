import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VigaOutputComponent } from './viga-output.component';

describe('VigaOutputComponent', () => {
  let component: VigaOutputComponent;
  let fixture: ComponentFixture<VigaOutputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VigaOutputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VigaOutputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
