import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScrolltopComponent } from './scrolltop.component';

describe('ScrolltopComponent', () => {
  let component: ScrolltopComponent;
  let fixture: ComponentFixture<ScrolltopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ScrolltopComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScrolltopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
