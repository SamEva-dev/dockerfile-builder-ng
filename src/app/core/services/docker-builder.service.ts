import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DockerBuilderService {
   // ---------- Wizard steps definition ----------
  private readonly steps = [
    'build', 'env', 'ports', 'volumes', 'networks',
    'deploy', 'healthcheck', 'logging', 'security', 'summary'
  ] as const;
  
}

export type Step = (typeof DockerBuilderService.prototype['steps'])[number];
