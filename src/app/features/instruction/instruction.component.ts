import { Component, Input } from '@angular/core';
import { ApercuComponent } from "../apercu/apercu.component";
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { MatIconModule } from "@angular/material/icon";
import { SelectModule } from 'primeng/select';
import { ButtonModule } from 'primeng/button';
import { CommonModule, NgIf } from '@angular/common';
import { CardModule } from "primeng/card";
import { FormsModule } from '@angular/forms';

export interface Instruction {
  type: string;
  content: string;
  description?: string;
}

@Component({
  selector: 'app-instruction',
  imports: [
    CommonModule,
    FormsModule,
    ApercuComponent,
    TranslatePipe,
    MatIconModule,
    ApercuComponent,
    ButtonModule,
    SelectModule,
    CardModule
],
  templateUrl: './instruction.component.html',
  styleUrl: './instruction.component.scss'
})
export class InstructionComponent {
constructor(translate: TranslateService) {}
// Données de la preview précédente (ex : FROM ...), à concaténer
  @Input() baseDockerfile = '';

  // Liste dynamique des instructions
  instructions: Instruction[] = [];

  // Dropdown instruction types (clé, label, description FR/EN pour traduction)
  instructionTypes = [
  { value: 'RUN', label: 'RUN', desc: 'INSTRUCTION.TYPE_RUN' },
  { value: 'COPY', label: 'COPY', desc: 'INSTRUCTION.TYPE_COPY' },
  { value: 'ADD', label: 'ADD', desc: 'INSTRUCTION.TYPE_ADD' },
  { value: 'ENV', label: 'ENV', desc: 'INSTRUCTION.TYPE_ENV' },
  { value: 'WORKDIR', label: 'WORKDIR', desc: 'INSTRUCTION.TYPE_WORKDIR' },
  { value: 'EXPOSE', label: 'EXPOSE', desc: 'INSTRUCTION.TYPE_EXPOSE' },
  { value: 'LABEL', label: 'LABEL', desc: 'INSTRUCTION.TYPE_LABEL' }
  // Ajoute d'autres instructions si besoin
];

  // Ajoute une nouvelle étape
  addInstruction() {
    this.instructions.push({ type: 'COPY', content: '', description: '' });
  }

  // Supprime une étape et renumérote
  removeInstruction(idx: number) {
    this.instructions.splice(idx, 1);
    // Si plus d’instructions : rien à faire, elles sont déjà renumérotées (ngFor)
    // Si aucune instruction restante, tu reviens à l’écran initial (handled in template)
  }

  // Génère le texte complet du Dockerfile (base + instructions custom)
  get dockerfilePreview() {
    let preview = this.baseDockerfile;
    if (this.instructions.length > 0) {
      preview += '\n# {{ "INSTRUCTION.PREVIEW_COMMENT" | translate }}\n';
      this.instructions.forEach(ins => {
        if (ins.description && ins.description.trim() !== '') {
          preview += `\n# ${ins.description}`;
        }
        preview += `\n${ins.type} ${ins.content}`;
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
