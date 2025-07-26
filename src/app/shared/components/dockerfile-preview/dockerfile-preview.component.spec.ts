import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DockerfilePreviewComponent } from './dockerfile-preview.component';

describe('DockerfilePreviewComponent', () => {
  let component: DockerfilePreviewComponent;
  let fixture: ComponentFixture<DockerfilePreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DockerfilePreviewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DockerfilePreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
