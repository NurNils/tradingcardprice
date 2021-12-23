import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupercategoryDialogComponent } from './supercategory-dialog.component';

describe('SupercategoryDialogComponent', () => {
  let component: SupercategoryDialogComponent;
  let fixture: ComponentFixture<SupercategoryDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SupercategoryDialogComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupercategoryDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
