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

interface KeyValue { key: string; value: string; }

@Component({
  selector: 'app-configuration',
  imports: [
    CommonModule,
    ApercuComponent,
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
    Button],
  templateUrl: './configuration.component.html',
  styleUrl: './configuration.component.scss'
})
export class ConfigurationComponent {
  constructor(translate: TranslateService) {}

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
    // Ta logique "suivant" ici
  }

}
