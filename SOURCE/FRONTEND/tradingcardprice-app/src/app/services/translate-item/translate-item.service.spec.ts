import { TestBed } from '@angular/core/testing';

import { TranslateItemService } from './translate-item.service';

describe('TranslateItemService', () => {
  let service: TranslateItemService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TranslateItemService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
