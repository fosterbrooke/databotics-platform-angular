import { TestBed, inject } from '@angular/core/testing';

import { DatainterceptorService } from './datainterceptor.service';

describe('DatainterceptorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DatainterceptorService]
    });
  });

  it('should be created', inject([DatainterceptorService], (service: DatainterceptorService) => {
    expect(service).toBeTruthy();
  }));
});
