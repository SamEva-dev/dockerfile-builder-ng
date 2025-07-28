import { Component, Input, OnInit } from '@angular/core';
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

interface Capability {
  type: 'ADD' | 'DROP';
  name: string;
}

@Component({
  selector: 'app-securite',
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
  templateUrl: './securite.component.html',
  styleUrl: './securite.component.scss'
})
export class SecuriteComponent implements OnInit {
  
  constructor(translate: TranslateService, 
  private dataService: DockerDataService, 
private router: Router ) {}

  @Input() baseDockerfile = '';

  // Options de base
  readOnlyRoot = false;
  noNewPrivs = false;

  // Capabilities Linux dynamiques
  capabilities: Capability[] = [
    { type: 'ADD', name: 'SYS_RAWIO' },
    { type: 'DROP', name: '' }
  ];
  capabilityTypes = [
    { label: 'ADD (ajouter)', value: 'ADD' },
    { label: 'DROP (retirer)', value: 'DROP' }
  ];
  allCapabilities = [
    'AUDIT_CONTROL','AUDIT_WRITE','BLOCK_SUSPEND','CHOWN','DAC_OVERRIDE','DAC_READ_SEARCH','FOWNER',
    'FSETID','IPC_LOCK','IPC_OWNER','KILL','LEASE','LINUX_IMMUTABLE','MAC_ADMIN','MAC_OVERRIDE',
    'MKNOD','NET_ADMIN','NET_BIND_SERVICE','NET_BROADCAST','NET_RAW','SETFCAP','SETGID','SETPCAP',
    'SETUID','SYS_ADMIN','SYS_BOOT','SYS_CHROOT','SYS_MODULE','SYS_NICE','SYS_PACCT','SYS_PTRACE',
    'SYS_RAWIO','SYS_RESOURCE','SYS_TIME','SYS_TTY_CONFIG','SYSLOG','WAKE_ALARM'
  ];

  capabilityOptions: { label: string; value: string; }[] | undefined;

  ngOnInit() {
  // ...other initialization code
  this.capabilityOptions = (this.allCapabilities || []).map(x => ({ label: x, value: x }));
}

  addCapability() {
    this.capabilities.push({ type: 'ADD', name: '' });
  }
  removeCapability(idx: number) {
    this.capabilities.splice(idx, 1);
  }

  // Profils de sécurité
  seccomp = 'default profil seccomp';
  apparmor = '';
  selinux = '';

  // Préview : Affiche les instructions à utiliser avec "docker run"
  get dockerfilePreview(): string {
    // On n’ajoute rien dans le Dockerfile, on documente la commande docker run
    let out = this.baseDockerfile;
    out += `\n\n# Configuration sécurité générée par Docker Builder`;
    out += `\nIMPORTANT: Ces options sont appliquées avec docker run, pas dans le Dockerfile.`;
    out += `\n\n# Instructions de sécurité pour l'utilisation:`;
    out += `\ndocker run \\`;
    // Exemples :
    out += `\n  # --user ... \\`;
    if (this.readOnlyRoot) out += `\n  --read-only \\`;
    if (this.noNewPrivs) out += `\n  --security-opt no-new-privileges:true \\`;
    // Capabilities
    this.capabilities.forEach(c => {
      if (c.type === 'ADD' && c.name)
        out += `\n  --cap-add ${c.name} \\`;
      if (c.type === 'DROP' && c.name)
        out += `\n  --cap-drop ${c.name} \\`;
    });
    // Profils
    if (this.seccomp)
      out += `\n  --security-opt seccomp=${this.seccomp} \\`;
    if (this.apparmor)
      out += `\n  --security-opt apparmor=${this.apparmor} \\`;
    if (this.selinux)
      out += `\n  --security-opt label=option:${this.selinux} \\`;
    out += `\n  <your-image-tag>`;
    out += `\n\n# Ces options de sécurité doivent être appliquées lors à l'exécution du conteneur pour garantir un environnement sécurisé.`;
    return out.trim();
  }

  get dockerComposePreview(): string {
  const imageLine = this.baseDockerfile.split('\n')[0]; // FROM ...
  const image = imageLine.replace('FROM ', '').trim();
  if (!image) return '';

  let out = `version: '3.8'
services:
  app:
    image: ${image}
    # Configuration sécurité générée par Docker Builder
    # IMPORTANT: Ces options ne sont pas dans le Dockerfile, mais au runtime`;

  if (this.readOnlyRoot) {
    out += `\n    read_only: true`;
  }

  let securityOpts: string[] = [];

  if (this.noNewPrivs) {
    securityOpts.push(`no-new-privileges:true`);
  }

  if (this.seccomp) {
    securityOpts.push(`seccomp=${this.seccomp}`);
  }

  if (this.apparmor) {
    securityOpts.push(`apparmor=${this.apparmor}`);
  }

  if (this.selinux) {
    securityOpts.push(`label=option:${this.selinux}`);
  }

  if (securityOpts.length > 0) {
    out += `\n    security_opt:`;
    securityOpts.forEach(opt => {
      out += `\n      - ${opt}`;
    });
  }

  const capAdd = this.capabilities.filter(c => c.type === 'ADD' && c.name).map(c => c.name);
  const capDrop = this.capabilities.filter(c => c.type === 'DROP' && c.name).map(c => c.name);

  if (capAdd.length > 0) {
    out += `\n    cap_add:`;
    capAdd.forEach(cap => out += `\n      - ${cap}`);
  }

  if (capDrop.length > 0) {
    out += `\n    cap_drop:`;
    capDrop.forEach(cap => out += `\n      - ${cap}`);
  }

  return out.trim();
}

get dockerRunCommand(): string {
  const imageLine = this.baseDockerfile.split('\n')[0]; // FROM ...
  const image = imageLine.replace('FROM ', '').trim();
  if (!image) return '';

  let cmd = `docker run \\`;

  cmd += `\n  # --user ... \\`;

  if (this.readOnlyRoot) {
    cmd += `\n  --read-only \\`;
  }

  if (this.noNewPrivs) {
    cmd += `\n  --security-opt no-new-privileges:true \\`;
  }

  this.capabilities.forEach(c => {
    if (c.type === 'ADD' && c.name) {
      cmd += `\n  --cap-add ${c.name} \\`;
    }
    if (c.type === 'DROP' && c.name) {
      cmd += `\n  --cap-drop ${c.name} \\`;
    }
  });

  if (this.seccomp) {
    cmd += `\n  --security-opt seccomp=${this.seccomp} \\`;
  }

  if (this.apparmor) {
    cmd += `\n  --security-opt apparmor=${this.apparmor} \\`;
  }

  if (this.selinux) {
    cmd += `\n  --security-opt label=option:${this.selinux} \\`;
  }

  cmd += `\n  ${image}`;
  cmd += `\n\n# Ces options de sécurité doivent être appliquées lors à l'exécution du conteneur pour garantir un environnement sécurisé.`;

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

    this.router.navigate(['/apercu']);
  }

}
