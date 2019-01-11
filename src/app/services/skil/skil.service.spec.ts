import { TestBed, inject } from '@angular/core/testing';

import { SkilService } from './skil.service';

describe('SkilService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SkilService]
    });
  });

  it('should be created', inject([SkilService], (service: SkilService) => {
    expect(service).toBeTruthy();
  }));
});
