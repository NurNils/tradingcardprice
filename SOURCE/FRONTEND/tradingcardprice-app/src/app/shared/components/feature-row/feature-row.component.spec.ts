import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeatureRowComponent } from './feature-row.component';

describe('FeatureRowComponent', () => {
  let component: FeatureRowComponent;
  let fixture: ComponentFixture<FeatureRowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FeatureRowComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeatureRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
