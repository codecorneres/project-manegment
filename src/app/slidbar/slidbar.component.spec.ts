import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SlidbarComponent } from './slidbar.component';

describe('SlidbarComponent', () => {
  let component: SlidbarComponent;
  let fixture: ComponentFixture<SlidbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SlidbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SlidbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
