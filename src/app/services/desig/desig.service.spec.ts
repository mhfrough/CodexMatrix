import { TestBed, inject } from '@angular/core/testing';

import { DesigService } from './desig.service';

describe('DesigService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DesigService]
    });
  });

  it('should be created', inject([DesigService], (service: DesigService) => {
    expect(service).toBeTruthy();
  }));
});
