import { TestBed, inject } from '@angular/core/testing';

import { DeptService } from './dept.service';

describe('DeptService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DeptService]
    });
  });

  it('should be created', inject([DeptService], (service: DeptService) => {
    expect(service).toBeTruthy();
  }));
});
