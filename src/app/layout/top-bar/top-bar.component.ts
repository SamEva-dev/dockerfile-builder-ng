import { Component } from '@angular/core';
import { LanguageSwitchComponent } from "../../shared/components/language-switch/language-switch.component";

@Component({
  selector: 'app-top-bar',
  imports: [LanguageSwitchComponent],
  templateUrl: './top-bar.component.html',
  styleUrl: './top-bar.component.scss'
})
export class TopBarComponent {

}
