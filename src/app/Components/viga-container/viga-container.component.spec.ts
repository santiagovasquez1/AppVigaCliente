import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VigaContainerComponent } from './viga-container.component';

describe('VigaContainerComponent', () => {
  let component: VigaContainerComponent;
  let fixture: ComponentFixture<VigaContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VigaContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VigaContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
