import { TestBed } from '@angular/core/testing';

import { GotoschoolService } from './gotoschool.service';

describe('GotoschoolService', () => {
  let service: GotoschoolService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GotoschoolService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
