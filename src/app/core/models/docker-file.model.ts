
import { HealthcheckDefinition, VolumeMount } from "./docker-compose.model";
import { PortMapping } from "./docker-compose.model";

export interface DockerfileConfig {
  labels?: Record<string, string>;
  Stopsignal?: string;
  baseImage?: string;
  workdir?: string;
  shell?: string;
  install?: InstallInstruction;
  copy?: CopyInstruction[] ;
  buildCmd?: string;
  user?: DockerUser;
  exposePorts?: PortMapping[];
  environment?: Record<string, string>;
  command?: string[];
  entrypoint?: string[];
  multiStage?: boolean;
  stageName?: string;
  healthcheck?: HealthcheckDefinition;
  volumes?: string[];
  security?: securityConfig;
}

export interface InstallInstruction {
  type: 'npm' | 'apt' | 'apk' | 'custom';
  commands: string[]; // e.g., ['npm ci --omit=dev']
}

export interface CopyInstruction {
  source: string;
  destination: string;
  fromStage?: string;
}

export interface DockerUser {
  username: string; // e.g., 'appuser'
  uid?: number | null;
  gid?: number;
  type?: 'alpine' | 'debian'; 
    shell?: string; // e.g., '/bin/sh
    home?: string; // e.g., '/home/appuser'
}

export interface securityConfig {
  noNewPrivileges?: boolean;
  readOnlyRootfs?: boolean;
  seccompProfile?: string; // e.g., 'default' or path to custom profile
  capabilities?: CapabilityConfig[]; // e.g., ['NET_ADMIN', 'SYS_TIME']
  appArmorProfile?: string; // e.g., 'docker-default'
  userNamespace?: string; // e.g., 'host'
}

export interface CapabilityConfig {
  type: 'add' | 'drop';
  name: string;
}
