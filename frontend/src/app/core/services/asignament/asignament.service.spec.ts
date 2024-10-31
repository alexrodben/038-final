import { TestBed } from '@angular/core/testing';

import { AsignamentService } from './asignament.service';

describe('AsignamentService', () => {
  let service: AsignamentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AsignamentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
