import { ChangeDetectionStrategy, Component, EventEmitter, inject, Input, Output, signal } from '@angular/core';
import { ApercuComponent } from "../apercu/apercu.component";
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { MatIconModule } from "@angular/material/icon";
import { SelectModule } from 'primeng/select';
import { ButtonModule } from 'primeng/button';
import { CommonModule, NgIf } from '@angular/common';
import { CardModule } from "primeng/card";
import { FormsModule } from '@angular/forms';
import { DockerfilePreviewComponent } from "../../shared/components/dockerfile-preview/dockerfile-preview.component";
import { DockerDataService } from '../../core/services/docker-data.service';
import { Router } from '@angular/router';
import { DockerComposePreviewComponent } from '../../shared/components/docker-compose-preview/docker-compose-preview.component';
import { DockerCommandPreviewComponent } from "../../shared/components/docker-command-preview/docker-command-preview.component";
import { DockerGeneratorService } from '../../core/services/docker-generator.service';
import { BuildOptions, DockerComposeConfig, ServiceDefinition } from '../../core/models/docker-compose.model';

type InstructionTypeValue = 'RUN' | 'WORKDIR' | 'ENV' | 'VARENV'| 'COPY' | 'EXPOSE' | 'CMD' | 'ENTRYPOINT' | 'ARG' | 'USER' | 'LABEL' | 'ADD';

interface InstructionTypeOption {
  label: string;
  value: InstructionTypeValue;
  desc: string;
}
interface BuilderInstruction {
  type: InstructionTypeValue;
  content: string;
  description?: string;
}

const INSTRUCTION_TYPES: InstructionTypeOption[] = [
  { value: 'RUN', label: 'RUN', desc: 'INSTRUCTION.TYPE_RUN' },
  { value: 'COPY', label: 'COPY', desc: 'INSTRUCTION.TYPE_COPY' },
  { value: 'ADD', label: 'ADD', desc: 'INSTRUCTION.TYPE_ADD' },
  { value: 'ENV', label: 'ENV', desc: 'INSTRUCTION.TYPE_ENV' },
  { label: 'VARENV', value: 'VARENV', desc: 'INSTRUCTION.TYPE_VARENV' },
  { value: 'WORKDIR', label: 'WORKDIR', desc: 'INSTRUCTION.TYPE_WORKDIR' },
  { value: 'EXPOSE', label: 'EXPOSE', desc: 'INSTRUCTION.TYPE_EXPOSE' },
  { value: 'LABEL', label: 'LABEL', desc: 'INSTRUCTION.TYPE_LABEL' },
  { label: 'CMD', value: 'CMD', desc: 'INSTRUCTION.TYPE_CMD' },
  { label: 'ENTRYPOINT', value: 'ENTRYPOINT', desc: 'INSTRUCTION.TYPE_ENTRYPOINT' },
  { label: 'ARG', value: 'ARG', desc: 'INSTRUCTION.TYPE_ARG' },
  { label: 'USER', value: 'USER', desc: 'INSTRUCTION.TYPE_USER' },
  // Ajoute d'autres instructions si besoin
];

@Component({
  selector: 'app-instruction',
  imports: [
    CommonModule,
    FormsModule,
    TranslatePipe,
    MatIconModule,
    ButtonModule,
    SelectModule,
    CardModule,
    DockerfilePreviewComponent,
    DockerComposePreviewComponent,
    DockerCommandPreviewComponent
],
  templateUrl: './instruction.component.html',
  styleUrl: './instruction.component.scss',
   changeDetection: ChangeDetectionStrategy.OnPush
})
export class InstructionComponent {
private translate = inject(TranslateService)
  private dockerService = inject(DockerGeneratorService)
  private router = inject(Router)
 // --- Signals pour la liste d'instructions ---
  instructions = signal<BuilderInstruction[]>([]);

  // Pour le template (Primeng p-select)
  instructionTypes = INSTRUCTION_TYPES;

  // --- NAVIGATION (wizard parent) ---
  @Output() previous = new EventEmitter<void>();
  @Output() next = new EventEmitter<void>();

  // --- Preview live depuis le service central ---
  dockerfilePreview = this.dockerService.dockerfilePreview;
  dockerComposePreview = this.dockerService.composePreview;
  dockerRunCommand = this.dockerService.cliPreview;



  // --- Méthodes pour gérer la liste ---
 addInstruction() {
  this.instructions.set([
    ...this.instructions(),
    { type: 'RUN', content: '', description: '' }
  ]);
  this.updateDockerfileSignal();
}

// Suppression
removeInstruction(idx: number) {
  const updated = [...this.instructions()];
  updated.splice(idx, 1);
  this.instructions.set(updated);
  this.updateDockerfileSignal();
}

  // --- Trigger sur chaque modification d'instruction ---
  onInstructionChange() {
    this.updateDockerfileSignal();
  }

  // --- Preview copy/download (optionnel) ---
  onCopyDockerfile() { /* ... */ }
  onDownloadDockerfile() { /* ... */ }

  // --- Synchronisation avec le service central ---
  updateDockerfileSignal() {
    this.generateFileFromInstructions(this.instructions())
    
    this.generateComposeFromInstructions(this.instructions());

    this.generateCommandFromInstructions(this.instructions())
    
  }

  generateFileFromInstructions(instructions: BuilderInstruction[]) {
    const base = this.dockerService.dockerfile();
    console.log('Mise à jour Dockerfile avec instructions:', base);
    this.dockerService.updateDockerfile({
      ...(base || {}),
      // Construit la section instructions pour la preview
      install: {
        type: 'custom',
        commands: instructions.filter(i => !!i.content).map(i => this.getInstructionString(i))
      }
    });
  }

  generateComposeFromInstructions(instructions: BuilderInstruction[]) {
    const buildOptions: BuildOptions = { context: './web' };
    const currentCompose = this.dockerService.compose() ?? { version: '3.8', services: {} };

    buildOptions.args = instructions
      .filter(i => ['ARG', 'ENV', 'VARENV'].includes(i.type))
      .map(i => i.content.trim());
    //buildOptions.dockerfile = 'Dockerfile';
    //buildOptions.cache_from = ['myrepo/web:latest'];
    const base = this.dockerService.dockerfile();
    const serviceDefinition: ServiceDefinition = {
       build: buildOptions,
       image: base?.baseImage,
       environment: buildOptions.args,
    };
   
    const dockerComposeConfig: DockerComposeConfig = {
      ...currentCompose,
      
      services: {
        ...currentCompose.services,
        app: serviceDefinition,
      },
    };
    this.dockerService.updateCompose(dockerComposeConfig);
  }

  generateCommandFromInstructions(instructions: BuilderInstruction[]) {
    const command = this.dockerService.cli();
    const instruc = instructions
          .filter(i => ['ARG', 'ENV', 'VARENV'].includes(i.type))
          .reduce((acc, inst) => {
            const [key, value] = inst.content.split('=');
            acc[key.trim()] = value?.trim() ?? '';
            return acc;
          }, {} as Record<string, string>);

    this.dockerService.updateCLI({
      ...command,
      buildCommands: [
       {
        buildArgs: instruc
       }
      ]
    });
  }

  getInstructionString(inst: BuilderInstruction): string {
    if (inst.description)
      return `${inst.type} ${inst.content} # ${inst.description}`;
    return `${inst.type} ${inst.content}`;
  }

   onPrevious() {
    this.previous.emit();
    this.router.navigate(['/base-image']);
  }
  onNext() {
    this.updateDockerfileSignal();
    this.next.emit();

    this.router.navigate(['/configuration']);
  }

}
