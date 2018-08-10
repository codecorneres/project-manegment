import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeactivetaskComponent } from './deactivetask.component';

describe('DeactivetaskComponent', () => {
  let component: DeactivetaskComponent;
  let fixture: ComponentFixture<DeactivetaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeactivetaskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeactivetaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
