import { TestBed } from '@angular/core/testing';

import { AdminCarServiceService } from './admin-car-service.service';

describe('AdminCarServiceService', () => {
  let service: AdminCarServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminCarServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
