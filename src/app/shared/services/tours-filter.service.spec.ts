import { TestBed } from '@angular/core/testing';

import { ToursFilterService } from './tours-filter.service';

describe('ToursFilterService', () => {
  let service: ToursFilterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ToursFilterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
