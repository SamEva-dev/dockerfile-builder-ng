import { TestBed } from '@angular/core/testing';

import { DockerBuilderService } from './docker-builder.service';

describe('DockerBuilderService', () => {
  let service: DockerBuilderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DockerBuilderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
