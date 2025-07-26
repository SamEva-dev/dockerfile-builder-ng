import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DockerDataService {
  private dockerFileSubject = new BehaviorSubject<string>('');
  dockerFile$ = this.dockerFileSubject.asObservable();

  private dockerComposeSubject = new BehaviorSubject<string>('');
  dockerCompose$ = this.dockerComposeSubject.asObservable();

  private dockerCommandSubject = new BehaviorSubject<string>('');
  dockerCommand$ = this.dockerCommandSubject.asObservable();

  updateDockerFile(value: string) {
    const current = this.dockerFileSubject.value;
    this.dockerFileSubject.next(current + `\n ${value}`);
  }

  getCurrentDockerFile(): string {
    return this.dockerFileSubject.value;
  }

  updateDockerCompose(value: string) {
    const current = this.dockerComposeSubject.value;
    this.dockerComposeSubject.next(current + `\n ${value}`);
  }

  getCurrentDockerCompose(): string {
    return this.dockerComposeSubject.value;
  }

  updateDockerCommand(value: string) {
    const current = this.dockerCommandSubject.value;
    this.dockerCommandSubject.next(current + `\n ${value}`);
  }

  getCurrentDockerCommand(): string {
    return this.dockerCommandSubject.value;
  }
}
