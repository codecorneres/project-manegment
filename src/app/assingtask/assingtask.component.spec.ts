import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssingtaskComponent } from './assingtask.component';

describe('AssingtaskComponent', () => {
  let component: AssingtaskComponent;
  let fixture: ComponentFixture<AssingtaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssingtaskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssingtaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
