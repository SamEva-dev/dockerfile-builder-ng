import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class NavigationService {
  collapsed = signal(false);      // Pour desktop (expand/collapse)
  overlayOpen = signal(false);    // Pour mobile (overlay menu)

  setCollapsed(val: boolean) { this.collapsed.set(val); }
  toggleCollapsed() { this.collapsed.update(c => !c); }

  setOverlayOpen(val: boolean) { this.overlayOpen.set(val); }
  toggleOverlay() { this.overlayOpen.update(o => !o); }
}
