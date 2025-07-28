import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DockerCommandPreviewComponent } from './docker-command-preview.component';

describe('DockerCommandPreviewComponent', () => {
  let component: DockerCommandPreviewComponent;
  let fixture: ComponentFixture<DockerCommandPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DockerCommandPreviewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DockerCommandPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
