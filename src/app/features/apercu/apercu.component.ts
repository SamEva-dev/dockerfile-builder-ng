import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatIconModule } from "@angular/material/icon";
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import { Card } from "primeng/card";
import { CommonModule } from '@angular/common';
import { Button, ButtonModule } from "primeng/button";
import { ButtonGroupModule } from 'primeng/buttongroup';

@Component({
  selector: 'app-apercu',
  imports: [
    CommonModule,
    MatIconModule,
    MatFormFieldModule,
    TranslatePipe,
    ButtonModule,
    ButtonGroupModule,
    Button
],
  templateUrl: './apercu.component.html',
  styleUrl: './apercu.component.scss'
})
export class ApercuComponent implements OnInit {
constructor(private  translate: TranslateService) {}
  

 @Input() content: string = '';
  @Output() copy = new EventEmitter<void>();
  @Output() download = new EventEmitter<void>();

  ngOnInit(): void {
   
    this.content= '# Your Dockerfile will appear here...';
  }
}
