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
import { CommonModule } from '@angular/common';
import { DockerfilePreviewComponent } from "../../shared/components/dockerfile-preview/dockerfile-preview.component";
import { DockerDataService } from '../../core/services/docker-data.service';
import { Router } from '@angular/router';
import { DockerfileComposePreviewComponent } from "../../shared/components/dockerfile-compose-preview/dockerfile-compose-preview.component";
import { CommandsPreviewComponent } from "../../shared/components/commands-preview/commands-preview.component";


interface VolumeEntry {
  path: string;
  type: 'named' | 'bind' | 'tmpfs';
  description?: string;
  isCommon?: boolean;
  commonKey?: string;
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
    DockerfileComposePreviewComponent,
    CommandsPreviewComponent
],
  templateUrl: './volumes.component.html',
  styleUrl: './volumes.component.scss'
})
export class VolumesComponent {
constructor(translate: TranslateService, 
  private dataService: DockerDataService, 
private router: Router ) {}

@Input() baseDockerfile: string = '';

  // Liste des volumes (saisie ou issus du catalogue commun)
  volumes: VolumeEntry[] = [];

  // Volumes communs proposés
  commonVolumes = [
    { key: 'APPDATA', label: '/app/data', sub: 'Données application' },
    { key: 'UPLOADS', label: '/app/uploads', sub: 'Fichiers uploadés' },
    { key: 'LOGS', label: '/app/logs', sub: 'Logs application' },
    { key: 'CERTS', label: '/etc/ssl/certs', sub: 'Certificats SSL' },
    { key: 'MYSQL', label: '/var/lib/mysql', sub: 'Données MySQL' },
    { key: 'PGDATA', label: '/var/lib/postgresql/data', sub: 'Données PostgreSQL' },
    { key: 'DATA', label: '/data', sub: 'Données génériques' },
    { key: 'TMP', label: '/tmp', sub: 'Fichiers temporaires' }
  ];

  // Pour l'affichage grisé
  get activeCommonKeys() {
    return this.volumes.filter(v => v.isCommon && v.commonKey).map(v => v.commonKey);
  }

  // Ajout volume à la main ou depuis "commun"
  addVolume(common?: any) {
    if (common) {
      if (this.volumes.some(v => v.isCommon && v.commonKey === common.key)) return;
      this.volumes.push({
        path: common.label,
        type: 'named',
        description: common.sub,
        isCommon: true,
        commonKey: common.key
      });
    } else {
      this.volumes.push({ path: '', type: 'named', description: '' });
    }
  }

  // Suppression d’un volume
  removeVolume(i: number) { this.volumes.splice(i, 1); }

  // Savoir si un volume commun est actif (pour griser le bouton)
  isCommonActive(common: any) {
    return this.activeCommonKeys.includes(common.key);
  }

  // Génération du Dockerfile
  get dockerfilePreview(): string {
    let preview = this.baseDockerfile;
    if (this.volumes.length > 0) {
      preview += '\n\n# Points de montage pour la persistance des données';
      this.volumes.forEach(v => {
        if (v.description) preview += `\n# ${v.description}`;
        preview += `\nVOLUME ["${v.path}"]`;
      });
    }
    return preview.trim();
  }

  get dockerComposePreview(): string {
  const imageLine = this.baseDockerfile.split('\n')[0];
  const image = imageLine.replace('FROM ', '').trim();
  if (!image) return '';

  let out = `version: '3.8'
services:
  app:
    image: ${image}`;

  if (this.volumes.length > 0) {
    out += `\n    volumes:`;
    this.volumes.forEach(v => {
      out += `\n      - ${v.path}:${v.path}  # ${v.description || 'volume'}`;
    });
  }

  return out.trim();
}

get dockerRunCommand(): string {
  const imageLine = this.baseDockerfile.split('\n')[0];
  const image = imageLine.replace('FROM ', '').trim();
  if (!image) return '';

  let cmd = `docker run`;

  if (this.volumes.length > 0) {
    this.volumes.forEach(v => {
      cmd += ` -v ${v.path}:${v.path}`;
    });
  }

  cmd += ` ${image}`;
  return cmd.trim();
}



  // Liste des types de volume
  volumeTypes = [
    { label: 'Volume nommé', value: 'named' },
    { label: 'Bind mount', value: 'bind' },
    { label: 'Tmpfs', value: 'tmpfs' }
  ];

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

    this.router.navigate(['/utilisateurs']);
  }
}
