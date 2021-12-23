import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TranslateItemDialogComponent } from './translate-item-dialog.component';

describe('TranslateItemDialogComponent', () => {
  let component: TranslateItemDialogComponent;
  let fixture: ComponentFixture<TranslateItemDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TranslateItemDialogComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TranslateItemDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
