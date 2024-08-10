import { TestBed } from '@angular/core/testing';

import { CaculateService } from './caculate.service';

describe('CaculateService', () => {
  let service: CaculateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CaculateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


});
