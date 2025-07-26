import { TestBed } from '@angular/core/testing';

import { DockerDataService } from './docker-data.service';

describe('DockerDataService', () => {
  let service: DockerDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DockerDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
