import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
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
import { DockerfileComposePreviewComponent } from "../../shared/components/dockerfile-compose-preview/dockerfile-compose-preview.component";
import { CommandsPreviewComponent } from "../../shared/components/commands-preview/commands-preview.component";

interface KeyValue { key: string; value: string; }

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
    DockerfileComposePreviewComponent,
    CommandsPreviewComponent
],
  templateUrl: './configuration.component.html',
  styleUrl: './configuration.component.scss'
})
export class ConfigurationComponent {
constructor(translate: TranslateService, 
  private dataService: DockerDataService, 
private router: Router ) {}

   // Données du Dockerfile précédant (étape précédente, instructions…)
  @Input() baseDockerfile: string = '';

  // Bloc config de base
  workdir = '/app';
  user = '';
  shell = '';
  
  stopsignalOptions = [
  { label: 'SIGTERM (par défaut)', value: 'SIGTERM' },
  { label: 'SIGINT', value: 'SIGINT' },
  { label: 'SIGKILL', value: 'SIGKILL' },
  { label: 'SIGUSR1', value: 'SIGUSR1' },
  { label: 'SIGUSR2', value: 'SIGUSR2' },
  { label: '', value: '' }
];
stopsignal = 'SIGTERM'; // valeur par défaut


  // Variables d'environnement dynamiques
  envVars: KeyValue[] = [{ key: 'NODE_ENV', value: 'production' }];

  addEnv() { this.envVars.push({ key: '', value: '' }); }
  removeEnv(i: number) { this.envVars.splice(i, 1); }

  // Labels dynamiques
  labels: KeyValue[] = [{ key: 'maintainer', value: 'votre-email@example.com' }];

  addLabel() { this.labels.push({ key: '', value: '' }); }
  removeLabel(i: number) { this.labels.splice(i, 1); }

  // Healthcheck
  healthcheckEnabled = false;
  healthCmd = 'curl -f http://localhost:3000/ || exit 1';
  healthInterval = '30s';
  healthTimeout = '3s';
  healthRetries = 3;

  // Génération du Dockerfile preview
  get dockerfilePreview(): string {
    let out = this.baseDockerfile;

    // Config de base
    if (this.workdir)
      out += `\n\n# Set the working directory\nWORKDIR ${this.workdir}`;
    // ENV
    if (this.envVars.length)
      out += `\n\n# Environment variables`;
    for (let env of this.envVars) {
      if (env.key && env.value)
        out += `\nENV ${env.key}=${env.value}`;
    }
    // LABELS
    if (this.labels.length)
      out += `\n\n# Labels and metadata`;
    for (let l of this.labels) {
      if (l.key && l.value)
        out += `\nLABEL ${l.key}="${l.value}"`;
    }
    // USER
    if (this.user)
      out += `\n\n# Execution user\nUSER ${this.user}`;
    // SHELL
    if (this.shell)
      out += `\n\n# Default Shell\nSHELL ${this.shell}`;
    // STOP SIGNAL
    if (this.stopsignal)
      out += `\n\n# Stop signal\nSTOPSIGNAL ${this.stopsignal}`;
    // Healthcheck
    if (this.healthcheckEnabled && this.healthCmd)
      out += `\n\n# Health check\nHEALTHCHECK --interval=${this.healthInterval} --timeout=${this.healthTimeout} --retries=${this.healthRetries} CMD ${this.healthCmd}`;
    return out.trim();
  }

  get dockerComposePreview(): string {
  let imageLine = this.baseDockerfile.split('\n')[0]; // ex: FROM node:20
  const image = imageLine.replace('FROM ', '').trim();

  let out = `version: '3.8'
services:
  app:
    image: ${image}`;

  if (this.workdir) {
    out += `\n    working_dir: ${this.workdir}`;
  }

  if (this.envVars.length) {
    out += `\n    environment:`;
    for (let env of this.envVars) {
      if (env.key && env.value) {
        out += `\n      - ${env.key}=${env.value}`;
      }
    }
  }

  if (this.labels.length) {
    out += `\n    labels:`;
    for (let l of this.labels) {
      if (l.key && l.value) {
        out += `\n      ${l.key}: "${l.value}"`;
      }
    }
  }

  if (this.user) {
    out += `\n    user: "${this.user}"`;
  }

  if (this.shell) {
    out += `\n    entrypoint: [ "${this.shell}" ]`;
  }

  if (this.stopsignal) {
    out += `\n    stop_signal: ${this.stopsignal}`;
  }

  if (this.healthcheckEnabled && this.healthCmd) {
    out += `\n    healthcheck:
      test: [ "CMD", "${this.healthCmd}" ]
      interval: ${this.healthInterval}
      timeout: ${this.healthTimeout}
      retries: ${this.healthRetries}`;
  }

  return out.trim();
}

get dockerRunCommand(): string {
  let imageLine = this.baseDockerfile.split('\n')[0]; // FROM xxx
  const image = imageLine.replace('FROM ', '').trim();

  if (!image) return '';

  let cmd = `docker run --name custom-container`;

  if (this.workdir) {
    cmd += ` -w ${this.workdir}`;
  }

  for (let env of this.envVars) {
    if (env.key && env.value) {
      cmd += ` -e ${env.key}=${env.value}`;
    }
  }

  for (let l of this.labels) {
    if (l.key && l.value) {
      cmd += ` --label ${l.key}="${l.value}"`;
    }
  }

  if (this.user) {
    cmd += ` --user ${this.user}`;
  }

  if (this.stopsignal) {
    cmd += ` --stop-signal=${this.stopsignal}`;
  }

  if (this.healthcheckEnabled && this.healthCmd) {
    cmd += ` --health-cmd="${this.healthCmd}" --health-interval=${this.healthInterval} --health-timeout=${this.healthTimeout} --health-retries=${this.healthRetries}`;
  }

  if (this.shell) {
    cmd += ` --entrypoint ${this.shell}`;
  }

  cmd += ` ${image}`;

  return cmd.trim();
}



  onCopyDockerfile() {
    if (this.dockerfilePreview)
      navigator.clipboard.writeText(this.dockerfilePreview);
  }
  onDownloadDockerfile() {
    if (!this.dockerfilePreview) return;
    const blob = new Blob([this.dockerfilePreview], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Dockerfile';
    a.click();
    window.URL.revokeObjectURL(url);
  }

   onPrevious() {
    // Ta logique "retour" ici
  }
  onNext() {
    this.dataService.updateDockerFile(this.dockerfilePreview);
    this.dataService.updateDockerCompose(this.dockerComposePreview);
    this.dataService.updateDockerCommand(this.dockerRunCommand);

    this.router.navigate(['/port-reseau']);
  }

}
