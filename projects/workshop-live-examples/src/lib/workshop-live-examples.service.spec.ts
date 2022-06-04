import { TestBed } from '@angular/core/testing';

import { WorkshopLiveExamplesService } from './workshop-live-examples.service';

describe('WorkshopLiveExamplesService', () => {
  let service: WorkshopLiveExamplesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WorkshopLiveExamplesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
