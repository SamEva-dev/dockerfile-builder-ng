import { Injectable, computed, signal, WritableSignal } from '@angular/core';
import { DockerCLIConfig } from '../models/docker-cli.model';

// YAML & Dockerfile générateurs (adapter/ajouter selon besoin)
import * as YAML from 'yaml';
import * as yaml from 'js-yaml';
import { DockerComposeConfig } from '../models/docker-compose.model';
import { DockerfileConfig } from '../models/docker-file.model';

@Injectable({ providedIn: 'root' })
export class DockerGeneratorService {
  // États réactifs pour chaque “builder” (signal = ultra performant)
  readonly dockerfile = signal<DockerfileConfig | null>(null);
  readonly compose = signal<DockerComposeConfig | null>(null);
  readonly cli = signal<DockerCLIConfig | null>(null);

  // Génère le Dockerfile à partir du modèle courant
  readonly dockerfilePreview = computed(() =>
    this.dockerfile() ? this.generateDockerfile(this.dockerfile()!) : ''
  );

  // Génère le docker-compose YAML à partir du modèle courant
  readonly composePreview = computed(() =>
    this.compose() ? this.generateComposeYaml(this.compose()!) : ''
  );

  // Génère le script bash des commandes CLI à partir du modèle courant
  readonly cliPreview = computed(() =>
    this.cli() ? this.generateCLICommands(this.cli()!) : ''
  );

  // --- Méthodes publiques de mise à jour (type-safe) ---
  updateDockerfile(config: DockerfileConfig) {
    this.dockerfile.set(config);
  }

  updateCompose(config: DockerComposeConfig) {
     console.log('Génération Dockerfile avec config:', config);
    this.compose.set(config);
  }

  updateCLI(config: DockerCLIConfig) {
    this.cli.set(config);
  }

  // --- Génération du Dockerfile ---
  generateDockerfile(cfg: DockerfileConfig): string {
    // Exemple ultra simplifié, à compléter selon toutes tes interfaces
    const lines: string[] = [];
    if (cfg.multiStage && cfg.baseImage) {
      lines.push(`# --- Stage: ${cfg.stageName ?? 'builder'} ---`);
      lines.push(`FROM ${cfg.baseImage} AS ${cfg.stageName ?? 'builder'}`);
    } else if (cfg.baseImage) {
      lines.push(`FROM ${cfg.baseImage}`);
    }
    if (cfg.workdir) {
      lines.push(`WORKDIR ${cfg.workdir}`);
    }
    if (cfg.shell) {
      lines.push(`SHELL ${cfg.shell}`);
    }
    if (cfg.Stopsignal) {
      lines.push(`STOPSIGNAL ${cfg.Stopsignal}`);
    }
    
    if (cfg.install) {
      for (const cmd of cfg.install.commands) {
        if (cmd)
          lines.push(`${cmd}`);
      }
    }

    if (cfg.copy) {
      for (const c of cfg.copy) {
        lines.push(
          `COPY${c.fromStage ? ` --from=${c.fromStage}` : ''} ${c.source} ${c.destination}`
        );
      }
    }
    if (cfg.volumes) {
      console.log('Adding volumes:', cfg.volumes);
      lines.push(`VOLUME [${cfg.volumes.map(v => `"${v}"`).join(',')}]`);
    }
    if (cfg.buildCmd) lines.push(`RUN ${cfg.buildCmd}`);

    if (cfg.user) 
    {
      
      if (cfg.user.type === 'alpine') {
        
      lines.push(`\nRUN addgroup -g ${cfg.user.gid} -S ${cfg.user.username} && adduser -u ${cfg.user.uid} 
        -S ${cfg.user.username} -G ${cfg.user.username} -s ${cfg.user.shell}`);
      if (cfg.user.home) lines.push( ` -h ${cfg.user.home}`);
      } else if (cfg.user.type === 'debian') {
        lines.push(`\nRUN groupadd -r ${cfg.user.username} && \n useradd -r -g ${cfg.user.username} ${cfg.user.username} -s ${cfg.user.shell}`);
        if (cfg.user.home) lines.push(` -d ${cfg.user.home}`);
        // UID/GID ne sont pas explicitement gérés ici pour Debian (ils sont désactivés dans le formulaire)
      }
      lines.push(`USER ${cfg.user.username}`);
    }

    if (cfg.exposePorts) {
      for (const port of cfg.exposePorts) {
        lines.push(`EXPOSE ${port.target ?? 0}/${port.protocol ?? 'tcp'}`);
      }
    }
    if (cfg.environment) {
      console.log('Adding environment variables:', cfg.environment);
      Object.entries(cfg.environment).forEach(([k, v]) =>
        lines.push(`ENV ${k}=${v}`)
      );
    }
    if (cfg.labels) {
      console.log('Adding environment variables:', cfg.environment);
      Object.entries(cfg.labels).forEach(([k, v]) =>
        lines.push(`LABEL ${k}=${v}`)
      );
    }
    if(cfg.healthcheck) {
      lines.push(`HEALTHCHECK --interval=${cfg.healthcheck.interval ?? '30s'} --timeout=${cfg.healthcheck.timeout ?? '30s'} --retries=${cfg.healthcheck.retries ?? 3} CMD ${Array.isArray(cfg.healthcheck.test) ? cfg.healthcheck.test.join(' ') : cfg.healthcheck.test}`);
    }
    if (cfg.entrypoint)
      lines.push(`ENTRYPOINT [${cfg.entrypoint.map((e) => `"${e}"`).join(', ')}]`);
    if (cfg.command)
      lines.push(`CMD [${cfg.command.map((c) => `"${c}"`).join(', ')}]`);
    if (cfg.security) {
      if (cfg.security.noNewPrivileges) lines.push(`RUN echo 'kernel.unprivileged_userns_clone=1' > /etc/sysctl.d/10-docker.conf`);
      if (cfg.security.readOnlyRootfs) lines.push(`RUN echo 'kernel.dmesg_restrict=1' > /etc/sysctl.d/10-docker.conf`);
      if (cfg.security.seccompProfile) lines.push(`RUN echo 'seccomp_profile=${cfg.security.seccompProfile}' > /etc/docker/seccomp.json`);
      if (cfg.security.capabilities) {
        const caps = cfg.security.capabilities.map(c => `${c.type} ${c.name}`).join(' ');
        lines.push(`RUN echo 'capabilities=${caps}' > /etc/docker/capabilities.json`);
      }
      if (cfg.security.appArmorProfile) lines.push(`RUN echo 'apparmor_profile=${cfg.security.appArmorProfile}' > /etc/docker/apparmor.json`);
      if (cfg.security.userNamespace) lines.push(`RUN echo 'user_namespace=${cfg.security.userNamespace}' > /etc/docker/userns.json`);
    }
    return lines.join('\n').trim();
  }

