import { DockerCLIConfig } from "./docker-cli.model";
import { DockerComposeConfig } from "./docker-compose.model";
import { DockerfileConfig } from "./docker-file.model";

export interface DockerProject {
  dockerfile: DockerfileConfig;
  compose: DockerComposeConfig;
  cliCommands: DockerCLIConfig;
}
