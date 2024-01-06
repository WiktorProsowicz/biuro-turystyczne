import { TestBed } from '@angular/core/testing';

import { ToursBookingService } from './tours-booking.service';

describe('ToursBookingService', () => {
  let service: ToursBookingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ToursBookingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