  // --- Génération du docker-compose YAML ---
  generateComposeYaml(cfg: DockerComposeConfig): string {
    // Utilise la lib YAML la plus simple (yaml npm), adapte selon besoin
    // (Ici, conversion directe objet → YAML)
    return yaml.dump(cfg, {
  noRefs: true,
  indent: 2,
  lineWidth: -1
});
  }

  // --- Génération des commandes Docker CLI (script bash) ---
  generateCLICommands(cfg: DockerCLIConfig): string {
    const build = (cfg.buildCommands ?? [])
      .map(
        (b) =>
          `docker build -t ${b.tag} ${b.dockerfile ? `-f ${b.dockerfile}` : ''}${
            b.target ? ` --target=${b.target}` : ''
          }${b.buildArgs ? Object.entries(b.buildArgs).map(([k, v]) => ` --build-arg ${k}=${v}`).join('') : ''} ${b.context}`
      )
      .join('\n');

    const run = (cfg.runCommands ?? [])
      .map((r) => {
        const envs = r.environment
          ? Object.entries(r.environment).map(([k, v]) => `--env ${k}=${v}`).join(' ')
          : '';
        const ports = r.ports
          ? r.ports.map((p) => `-p ${p.published}:${p.target}`).join(' ')
          : '';
        const vols = r.volumes
          ? r.volumes.map((v) => `-v ${v.source ?? ''}:${v.target}${v.read_only ? ':ro' : ''}`).join(' ')
          : '';
        const tmpfs = r.tmpfs ? r.tmpfs.map((t) => `--tmpfs ${t}`).join(' ') : '';
        const other = [
          r.user ? `--user ${r.user}` : '',
          r.hostname ? `--hostname ${r.hostname}` : '',
          r.network ? r.network.map((n) => `--network ${n}`).join(' ') : '',
          r.extraHosts ? r.extraHosts.map((h) => `--add-host ${h}`).join(' ') : '',
          r.securityOpt ? r.securityOpt.map((s) => `--security-opt ${s}`).join(' ') : '',
          r.capAdd ? r.capAdd.map((c) => `--cap-add ${c}`).join(' ') : '',
          r.init ? '--init' : '',
          r.restart ? `--restart ${r.restart}` : '',
          r.labels
            ? Object.entries(r.labels)
                .map(([k, v]) => `--label ${k}=${v}`)
                .join(' ')
            : ''
        ].filter(Boolean).join(' ');

        const name = r.containerName ? `--name ${r.containerName}` : '';
        const image = r.image ? r.image : '';
        const command = r.command ? r.command.join(' ') : '';

        return `docker run -d ${name} 
                                    ${envs} 
                                    ${ports} 
                                    ${vols} 
                                    ${tmpfs} 
                                    ${other} 
                                    ${image} 
                                    ${command}`.replace(/\s+/g, ' ');
      })
      .join('\n');

    return [build, run].filter(Boolean).join('\n\n').trim();
  }
}
