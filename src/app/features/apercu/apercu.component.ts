import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatIconModule } from "@angular/material/icon";
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import { Card } from "primeng/card";
import { CommonModule } from '@angular/common';
import { Button, ButtonModule } from "primeng/button";
import { ButtonGroupModule } from 'primeng/buttongroup';
import { Observable } from 'rxjs';
import { DockerDataService } from '../../core/services/docker-data.service';

@Component({
  selector: 'app-apercu',
  imports: [
    CommonModule,
    MatIconModule,
    MatFormFieldModule,
    ButtonModule,
    ButtonGroupModule,
],
  templateUrl: './apercu.component.html',
  styleUrl: './apercu.component.scss'
})
export class ApercuComponent implements OnInit {
constructor(private  translate: TranslateService,
  private dataService: DockerDataService
) {

  this.dockerFile$ = this.dataService.dockerFile$;
  this.dockerCompose$ = this.dataService.dockerCompose$;
  this.dockerCommand$ = this.dataService.dockerCommand$;
}
  ngOnInit(): void {
    console.log('Aperçu component initialized');
    console.log('dockerFile:', this.dockerFile$);
    console.log('dockerCompose:', this.dockerCompose$);
    console.log('dockerCommand:', this.dockerCommand$);
  }
  
dockerFile$: Observable<string> = new Observable<string>();
dockerCompose$: Observable<string> = new Observable<string>();
dockerCommand$: Observable<string> = new Observable<string>();

 
}
