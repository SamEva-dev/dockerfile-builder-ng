import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DockerComposePreviewComponent } from './docker-compose-preview.component';

describe('DockerfileComposePreviewComponent', () => {
  let component: DockerComposePreviewComponent;
  let fixture: ComponentFixture<DockerComposePreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DockerComposePreviewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DockerComposePreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
