import { Component, inject } from '@angular/core';

import { RouterModule, Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule, TranslatePipe } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { DrawerModule } from 'primeng/drawer';
import { MENU_ITEMS } from '../../core/config/menu.config';
import { NavigationService } from '../../core/services/navigation.service';


@Component({
  selector: 'app-side-bar',
  imports: [CommonModule,TranslateModule, RouterModule, MatIconModule, DrawerModule],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.scss'
})

export class SideBarComponent {
  nav = inject(NavigationService);
  menu = MENU_ITEMS;
  visible = false;

  constructor(private router: Router) {}

  isActive(path: string): boolean {
    return this.router.url.startsWith(path);
  }

  onMenuItemClick() {
    if (this.nav.overlayOpen()) {
      this.nav.setOverlayOpen(false);
    }
  }
}
