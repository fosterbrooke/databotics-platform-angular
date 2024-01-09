import { TestBed, inject } from '@angular/core/testing';

import { DatabotService } from './databot.service';

describe('DatabotService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DatabotService]
    });
  });

  it('should be created', inject([DatabotService], (service: DatabotService) => {
    expect(service).toBeTruthy();
  }));
});
