import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PortReseauComponent } from './port-reseau.component';

describe('PortReseauComponent', () => {
  let component: PortReseauComponent;
  let fixture: ComponentFixture<PortReseauComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PortReseauComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PortReseauComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
