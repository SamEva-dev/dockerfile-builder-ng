import { ChangeDetectionStrategy, Component, EventEmitter, inject, Input, Output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { Button, ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { ApercuComponent } from '../apercu/apercu.component';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { CommonModule } from '@angular/common';
import { DockerfilePreviewComponent } from "../../shared/components/dockerfile-preview/dockerfile-preview.component";
import { DockerDataService } from '../../core/services/docker-data.service';
import { Router } from '@angular/router';
import { DockerComposePreviewComponent } from "../../shared/components/docker-compose-preview/docker-compose-preview.component";
import { DockerCommandPreviewComponent } from "../../shared/components/docker-command-preview/docker-command-preview.component";
import { DockerGeneratorService } from '../../core/services/docker-generator.service';
import { PortMapping } from '../../core/models/docker-compose.model';

interface PortConfig  {
  number: number | null;
  protocol: 'TCP' | 'UDP' | 'SCTP';
  description?: string;
  isCommon?: boolean;
  commonKey?: string; // pour la liaison avec les ports communs
}

interface CommonPort {
  label: string;
  sub: string;
  number: number;
   protocol: 'TCP' | 'UDP' | 'SCTP';
}


@Component({
  selector: 'app-port-reseau',
  imports: [
    CommonModule,
    MatIconModule,
    TranslatePipe,
    MatFormFieldModule,
    MatSelectModule,
    MatCardModule,
    CardModule,
    MatChipsModule,
    FormsModule,
    SelectModule,
    InputTextModule,
    ButtonModule,
    ToggleSwitchModule,
    DockerfilePreviewComponent,
    DockerComposePreviewComponent,
    DockerCommandPreviewComponent
],
  templateUrl: './port-reseau.component.html',
  styleUrl: './port-reseau.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PortReseauComponent {

private translate = inject(TranslateService)
  private dockerService = inject(DockerGeneratorService)
  private router = inject(Router)

  // Liste des ports à exposer
  ports = signal<PortConfig[]>([]);

  // Ports communs (pour clic rapide)
  // commonPorts = [
  //   { key: 'HTTP', label: '80', sub: 'HTTP' },
  //   { key: 'HTTPS', label: '443', sub: 'HTTPS' },
  //   { key: 'NODEJS', label: '3000', sub: 'Node.js/React dev' },
  //   { key: 'ALT', label: '8080', sub: 'HTTP alternatif' },
  //   { key: 'PG', label: '5432', sub: 'PostgreSQL' },
  //   { key: 'MYSQL', label: '3306', sub: 'MySQL' },
  //   { key: 'REDIS', label: '6379', sub: 'Redis' },
  //   { key: 'MONGO', label: '27017', sub: 'MongoDB' }
  // ];

  commonPorts: CommonPort[] = [
    { label: 'HTTP', sub: 'HTTP', number: 80, protocol: 'TCP' },
    { label: 'HTTPS', sub: 'HTTPS', number: 443, protocol: 'TCP' },
    { label: 'MySQL', sub: 'Base de données', number: 3306, protocol: 'TCP' },
    { label: 'PostgreSQL', sub: 'Base de données', number: 5432, protocol: 'TCP' },
    { label: 'Redis', sub: 'Cache DB', number: 6379, protocol: 'TCP' },
    { label: 'DNS', sub: 'Résolution DNS', number: 53, protocol: 'UDP' },
  ];

   // --- Navigation Wizard ---
  @Output() previous = new EventEmitter<void>();
  @Output() next = new EventEmitter<void>();

  // Preview live
  dockerfilePreview = this.dockerService.dockerfilePreview;
  dockerComposePreview = this.dockerService.composePreview;
  dockerRunCommand = this.dockerService.cliPreview;

  // --- Gestion des ports ---
  addPort(common?: CommonPort) {
    if (common && this.isCommonActive(common)) return;

    this.ports.set([
      ...this.ports(),
      common
        ? { number: Number(common.number), protocol: common.protocol, description: common.sub, isCommon: true }
        : { number: 0, protocol: 'TCP', description: '' }
    ]);
    this.updateAllSignals();
  }

  removePort(index: number) {
    const updated = [...this.ports()];
    updated.splice(index, 1);
    this.ports.set(updated);
    this.updateAllSignals();
  }

  isCommonActive(common: CommonPort): boolean {
    return this.ports().some(p => p.number === common.number && p.protocol === common.protocol);
  }

 
  // Appelé lors de tout changement de port
  updateAllSignals() {

    const portMappings = this.ports()
      .map(p => ({
        published: p.number ?? 0,
        target: p.number ?? 0,
        protocol: p.protocol?.toLowerCase() as 'tcp' | 'udp' | 'sctp',

      }));
    this.generateFileFromInstructions(portMappings);
    this.generateComposeFromInstructions(portMappings);
    this.generateCommandFromInstructions(portMappings);
    
  }
  generateFileFromInstructions(portMappings: PortMapping[]) {
    const base = this.dockerService.dockerfile();
  
    this.dockerService.updateDockerfile({
      ...(base || {}),
      exposePorts: portMappings
    });
  }

  generateComposeFromInstructions(portMappings: PortMapping[]){
    const baseCompose = this.dockerService.compose();
    const services = { ...(baseCompose?.services || {}) };
    
      services['web'] = {
        ...services['web'],
        ports: portMappings
      };
    this.dockerService.updateCompose({
      ...(baseCompose || {}),
      services
    });

  }

  generateCommandFromInstructions(portMappings: PortMapping[]) {
    const baseCli = this.dockerService.cli() || {};
    
    const runCommands = (baseCli.runCommands && baseCli.runCommands.length > 0)
      ? baseCli.runCommands.map(cmd => ({ ...cmd, ports: portMappings }))
      : [{ ports: portMappings }];

    this.dockerService.updateCLI({
      ...baseCli,
      runCommands
    });
  }

  onCopyDockerfile() { /* ... */ }
  onDownloadDockerfile() { /* ... */ }

   onPrevious() {
    this.previous.emit(); 
    this.router.navigate(['/configuration']);
  }
  onNext() {
   this.updateAllSignals();
    this.next.emit();

    this.router.navigate(['/volumes']);
  }
}
