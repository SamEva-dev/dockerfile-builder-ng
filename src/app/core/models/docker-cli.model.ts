import { PortMapping, VolumeMount } from "./docker-compose.model";

export interface DockerCLIConfig {
  buildCommands?: DockerBuildCommand[];
  runCommands?: DockerRunCommand[];
}

export interface DockerBuildCommand {
  tag?: string;
  context?: string;
  dockerfile?: string;
  buildArgs?: Record<string, string>;
  target?: string;
}

export interface DockerRunCommand {
  containerName?: string;
  image?: string;
  environment?: Record<string, string>;
  envFile?: string;
  ports?: PortMapping[];
  expose?: number[];
  volumes?: VolumeMount[];
  tmpfs?: string[];
  user?: string;
  hostname?: string;
  network?: string[];
  extraHosts?: string[];
  securityOpt?: string[];
  capAdd?: string[];
  restart?: string;
  init?: boolean;
  sysctls?: Record<string, string>;
  command?: string[];
  labels?: Record<string, string>;
}
