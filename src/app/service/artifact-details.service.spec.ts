import { TestBed } from '@angular/core/testing';

import { ArtifactDetailsService } from './artifact-icons.service';

describe('ArtifactDetailsService', () => {
  let service: ArtifactDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArtifactDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
