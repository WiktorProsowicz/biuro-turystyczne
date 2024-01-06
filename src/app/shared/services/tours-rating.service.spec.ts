import { TestBed } from '@angular/core/testing';

import { ToursRatingService } from './tours-rating.service';

describe('ToursRatingService', () => {
  let service: ToursRatingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ToursRatingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
