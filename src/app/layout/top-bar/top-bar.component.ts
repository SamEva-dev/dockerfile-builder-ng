import { Component, inject } from '@angular/core';
import { LanguageSwitchComponent } from "../../shared/components/language-switch/language-switch.component";
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatIconModule } from "@angular/material/icon";
import { NavigationService } from '../../core/services/navigation.service';

@Component({
  selector: 'app-top-bar',
  imports: [MatIconModule, LanguageSwitchComponent],
  templateUrl: './top-bar.component.html',
  styleUrl: './top-bar.component.scss'
})
export class TopBarComponent {

  nav = inject(NavigationService);

  isMobile = false;

  constructor() {
    // Utilise BreakpointObserver Angular CDK
    const observer = inject(BreakpointObserver);
    observer.observe([Breakpoints.Handset, '(max-width: 900px)'])
      .subscribe(result => {
        this.isMobile = result.matches;
        if (this.isMobile) this.nav.setCollapsed(false); // Force expand (sidebar cachée)
      });
  }

  onMenuClick() {
    if (this.isMobile) {
      this.nav.toggleOverlay();
    } else {
      this.nav.toggleCollapsed();
    }
  }
}
