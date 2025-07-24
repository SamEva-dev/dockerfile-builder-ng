import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIconModule } from "@angular/material/icon";
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import { Card } from "primeng/card";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-apercu',
  imports: [
    CommonModule,
    MatIconModule, 
    MatFormFieldModule, 
    TranslatePipe,],
  templateUrl: './apercu.component.html',
  styleUrl: './apercu.component.scss'
})
export class ApercuComponent {
constructor(translate: TranslateService) {}

 @Input() content: string = '';
  @Output() copy = new EventEmitter<void>();
  @Output() download = new EventEmitter<void>();
}
