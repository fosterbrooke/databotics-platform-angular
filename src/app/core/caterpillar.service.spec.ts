import { TestBed, inject } from '@angular/core/testing';

import { CaterpillarService } from './caterpillar.service';

describe('CaterpillarService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CaterpillarService]
    });
  });

  it('should be created', inject([CaterpillarService], (service: CaterpillarService) => {
    expect(service).toBeTruthy();
  }));
});
