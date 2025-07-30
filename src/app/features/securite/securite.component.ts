import { ChangeDetectionStrategy, Component, EventEmitter, inject, Input, OnInit, Output, signal } from '@angular/core';
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
import { CapabilityConfig } from '../../core/models/docker-file.model';

interface Capability {
  type: 'ADD' | 'DROP';
  name: string;
}

type CapabilityType = 'add' | 'drop';


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
  styleUrl: './securite.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SecuriteComponent  {
  
private translate = inject(TranslateService)
  private dockerService = inject(DockerGeneratorService)
  private router = inject(Router)

  // Capabilities Linux dynamiques
  
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
// --- Signaux principaux pour tous les champs ---
  readOnlyRoot = signal<boolean>(false);
  noNewPrivs = signal<boolean>(false);

  // Capabilities (add/drop)
  capabilities = signal<CapabilityConfig[]>([]);
 
  capabilityOptions = [
    { label: 'NET_BIND_SERVICE', value: 'NET_BIND_SERVICE' },
    { label: 'SYS_ADMIN', value: 'SYS_ADMIN' },
    { label: 'CHOWN', value: 'CHOWN' },
    { label: 'SETUID', value: 'SETUID' },
    { label: 'SETGID', value: 'SETGID' },
    { label: 'KILL', value: 'KILL' },
    { label: 'AUDIT_WRITE', value: 'AUDIT_WRITE' },
    // ... (ajoute ici toutes les capabilities Linux pertinentes)
  ];

  seccomp = signal<string>('default');
  apparmor = signal<string>('');
  selinux = signal<string>('');

  // Navigation Wizard
  @Output() previous = new EventEmitter<void>();
  @Output() next = new EventEmitter<void>();

  // Preview live
  dockerfilePreview = this.dockerService.dockerfilePreview;
  dockerComposePreview = this.dockerService.composePreview;
  dockerRunCommand = this.dockerService.cliPreview;


  // Capabilities management
  addCapability() {
    this.capabilities.set([
      ...this.capabilities(),
      { type: 'add', name: 'NET_BIND_SERVICE' }
    ]);
    this.updateAllSignals();
  }
  removeCapability(index: number) {
    const updated = [...this.capabilities()];
    updated.splice(index, 1);
    this.capabilities.set(updated);
    this.updateAllSignals();
  }

  // Appelé à chaque modification de champ
  updateAllSignals() {
    this.generateFileFromInstructions();
    this.generateComposeFromInstructions(); 
    this.generateCommandFromInstructions();
    
  }

  generateFileFromInstructions(){
    const base = this.dockerService.dockerfile();

    const securityConfig = {
      readOnlyRoot: this.readOnlyRoot(),
      noNewPrivs: this.noNewPrivs(),
      capabilities: this.capabilities().map(c => ({
        type: c.type.toLowerCase() as CapabilityType,
        name: c.name
      })),
      seccomp: this.seccomp(),
      apparmor: this.apparmor(),
      selinux: this.selinux()
    };
    this.dockerService.updateDockerfile({ 
      ...(base || {}),
      security: securityConfig
    }
    );
  }

  generateComposeFromInstructions(){
    const baseCompose = this.dockerService.compose();
    const services = { ...(baseCompose?.services || {}) };
      services['web'] = {
        ...services['web'],
        read_only: this.readOnlyRoot(),
        security_opt: [
          ...(this.noNewPrivs() ? ['no-new-privileges:true'] : []),
          ...(this.seccomp() ? [`seccomp:${this.seccomp()}`] : []),
          ...(this.apparmor() ? [`apparmor:${this.apparmor()}`] : []),
          ...(this.selinux() ? [`selinux:${this.selinux()}`] : []),
        ].filter(Boolean),
        cap_add: this.capabilities().filter(c => c.type === 'add').map(c => c.name),
        cap_drop: this.capabilities().filter(c => c.type === 'drop').map(c => c.name)
      };
    this.dockerService.updateCompose({
      ...(baseCompose || {}),
      services
    });


  }

  generateCommandFromInstructions() {
  const baseCli = this.dockerService.cli() || {};

  const securityOpt = [
    ...(this.noNewPrivs() ? ['no-new-privileges:true'] : []),
    ...(this.seccomp() ? [`seccomp=${this.seccomp()}`] : []),
    ...(this.apparmor() ? [`apparmor=${this.apparmor()}`] : []),
    ...(this.selinux() ? [`label=${this.selinux()}`] : []),
  ].filter(Boolean);

  const capAdd = this.capabilities().filter(c => c.type === 'add').map(c => c.name);
  const capDrop = this.capabilities().filter(c => c.type === 'drop').map(c => c.name);
  const readOnly = this.readOnlyRoot();

  const patch = { securityOpt, capAdd, capDrop, readOnly };

  const runCommands = (baseCli.runCommands && baseCli.runCommands.length > 0)
    ? baseCli.runCommands.map(cmd => ({ ...cmd, ...patch }))
    : [patch];

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
  }
  onNext() {
    this.updateAllSignals();
    this.next.emit();
    this.router.navigate(['/apercu']);
  }

}
