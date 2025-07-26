import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommandsPreviewComponent } from './commands-preview.component';

describe('CommandsPreviewComponent', () => {
  let component: CommandsPreviewComponent;
  let fixture: ComponentFixture<CommandsPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommandsPreviewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommandsPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
