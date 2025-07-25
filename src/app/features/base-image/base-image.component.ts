import { Component } from '@angular/core';
import { MatIconModule } from "@angular/material/icon";
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import { ApercuComponent } from '../apercu/apercu.component';
import { FormsModule } from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import {MatChipsModule} from '@angular/material/chips';
import { CardModule } from 'primeng/card';

import { CommonModule } from '@angular/common';
import { Button, ButtonModule } from "primeng/button";
import { SelectModule } from 'primeng/select';
import { InputTextModule } from 'primeng/inputtext';


interface DockerImage {
  name: string;
  desc: string;
  tags: string[];
}

@Component({
  selector: 'app-base-image',
  imports: [
    CommonModule,
    //ApercuComponent,
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
    ApercuComponent,
    Button
],
  templateUrl: './base-image.component.html',
  styleUrl: './base-image.component.scss'
})
export class BaseImageComponent {
constructor(translate: TranslateService) {}

popularImages: DockerImage[] = [
    { name: 'node', desc: 'Runtime JavaScript pour applications Node.js', tags: ['18', '20', 'alpine'] },
    { name: 'python', desc: 'Langage de programmation Python', tags: ['3.11', '3.12', 'alpine'] },
    { name: 'nginx', desc: 'Serveur web haute performance', tags: ['latest', 'alpine'] },
    { name: 'redis', desc: 'Base de données en mémoire', tags: ['7', 'alpine'] },
    { name: 'postgres', desc: 'Base de données relationnelle', tags: ['15', '14'] },
    { name: 'ubuntu', desc: 'Système d\'exploitation Ubuntu', tags: ['22.04', '20.04'] },
    { name: 'alpine', desc: 'Distribution Linux minimaliste', tags: ['latest', '3.18'] },
    { name: 'mysql', desc: 'Base de données MySQL', tags: ['8.0', '5.7'] }
  ];

  // États
  selectedPopularIndex: number | null = null;
  customImageName: string = '';
  configSectionVisible: boolean = false;

  // Section tag
  tagOptions: string[] = ['latest', 'personnalisé'];
  selectedTag: string = 'latest';
  customTag: string = '';

dynamicTagOptions: string[] = [...this.tagOptions];

updateTagOptions() {
  if (this.selectedPopularIndex !== null) {
    const tags = this.popularImages[this.selectedPopularIndex].tags.filter(
      tag => !this.tagOptions.includes(tag)
    );
    this.dynamicTagOptions = [...this.tagOptions, ...tags];
  } else {
    this.dynamicTagOptions = [...this.tagOptions];
  }
  if (!this.dynamicTagOptions.includes(this.selectedTag)) {
    this.selectedTag = this.dynamicTagOptions[0];
  }
}

  // Sélection d'une carte "image populaire"
  selectPopular(index: number) {
    this.selectedPopularIndex = index;
    this.customImageName = '';
    this.configSectionVisible = true;
    this.selectedTag = 'latest';
    this.customTag = '';
    this.updateTagOptions();
  }

  // Saisie du nom d'image personnalisée
  onCustomImageNameChange(value: string) {
    this.customImageName = value;
    if (value.trim() !== '') {
      this.selectedPopularIndex = null; // Invalide la card
      this.configSectionVisible = true;
    } else {
      // Si champ vidé, on cache la config si rien d'autre n'est sélectionné
      if (this.selectedPopularIndex === null) this.configSectionVisible = false;
    }
    this.updateTagOptions();
  }

  // Sélection du tag
  onTagChange(tag: string) {
    this.selectedTag = tag;
    if (tag !== 'personnalisé') {
      this.customTag = '';
    }
  }

  // Saisie du tag custom
  onCustomTagChange(value: string) {
    this.customTag = value;

    console.log('Custom tag:', this.customTag);
  }

  // Génération du contenu Dockerfile
  get dockerfilePreview(): string {
    let image = '';
    let tag = '';
    if (this.selectedPopularIndex !== null) {
      image = this.popularImages[this.selectedPopularIndex].name;
    } else if (this.customImageName.trim() !== '') {
      image = this.customImageName.trim();
    }
    if (this.selectedTag === 'personnalisé') {
      tag = this.customTag || 'latest';
    } else {
      tag = this.selectedTag;
    }
    if (!image) return '';
    return `FROM ${image}:${tag}

# Dockerfile généré par Docker Builder
# Image de base sélectionnée: ${image}:${tag}
`;
  }

  // Actions copy/download (facultatif)
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

  get canGoNext(): boolean {
  return (
    (this.selectedPopularIndex !== null) ||
    (this.customImageName.trim().length > 0)
  );
}
  onPrevious() {
    // Ta logique "retour" ici
  }
  onNext() {
    // Ta logique "suivant" ici
  }


}
