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

@Component({
  selector: 'app-utilisateurs',
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
  templateUrl: './utilisateurs.component.html',
  styleUrl: './utilisateurs.component.scss'
})
export class UtilisateursComponent {
  constructor(translate: TranslateService) {}

  @Input() baseDockerfile = '';

  // Mode création utilisateur
 shellOptions = [
  { label: 'sh (par défaut)', value: 'sh' },
  { label: 'bath', value: 'bath' },
  { label: 'zsh', value: 'zsh' },
  { label: 'nologin (sécurisé)', value: 'nologin' },
  { label: '', value: '' }
];
shell = 'sh'; // valeur par défaut
  createUser = false;

  // Form utilisateur custom
  userTypes = [
    { label: 'Utilisateur régulier (Ubuntu/Debian)', value: 'debian' },
    { label: 'Utilisateur système (Alpine/BusyBox)', value: 'alpine' }
  ];
  userType = 'alpine';
  username = 'appuser';
  uid = '1001';
  gid = '1001';
  home = '';

  // Utilisateurs connus
  existingUsers = ['node', 'www-data', 'nobody', '1001'];
  selectedExistingUser = '';

  get isDebianUser() { 
    return this.userType === 'debian'; 
  }

  // Génération du Dockerfile
  get dockerfilePreview(): string {
    let out = this.baseDockerfile;
    out += `\n\n# Définir l'utilisateur d'exécution`;
    if (this.createUser && this.username) {
      out += `\n\n# Création d'un utilisateur personnalisé`;
    if (this.userType === 'alpine') {
      out += `\nRUN addgroup -g ${this.gid} -S ${this.username} && \\`;
      out += `\n    adduser -u ${this.uid} -S ${this.username} -G ${this.username} -s /bin/${this.shell}`;
      if (this.home) out += ` -h ${this.home}`;
    } else {
      out += `\nRUN groupadd -r ${this.username} && \\`;
      out += `\n    useradd -r -g ${this.username} ${this.username} -s /bin/${this.shell}`;
      if (this.home) out += ` -d ${this.home}`;
      // UID/GID ne sont pas explicitement gérés ici pour Debian (ils sont désactivés dans le formulaire)
    }
    
    out += `\n\n# Définir l'utilisateur d'exécution\nUSER ${this.username}`;
  
    } else if (this.selectedExistingUser) {
      out += `\nUSER ${this.selectedExistingUser}`;
    }
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
