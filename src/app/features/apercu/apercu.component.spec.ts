import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApercuComponent } from './apercu.component';

describe('ApercuComponent', () => {
  let component: ApercuComponent;
  let fixture: ComponentFixture<ApercuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApercuComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApercuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
