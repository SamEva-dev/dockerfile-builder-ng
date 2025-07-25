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

interface PortEntry {
  number: number | null;
  protocol: 'TCP' | 'UDP' | 'SCTP';
  description?: string;
  isCommon?: boolean;
  commonKey?: string; // pour la liaison avec les ports communs
}


@Component({
  selector: 'app-port-reseau',
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
  ],
  templateUrl: './port-reseau.component.html',
  styleUrl: './port-reseau.component.scss'
})
export class PortReseauComponent {

    constructor(translate: TranslateService) {}

    @Input() baseDockerfile = '';

  // Liste des ports à exposer
  ports: PortEntry[] = [];

  // Ports communs (pour clic rapide)
  commonPorts = [
    { key: 'HTTP', label: '80', sub: 'HTTP' },
    { key: 'HTTPS', label: '443', sub: 'HTTPS' },
    { key: 'NODEJS', label: '3000', sub: 'Node.js/React dev' },
    { key: 'ALT', label: '8080', sub: 'HTTP alternatif' },
    { key: 'PG', label: '5432', sub: 'PostgreSQL' },
    { key: 'MYSQL', label: '3306', sub: 'MySQL' },
    { key: 'REDIS', label: '6379', sub: 'Redis' },
    { key: 'MONGO', label: '27017', sub: 'MongoDB' }
  ];

  // Ports déjà ajoutés via les ports communs
  get activeCommonKeys() {
    return this.ports.filter(p => p.isCommon && p.commonKey).map(p => p.commonKey);
  }

  // Ajout d'un port (manuel ou commun)
  addPort(common?: any) {
    if (common) {
      // Ne pas ajouter deux fois le même port commun
      if (this.ports.some(p => p.isCommon && p.commonKey === common.key)) return;
      this.ports.push({
        number: Number(common.label),
        protocol: 'TCP',
        description: common.sub,
        isCommon: true,
        commonKey: common.key
      });
    } else {
      this.ports.push({ number: null, protocol: 'TCP', description: '' });
    }
  }

  // Suppression d'un port
  removePort(idx: number) {
    this.ports.splice(idx, 1);
  }

  // Grisé/dégrisé des ports communs
  isCommonActive(common: any): boolean {
    return this.activeCommonKeys.includes(common.key);
  }

  // Génération du Dockerfile
  get dockerfilePreview() {
    let preview = this.baseDockerfile;
    if (this.ports.length > 0) {
      preview += '\n\n# Exposition des ports';
      this.ports.forEach(p => {
        if (p.description) preview += `\n# ${p.description}`;
        preview += `\nEXPOSE ${p.number}${p.protocol === 'UDP' ? '/udp' : ''}`;
      });
    }
    return preview.trim();
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
