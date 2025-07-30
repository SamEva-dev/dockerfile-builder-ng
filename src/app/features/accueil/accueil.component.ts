import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterLink } from '@angular/router';
import { MatIconModule } from "@angular/material/icon";
import { Button, ButtonModule } from "primeng/button";
import { ButtonGroupModule } from 'primeng/buttongroup';

@Component({
  selector: 'app-accueil',
  imports: [
    CommonModule, 
    TranslatePipe, 
    MatButtonModule, 
    MatIconModule,
    ButtonModule,
    RouterLink,
    ButtonGroupModule,],
  templateUrl: './accueil.component.html',
  styleUrl: './accueil.component.scss'
})
export class AccueilComponent {
  constructor(private router: Router,
    translate: TranslateService) {}

    startProject() {
      // Navigue vers base-image, ou active le stepper selon ton workflow
      this.router.navigate(['/base-image']);
    }

    openHistorique() {
      this.router.navigate(['/export']);
    }
}
