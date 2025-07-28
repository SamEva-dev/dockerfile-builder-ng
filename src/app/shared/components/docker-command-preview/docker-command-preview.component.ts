import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { Button, ButtonModule } from 'primeng/button';
import { ButtonGroupModule } from 'primeng/buttongroup';
import { DockerGeneratorService } from '../../../core/services/docker-generator.service';


@Component({
  selector: 'docker-command-preview',
  imports: [
    CommonModule,
    MatIconModule,
    MatFormFieldModule,
    TranslatePipe,
    ButtonModule,
    ButtonGroupModule,
    Button
  ],
  templateUrl: './docker-command-preview.component.html',
  styleUrl: './docker-command-preview.component.scss'
})
export class DockerCommandPreviewComponent {

  private translate = inject(TranslateService)
  private dockerService = inject(DockerGeneratorService)
  
  @Input() content: string = '';
  @Output() copy = new EventEmitter<void>();
  @Output() download = new EventEmitter<void>();

  cli$ = this.dockerService.cliPreview;

  ngOnInit(): void {
   
    this.content= '# Your Docker command will appear here...';
  }
}
