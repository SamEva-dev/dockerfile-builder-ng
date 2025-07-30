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
import { DockerComposePreviewComponent } from '../../shared/components/docker-compose-preview/docker-compose-preview.component';
import { DockerCommandPreviewComponent } from "../../shared/components/docker-command-preview/docker-command-preview.component";
import { DockerGeneratorService } from '../../core/services/docker-generator.service';


interface VolumeConfig  {
  path: string;
  type: 'volume'| 'named' | 'bind' | 'tmpfs';
  description?: string;
  isCommon?: boolean;
  commonKey?: string;
}

interface CommonVolume {
  label: string;
  sub: string;
  path: string;
  type: 'volume' | 'bind' | 'tmpfs';
}


@Component({
  selector: 'app-volumes',
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
  templateUrl: './volumes.component.html',
  styleUrl: './volumes.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VolumesComponent {
private translate = inject(TranslateService)
  private dockerService = inject(DockerGeneratorService)
  private router = inject(Router)

@Input() baseDockerfile: string = '';

  // Liste des volumes (saisie ou issus du catalogue commun)
  volumes = signal<VolumeConfig[]>([]);

  // Volumes communs proposés
  // commonVolumes = [
  //   { key: 'APPDATA', label: '/app/data', sub: 'Données application' },
  //   { key: 'UPLOADS', label: '/app/uploads', sub: 'Fichiers uploadés' },
  //   { key: 'LOGS', label: '/app/logs', sub: 'Logs application' },
  //   { key: 'CERTS', label: '/etc/ssl/certs', sub: 'Certificats SSL' },
  //   { key: 'MYSQL', label: '/var/lib/mysql', sub: 'Données MySQL' },
  //   { key: 'PGDATA', label: '/var/lib/postgresql/data', sub: 'Données PostgreSQL' },
  //   { key: 'DATA', label: '/data', sub: 'Données génériques' },
  //   { key: 'TMP', label: '/tmp', sub: 'Fichiers temporaires' }
  // ];

  commonVolumes: CommonVolume[] = [
    { label: 'Données app', sub: 'Persistance des données', path: '/app/data', type: 'volume' },
    { label: 'Logs', sub: 'Logs persistants', path: '/var/log/app', type: 'bind' },
    { label: 'Cache temporaire', sub: 'Stockage volatile', path: '/tmp/cache', type: 'tmpfs' },
  ];

  volumeTypes = [
    { label: 'Volume nommé', value: 'named' },
    { label: 'Bind mount', value: 'bind' },
    { label: 'Tmpfs', value: 'tmpfs' }
  ];

   // --- Navigation Wizard ---
  @Output() previous = new EventEmitter<void>();
  @Output() next = new EventEmitter<void>();

  // Preview live
  dockerfilePreview = this.dockerService.dockerfilePreview;
  dockerComposePreview = this.dockerService.composePreview;
  dockerRunCommand = this.dockerService.cliPreview;

  // --- Gestion des volumes ---
  addVolume(common?: CommonVolume) {
    if (common && this.isCommonActive(common)) return;

    this.volumes.set([
      ...this.volumes(),
      common
        ? { path: common.path, type: common.type, description: common.label, isCommon: true }
        : { path: '', type: 'volume', description: '' }
    ]);
    this.updateAllSignals();
  }

  removeVolume(index: number) {
    const updated = [...this.volumes()];
    updated.splice(index, 1);
    this.volumes.set(updated);
    this.updateAllSignals();
  }

  isCommonActive(common: CommonVolume): boolean {
    return this.volumes().some(v => v.path === common.path && v.type === common.type);
  }


  // Appelé à chaque modification des volumes
  updateAllSignals() {

    // Dockerfile (instruction VOLUME)
   

    // Docker Compose (volumes mounts)
    
    // Docker CLI (docker run -v)
   

    this.generateFileFromInstructions();
    this.generateComposeFromInstructions();
    this.generateCommandFromInstructions();
  }

  generateFileFromInstructions(){
    const dockerfileVolumes = this.volumes().map(v => v.path)
    .filter(v => !!v && v.trim() !== '');
    console.log('Mise à jour des volumes dans le Dockerfile:', dockerfileVolumes);

    const baseDockerfile = this.dockerService.dockerfile();
    this.dockerService.updateDockerfile({
      ...(baseDockerfile || {}),
      volumes: dockerfileVolumes
    });

  }
  generateComposeFromInstructions(){
    const composeVolumes = this.volumes().map(v => ({
      type: v.type === 'tmpfs' ? 'tmpfs' : (v.type === 'bind' ? 'bind' : 'volume'),
      source: v.type !== 'tmpfs' ? v.path.replace(/\//g, '_').substring(1) : undefined,
      target: v.path
    }));

    const namedVolumes = this.volumes()
      .filter(v => v.type === 'volume')
      .reduce((acc, v) => {
        const name = v.path.replace(/\//g, '_').substring(1);
        acc[name] = { driver: 'local' };
        return acc;
      }, {} as Record<string, { driver: string }>);

      console.log('Mise à jour des volumes dans le compose:', namedVolumes);
    const baseCompose = this.dockerService.compose();
    const services = { ...(baseCompose?.services || {}) };
      services['web'] = {
        ...services['web'],
        volumes: composeVolumes
      };
    this.dockerService.updateCompose({
      ...(baseCompose || {}),
      services,
      volumes: namedVolumes
    });


  }
  generateCommandFromInstructions() {
  const cliVolumes = this.volumes().map(v => ({
    source: v.type,
    target: v.path,
    type: v.type,
  }));

  console.log('Mise à jour des volumes dans les commandes CLI:', cliVolumes);

  const baseCli = this.dockerService.cli() || {};

  const runCommands = (baseCli.runCommands && baseCli.runCommands.length > 0)
    ? baseCli.runCommands.map(cmd => ({ ...cmd, volumes: cliVolumes }))
    : [{ volumes: cliVolumes }];

  this.dockerService.updateCLI({
    ...baseCli,
    runCommands
  });
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
     this.router.navigate(['/port-reseau']);
  }
  onNext() {
    this.updateAllSignals();
    this.next.emit();

    this.router.navigate(['/utilisateurs']);
  }
}
