// Docker Compose spec 3.8 - interfaces principales

export interface DockerComposeConfig {
  version?: string;
  services?: Record<string, ServiceDefinition>;
  volumes?: Record<string, VolumeDefinition | undefined>;
  networks?: Record<string, NetworkDefinition | undefined>;
  secrets?: Record<string, SecretDefinition | undefined>;
  configs?: Record<string, ConfigDefinition | undefined>;
  // Pour les extensions (x-*)
  [x: `x-${string}`]: any;
}

// --- Services ---

export interface ServiceDefinition {
  build?: BuildOptions | string;
  image?: string;
  container_name?: string;
  hostname?: string;
  command?: string | string[];
  environment?: Record<string, string> | string[];
  env_file?: string[] | string;
  ports?: PortMapping[];
  expose?: string[];
  networks?: string[] | Record<string, NetworkServiceOptions>;
  depends_on?: Record<string, ServiceDependsOn> | string[];
  volumes?: (string | VolumeMount)[];
  deploy?: DeployDefinition;
  logging?: LoggingDefinition;
  init?: boolean;
  security_opt?: string[];
  cap_add?: string[];
  tmpfs?: string[];
  secrets?: (string | SecretMount)[];
  configs?: (string | ConfigMount)[];
  profiles?: string[];
  labels?: Record<string, string>;
  restart?: string;
  healthcheck?: HealthcheckDefinition;
  // Pour les propriétés non standards
  [key: string]: any;
}

export interface PortMapping {
  published?: number;
  target?: number;
  protocol?: 'tcp' | 'udp'| 'sctp';
  mode?: 'host' | 'ingress';
}

export interface BuildOptions {
  context: string;
  dockerfile?: string;
  args?: string[];
  cache_from?: string[];
}

export interface ServiceDependsOn {
  condition: "service_started" | "service_healthy" | "service_completed_successfully";
}

// Pour volumes montés dans "volumes"
export interface VolumeMount {
  type?: "bind" | "volume" | "tmpfs" | string;
  source?: string;
  target: string;
  read_only?: boolean;
  consistency?: string;
}

// Pour réseaux par service
export interface NetworkServiceOptions {
  aliases?: string[];
  ipv4_address?: string;
  ipv6_address?: string;
  // etc.
}

// Pour secrets/configs montés dans services
export interface SecretMount {
  source: string;
  target?: string;
  uid?: string;
  gid?: string;
  mode?: number;
}
export interface ConfigMount extends SecretMount {}

// --- Deploy / Swarm ---

export interface DeployDefinition {
  mode?: "replicated" | "global";
  replicas?: number;
  endpoint_mode?: "vip" | "dnsrr";
  update_config?: UpdateOrRollbackConfig;
  rollback_config?: UpdateOrRollbackConfig;
  resources?: ResourcesConfig;
  placement?: PlacementConfig;
  restart_policy?: RestartPolicyConfig;
  healthcheck?: HealthcheckDefinition;
  labels?: Record<string, string>;
}

export interface UpdateOrRollbackConfig {
  parallelism?: number;
  delay?: string;
  order?: "start-first" | "stop-first";
}

export interface ResourcesConfig {
  limits?: ResourceLimitReservation;
  reservations?: ResourceLimitReservation;
}
export interface ResourceLimitReservation {
  cpus?: string;
  memory?: string;
}

export interface PlacementConfig {
  constraints?: string[];
  preferences?: PlacementPreference[];
}
export interface PlacementPreference {
  spread: string;
}

export interface RestartPolicyConfig {
  condition?: "none" | "on-failure" | "any";
  delay?: string;
  max_attempts?: number;
  window?: string;
}

export interface HealthcheckDefinition {
  test: string[] | string;
  interval?: string;
  timeout?: string;
  retries?: number;
  start_period?: string;
}

// --- Logging ---

export interface LoggingDefinition {
  driver: string;
  options?: Record<string, string>;
}

// --- Volumes ---

export interface VolumeDefinition {
  driver?: string;
  driver_opts?: Record<string, string>;
  external?: boolean;
  name?: string;
  labels?: Record<string, string>;
}

// --- Networks ---

export interface NetworkDefinition {
  driver?: string;
  driver_opts?: Record<string, string>;
  attachable?: boolean;
  ipam?: IpamConfig;
  labels?: Record<string, string>;
}

export interface IpamConfig {
  driver?: string;
  config?: IpamSubnetConfig[];
}

export interface IpamSubnetConfig {
  subnet?: string;
  gateway?: string;
  ip_range?: string;
  aux_addresses?: Record<string, string>;
}

// --- Secrets & Configs ---

export interface SecretDefinition {
  file?: string;
  external?: boolean;
  name?: string;
  labels?: Record<string, string>;
}

export interface ConfigDefinition {
  file?: string;
  external?: boolean;
  name?: string;
  labels?: Record<string, string>;
}
