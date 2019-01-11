import { TestBed, inject } from '@angular/core/testing';

import { ProjService } from './proj.service';

describe('ProjService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProjService]
    });
  });

  it('should be created', inject([ProjService], (service: ProjService) => {
    expect(service).toBeTruthy();
  }));
});
