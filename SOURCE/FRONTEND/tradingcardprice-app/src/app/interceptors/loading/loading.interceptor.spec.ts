import { TestBed } from '@angular/core/testing';

import { LoadingInterceptor } from './loading.interceptor';

describe('LoadingInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LoadingInterceptor = TestBed.get(LoadingInterceptor);
    expect(service).toBeTruthy();
  });
});
