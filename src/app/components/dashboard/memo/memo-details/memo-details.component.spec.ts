import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemoDetailsComponent } from './memo-details.component';

describe('MemoDetailsComponent', () => {
  let component: MemoDetailsComponent;
  let fixture: ComponentFixture<MemoDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemoDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemoDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
