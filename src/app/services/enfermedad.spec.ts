import { TestBed } from '@angular/core/testing';

import { Enfermedad } from './enfermedad';

describe('Enfermedad', () => {
  let service: Enfermedad;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Enfermedad);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
