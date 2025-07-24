import { Component } from '@angular/core';
import { ApercuComponent } from "../apercu/apercu.component";
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { MatIconModule } from "@angular/material/icon";

@Component({
  selector: 'app-instruction',
  imports: [
    //ApercuComponent, 
    TranslatePipe, 
    MatIconModule],
  templateUrl: './instruction.component.html',
  styleUrl: './instruction.component.scss'
})
export class InstructionComponent {
constructor(translate: TranslateService) {}
}
