import { TestBed } from '@angular/core/testing';

import { GetdonneeService } from './getdonnee.service';

describe('GetdonneeService', () => {
  let service: GetdonneeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetdonneeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
