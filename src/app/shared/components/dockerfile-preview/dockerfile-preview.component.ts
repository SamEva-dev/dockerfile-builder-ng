import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { Button, ButtonModule } from 'primeng/button';
import { ButtonGroupModule } from 'primeng/buttongroup';

@Component({
  selector: 'dockerfile-preview',
  imports: [
     CommonModule,
    MatIconModule,
    MatFormFieldModule,
    TranslatePipe,
    ButtonModule,
    ButtonGroupModule,
    Button
  ],
  templateUrl: './dockerfile-preview.component.html',
  styleUrl: './dockerfile-preview.component.scss'
})
export class DockerfilePreviewComponent {
  constructor(private  translate: TranslateService) {}
  
  @Input() content: string = '';
  @Output() copy = new EventEmitter<void>();
  @Output() download = new EventEmitter<void>();

  ngOnInit(): void {
   
    this.content= '# Your Dockerfile will appear here...';
  }
}
