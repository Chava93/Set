import { TestBed, inject } from '@angular/core/testing';

import { CloudfunctionsService } from './cloudfunctions.service';

describe('CloudfunctionsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CloudfunctionsService]
    });
  });

  it('should be created', inject([CloudfunctionsService], (service: CloudfunctionsService) => {
    expect(service).toBeTruthy();
  }));
});
