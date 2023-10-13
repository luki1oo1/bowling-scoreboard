import { TestBed } from '@angular/core/testing';

import { ScoreValidationService } from './score-validation.service';

describe('ScoreValidationService', () => {
  let service: ScoreValidationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScoreValidationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
