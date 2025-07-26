import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DockerfileComposePreviewComponent } from './dockerfile-compose-preview.component';

describe('DockerfileComposePreviewComponent', () => {
  let component: DockerfileComposePreviewComponent;
  let fixture: ComponentFixture<DockerfileComposePreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DockerfileComposePreviewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DockerfileComposePreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
