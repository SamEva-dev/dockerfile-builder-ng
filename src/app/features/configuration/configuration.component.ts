import { CommonModule } from '@angular/common';
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
import { DockerfilePreviewComponent } from "../../shared/components/dockerfile-preview/dockerfile-preview.component";
import { DockerDataService } from '../../core/services/docker-data.service';
import { Router } from '@angular/router';
import { DockerComposePreviewComponent } from '../../shared/components/docker-compose-preview/docker-compose-preview.component';
import { DockerCommandPreviewComponent } from "../../shared/components/docker-command-preview/docker-command-preview.component";
import { DockerGeneratorService } from '../../core/services/docker-generator.service';

interface KeyValue { key: string; value: string; }

// Pour select stopsignal
const STOPSIGNAL_OPTIONS = [
  { label: 'SIGTERM', value: 'SIGTERM' },
  { label: 'SIGKILL', value: 'SIGKILL' },
  { label: 'SIGINT', value: 'SIGINT' },
];

interface EnvVar { key: string; value: string; }
interface Label { key: string; value: string; }

@Component({
  selector: 'app-configuration',
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
    Button,
    DockerfilePreviewComponent,
    DockerComposePreviewComponent,
    DockerCommandPreviewComponent
],
  templateUrl: './configuration.component.html',
  styleUrl: './configuration.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConfigurationComponent {
private translate = inject(TranslateService)
  private dockerService = inject(DockerGeneratorService)
  private router = inject(Router)

   // --- Signaux pour chaque champ ---
  workdir = signal<string>('/app');
  user = signal<string>('appuser');
  shell = signal<string>('');
  stopsignal = signal<string>('SIGTERM');

  envVars = signal<EnvVar[]>([]);
  labels = signal<Label[]>([]);

  // Healthcheck
  healthcheckEnabled = signal<boolean>(false);
  healthCmd = signal<string>('curl -f http://localhost:3000/health || exit 1');
  healthInterval = signal<string>('30s');
  healthTimeout = signal<string>('10s');
  healthRetries = signal<number>(3);

  stopsignalOptions = STOPSIGNAL_OPTIONS;

  // --- Navigation Wizard ---
  @Output() previous = new EventEmitter<void>();
  @Output() next = new EventEmitter<void>();

  // --- Preview live ---
  dockerfilePreview = this.dockerService.dockerfilePreview;
  dockerComposePreview = this.dockerService.composePreview;
  dockerRunCommand = this.dockerService.cliPreview;

  // ENV management
  addEnv() {
    this.envVars.set([...this.envVars(), { key: '', value: '' }]);
    this.updateAllSignals();
  }
  removeEnv(index: number) {
    const updated = [...this.envVars()];
    updated.splice(index, 1);
    this.envVars.set(updated);
    this.updateAllSignals();
  }

  // LABEL management
  addLabel() {
    this.labels.set([...this.labels(), { key: '', value: '' }]);
    this.updateAllSignals();
  }
  removeLabel(index: number) {
    const updated = [...this.labels()];
    updated.splice(index, 1);
    this.labels.set(updated);
    this.updateAllSignals();
  }

  // Healthcheck toggle/edition
  onToggleHealthcheck() {
    this.healthcheckEnabled.set(!this.healthcheckEnabled());
    this.updateAllSignals();
  }

  // Appelé sur tout changement (liaison ngModelChange à ajouter dans le HTML si besoin)
  updateAllSignals() {

    this.generateFileFromInstructions();
    this.generateComposeFromInstructions();
    this.generateCommandFromInstructions();
    
  }

  generateFileFromInstructions(){
    const base = this.dockerService.dockerfile();
    this.dockerService.updateDockerfile({
      ...(base || {}),
      workdir: this.workdir(),
      shell: this.shell(),
      Stopsignal: this.stopsignal(),
      healthcheck: this.healthcheckEnabled() ? {
        test: [ this.healthCmd()],
        interval: this.healthInterval(),
        timeout: this.healthTimeout(),
        retries: this.healthRetries()
      } : undefined,
      user:{
        username: this.user(),
        uid: undefined, // Optionnel, peut être ajouté si nécessaire
        gid: undefined  // Optionnel, peut être ajouté si nécessaire
      },

      //stopsignal: this.stopsignal(),
      environment: Object.fromEntries(this.envVars().filter(e => e.key).map(e => [e.key, e.value])),
      labels: Object.fromEntries(this.labels().filter(l => l.key).map(l => [l.key, l.value])),
    });

  }

  generateComposeFromInstructions(){
    const baseCompose = this.dockerService.compose();
    let services = baseCompose?.services ?? {};
      services = {
        ...services,
        web: {
          ...services['web'],
          environment: Object.fromEntries(this.envVars().filter(e => e.key).map(e => [e.key, e.value])),
          labels: Object.fromEntries(this.labels().filter(l => l.key).map(l => [l.key, l.value])),
          healthcheck: this.healthcheckEnabled() ? {
            test: ['CMD', this.healthCmd()],
            interval: this.healthInterval(),
            timeout: this.healthTimeout(),
            retries: this.healthRetries()
          } : undefined,
          working_dir: this.workdir(),
          user: this.user(),
          stop_signal: this.stopsignal()
        }
      };
    this.dockerService.updateCompose({
      ...(baseCompose || {}),
      services
    });

  }

  generateCommandFromInstructions() {
  const baseCli = this.dockerService.cli();
  console.log('Mise à jour CLI avec instructions:', baseCli);

  const environment = Object.fromEntries(this.envVars().filter(e => e.key).map(e => [e.key, e.value]));
  const labels = Object.fromEntries(this.labels().filter(l => l.key).map(l => [l.key, l.value]));
  const user = this.user();

  const updatedRunCommands =
    (baseCli?.runCommands?.length ?? 0) > 0
      ? baseCli?.runCommands?.map(cmd => ({
          ...cmd,
          environment,
          labels,
          user
        }))
      : [
          {
            environment,
            labels,
            user
          }
        ];

  this.dockerService.updateCLI({
    ...(baseCli || {}),
    runCommands: updatedRunCommands
  });
}


  onInstructionChange(){
    console.log('ConfigurationComponent: onInstructionChange called');
    this.updateAllSignals();
  }




  onCopyDockerfile() {
    if (this.dockerfilePreview)
      navigator.clipboard.writeText(this.dockerfilePreview());
  }
  onDownloadDockerfile() {
    if (!this.dockerfilePreview) return;
    const blob = new Blob([this.dockerfilePreview()], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Dockerfile';
    a.click();
    window.URL.revokeObjectURL(url);
  }

   onPrevious() {
    this.previous.emit();
    this.router.navigate(['/instructions']);
  }
  onNext() {
    this.updateAllSignals();
    this.next.emit();

    this.router.navigate(['/port-reseau']);
  }

}
