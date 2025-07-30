import { Component, computed, EventEmitter, inject, Input, Output, signal } from '@angular/core';
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

@Component({
  selector: 'app-utilisateurs',
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
  templateUrl: './utilisateurs.component.html',
  styleUrl: './utilisateurs.component.scss'
})
export class UtilisateursComponent {
  private translate = inject(TranslateService)
  private dockerService = inject(DockerGeneratorService)
  private router = inject(Router)

  // Mode création utilisateur
 shellOptions = [
  { label: '/bin/sh (par défaut)', value: '/bin/sh' },
  { label: '/bin/bash', value: '/bin/bash' },
  { label: 'zsh', value: 'zsh' },
  { label: '/usr/sbin/nologin (sécurisé)', value: '/usr/sbin/nologin' },
  { label: '', value: '' }
];
// Signaux principaux
  createUser = signal<boolean>(false);
  selectedExistingUser = signal<string>('');

  // Options
  existingUsers = ['node', 'www-data', 'root'];
  userTypes = [
    { label: 'Utilisateur régulier (Ubuntu/Debian)', value: 'debian' },
    { label: 'Utilisateur système (Alpine/BusyBox)', value: 'alpine' }
  ];

  // shellOptions = [
  //   { label: '/bin/sh', value: '/bin/sh' },
  //   { label: '/bin/bash', value: '/bin/bash' },
  //   { label: '/usr/sbin/nologin', value: '/usr/sbin/nologin' }
  // ];

  // Paramètres de création d’utilisateur
  userType = signal<'alpine' | 'debian'>('alpine');
  username = signal<string>('appuser');
  uid = signal<number>(1001);
  gid = signal<number>(1001);
  shell = signal<string>('/bin/sh');
  home = signal<string>('/home/appuser');

  // Navigation Wizard
  @Output() previous = new EventEmitter<void>();
  @Output() next = new EventEmitter<void>();

  // Preview live
  dockerfilePreview = this.dockerService.dockerfilePreview;
  dockerComposePreview = this.dockerService.composePreview;
  dockerRunCommand = this.dockerService.cliPreview;

  // Gestion readonly UID/GID pour Debian
  isDebianUser = computed(() => this.userType() === 'debian');


  // Update live Docker configs
  updateAllSignals() {
    this.generateFileFromInstructions();
    this.generateComposeFromInstructions();
    this.generateCommandFromInstructions();
  }

  generateFileFromInstructions() {
    const base = this.dockerService.dockerfile();

    if (this.createUser()) {
      this.dockerService.updateDockerfile({
        ...(base || {}),
        user: {
          username: this.username(),
          uid: this.uid(),
          gid: this.gid(),
          type: this.userType(),
          shell: this.shell(),
          home: this.home()
        }
      });
    }
    else {
      this.dockerService.updateDockerfile({
        ...(base || {}),
        user: {
          username: this.selectedExistingUser()
        }
      });
    }
   
  }

  generateComposeFromInstructions() {
    const baseCompose = this.dockerService.compose();
    const services = { ...(baseCompose?.services || {}) };
      services['web'] = {
        ...services['web'],
        user: this.createUser() ? this.username() : this.selectedExistingUser(),
      };
    this.dockerService.updateCompose({
      ...(baseCompose || {}),
      services
    });
  }

  generateCommandFromInstructions() {
  const baseCli = this.dockerService.cli() || {};
  const user = this.createUser() ? this.username() : this.selectedExistingUser();
  const shell = this.shell();

  const runCommands = (baseCli.runCommands && baseCli.runCommands.length > 0)
    ? baseCli.runCommands.map(cmd => ({
        ...cmd,
        user,
        shell
      }))
    : [{
        user,
        shell
      }];

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
    this.router.navigate(['/volumes']);
  }
  onNext() {
    this.updateAllSignals();
    this.next.emit();

    this.router.navigate(['/securite']);
  }


}
