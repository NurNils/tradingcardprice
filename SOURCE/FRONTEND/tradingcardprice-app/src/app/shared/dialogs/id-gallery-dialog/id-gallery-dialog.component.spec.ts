import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IdGalleryDialogComponent } from './id-gallery-dialog.component';

describe('IdGalleryDialogComponent', () => {
  let component: IdGalleryDialogComponent;
  let fixture: ComponentFixture<IdGalleryDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [IdGalleryDialogComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IdGalleryDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
