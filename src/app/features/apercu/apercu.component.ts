import { ChangeDetectionStrategy, Component, computed, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { MatIconModule } from "@angular/material/icon";
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import { Card } from "primeng/card";
import { CommonModule } from '@angular/common';
import { Button, ButtonModule } from "primeng/button";
import { ButtonGroupModule } from 'primeng/buttongroup';
import { Observable } from 'rxjs';
import { TabsModule } from 'primeng/tabs';
import { TooltipModule } from 'primeng/tooltip';

import { DockerDataService } from '../../core/services/docker-data.service';
import { DockerfilePreviewComponent } from "../../shared/components/dockerfile-preview/dockerfile-preview.component";
import { DockerComposePreviewComponent } from "../../shared/components/docker-compose-preview/docker-compose-preview.component";
import { DockerCommandPreviewComponent } from "../../shared/components/docker-command-preview/docker-command-preview.component";

import { DockerGeneratorService } from '../../core/services/docker-generator.service';

@Component({
  selector: 'app-apercu',
  imports: [
    CommonModule,
    MatIconModule,
    MatFormFieldModule,
    ButtonModule,
    ButtonGroupModule,
    TranslatePipe,
    TabsModule,
    TooltipModule
],
  templateUrl: './apercu.component.html',
  styleUrl: './apercu.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ApercuComponent{
onNext() {
throw new Error('Method not implemented.');
}
onPrevious() {
throw new Error('Method not implemented.');
}


  private translate = inject(TranslateService)
  private dockerService = inject(DockerGeneratorService)

  dockerfile = this.dockerService.dockerfilePreview;
  compose = this.dockerService.composePreview;
  cli = this.dockerService.cliPreview;

  summary = computed(() => ({
    image: 'node:18-alpine',
    user: 'appuser (1001:1001)',
    workdir: '/app',
    ports: ['3000/tcp'],
    volumes: ['/app/data', '/app/logs'],
    env: ['NODE_ENV', 'PORT'],
    health: 'Actif (30s)',
    security: 'Non-root, read-only, capabilities limitées'
  }));
  
download(content: string, filename: string) {
    const blob = new Blob([content], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = filename;
    link.click();
    link.remove();
  }
  copy(content: string) {
    navigator.clipboard.writeText(content);
  }
 
}
