import { ChangeDetectionStrategy, Component, computed, EventEmitter, inject, Output, signal } from '@angular/core';
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
import { DockerfilePreviewComponent } from "../../shared/components/dockerfile-preview/dockerfile-preview.component";
import { DockerDataService } from '../../core/services/docker-data.service';
import { Router } from '@angular/router';
import { DividerModule } from 'primeng/divider';
import { DockerComposePreviewComponent } from '../../shared/components/docker-compose-preview/docker-compose-preview.component';
import { DockerCommandPreviewComponent } from "../../shared/components/docker-command-preview/docker-command-preview.component";
import { DockerGeneratorService } from '../../core/services/docker-generator.service';


interface DockerImage {
  name: string;
  desc: string;
  tags: string[];
  defaultTag: string;
  tagOptions: string[];
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
    Button,
    DockerfilePreviewComponent,
    DockerComposePreviewComponent,
    DividerModule,
    DockerCommandPreviewComponent
],
  templateUrl: './base-image.component.html',
  styleUrl: './base-image.component.scss',
   changeDetection: ChangeDetectionStrategy.OnPush
})
export class BaseImageComponent {


private translate = inject(TranslateService)
  private dockerService = inject(DockerGeneratorService)
  private router = inject(Router)

popularImages: DockerImage[] = [
    { name: 'node', desc: 'Runtime JavaScript pour applications Node.js', tags: ['18', '20', 'alpine'], defaultTag: 'alpine', tagOptions: ['latest', 'alpine', 'lts', 'personnalisé'] },
    { name: 'python', desc: 'Langage de programmation Python', tags: ['3.11', '3.12', 'alpine'], defaultTag: 'alpine', tagOptions: ['latest', 'alpine', 'lts', 'personnalisé'] },
    { name: 'nginx', desc: 'Serveur web haute performance', tags: ['latest', 'alpine'], defaultTag: 'alpine', tagOptions: ['latest', 'alpine', 'lts', 'personnalisé'] },
    { name: 'redis', desc: 'Base de données en mémoire', tags: ['7', 'alpine'], defaultTag: 'alpine', tagOptions: ['latest', 'alpine', 'lts', 'personnalisé'] },
    { name: 'postgres', desc: 'Base de données relationnelle', tags: ['15', '14'], defaultTag: 'alpine', tagOptions: ['latest', 'alpine', 'lts', 'personnalisé'] },
    { name: 'ubuntu', desc: 'Système d\'exploitation Ubuntu', tags: ['22.04', '20.04'], defaultTag: 'alpine', tagOptions: ['latest', 'alpine', 'lts', 'personnalisé'] },
    { name: 'alpine', desc: 'Distribution Linux minimaliste', tags: ['latest', '3.18'], defaultTag: 'alpine', tagOptions: ['latest', 'alpine', 'lts', 'personnalisé'] },
    { name: 'mysql', desc: 'Base de données MySQL', tags: ['8.0', '5.7'], defaultTag: 'alpine', tagOptions: ['latest', 'alpine', 'lts', 'personnalisé'] }
  ];

  // --- STATE SIGNALS ---
  selectedPopularIndex = signal<number | null>(null);
  customImageName = signal<string>('');
  selectedTag = signal<string>('');
  customTag = signal<string>('');

  // Calcul du nom complet de l’image
  readonly imageName = computed(() => {
    if (this.customImageName()) return this.customImageName();
    if (this.selectedPopularIndex() !== null) return this.popularImages[this.selectedPopularIndex()!].name;
    return '';
  });

  // Options de tags dynamiques selon image sélectionnée
  readonly dynamicTagOptions = computed(() => {
    if (this.selectedPopularIndex() !== null) {
      return this.popularImages[this.selectedPopularIndex()!].tagOptions;
    }
    return ['latest', 'personnalisé'];
  });

  // Affiche la section de configuration si image sélectionnée
  readonly configSectionVisible = computed(() => !!this.imageName());

  // Tag final
  readonly tagValue = computed(() => this.selectedTag() === 'personnalisé' ? this.customTag() : this.selectedTag());

  // --- NAVIGATION (à connecter au wizard parent) ---
  @Output() previous = new EventEmitter<void>();
  @Output() next = new EventEmitter<void>();

  get canGoNext(): boolean {
    return !!this.imageName() && !!this.tagValue();
  }

  // --- Preview live depuis le service central (optionnel ici) ---
  dockerfilePreview = this.dockerService.dockerfilePreview;
  dockerComposePreview = this.dockerService.composePreview;
  dockerRunCommand = this.dockerService.cliPreview;


  // --- Sélection et changements d’input ---
  selectPopular(index: number) {
    this.selectedPopularIndex.set(index);
    this.customImageName.set('');
    this.selectedTag.set(this.popularImages[index].defaultTag);
    this.customTag.set('');
    this.updateDockerfileSignal();
  }

  onCustomImageNameChange(value: string) {
    console.log('Custom image name changed:', value);
    this.customImageName.set(value);
    this.selectedPopularIndex.set(null);
    this.selectedTag.set('latest');
    this.customTag.set('');
    this.updateDockerfileSignal();
  }

  onTagChange(tag: string) {
    this.selectedTag.set(tag);
    if (tag !== 'personnalisé') {
      this.customTag.set('');
    }
    this.updateDockerfileSignal();
  }

  onCustomTagChange(tag: string) {
    console.log('Custom tag changed:', tag);
    this.customTag.set(tag);
    this.updateDockerfileSignal();
  }

  // --- Preview copy/download (à brancher si besoin) ---
  onCopyDockerfile() { /* Implémentation clipboard */ }
  onDownloadDockerfile() { /* Implémentation download */ }

  // --- Envoie l’état vers le service central ---
  updateDockerfileSignal() {
    // Ici on remplit un mini modèle DockerfileConfig pour la preview.
    this.dockerService.updateDockerfile({
      baseImage: `${this.imageName()}:${this.tagValue() || 'latest'}`,
    });

    this.dockerService.updateCompose({
      version: '3.8',
      services: {
        app: {
          image: `${this.imageName()}:${this.tagValue() || 'latest'}`,
        }
      }
    });
    this.dockerService.updateCLI({
      runCommands: [
       {
        containerName: 'app',
        image: `${this.imageName()}:${this.tagValue() || 'latest'}`
       }
      ]
    });
  }
  onPrevious() {
    this.previous.emit();
  }
  onNext() {
    this.updateDockerfileSignal();
    this.next.emit();

    this.router.navigate(['/instruction']);
  }
}
