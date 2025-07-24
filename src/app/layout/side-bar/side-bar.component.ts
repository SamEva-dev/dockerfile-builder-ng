import { Component } from '@angular/core';

import { RouterModule, Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MENU_ITEMS } from '../../../core/config/menu.config';
import { TranslatePipe } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-side-bar',
  imports: [CommonModule, RouterModule, MatIconModule, TranslatePipe],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.scss'
})
export class SideBarComponent {
  menu = MENU_ITEMS;
    constructor(private router: Router) {}

    isActive(path: string): boolean {
      return this.router.url.startsWith(path);
    }
}
