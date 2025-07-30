import { TestBed } from '@angular/core/testing';

import { DockerGeneratorService } from './docker-generator.service';

describe('DockerGeneratorService', () => {
  let service: DockerGeneratorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DockerGeneratorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
