import { Routes } from '@angular/router';
import { stepperGuard } from '../core/guards/stepper.guard';

export const routes: Routes = [
  {
    path: 'accueil',
    loadComponent: () =>
      import('./features/accueil/accueil.component').then(m => m.AccueilComponent)
  },
  {
    path: 'base-image',
    loadComponent: () =>
      import('./features/base-image/base-image.component').then(m => m.BaseImageComponent)
  },
  {
    path: 'instruction',
    loadComponent: () =>
      import('./features/instruction/instruction.component').then(m => m.InstructionComponent)
  },
  {
    path: 'configuration',
    loadComponent: () =>
      import('./features/configuration/configuration.component').then(m => m.ConfigurationComponent)
  },
  {
    path: 'port-reseau',
    loadComponent: () =>
      import('./features/port-reseau/port-reseau.component').then(m => m.PortReseauComponent)
  },
  {
    path: 'volumes',
    loadComponent: () =>
      import('./features/volumes/volumes.component').then(m => m.VolumesComponent)
  },
  {
    path: 'utilisateurs',
    loadComponent: () =>
      import('./features/utilisateurs/utilisateurs.component').then(m => m.UtilisateursComponent)
  },
  {
    path: 'securite',
    loadComponent: () =>
      import('./features/securite/securite.component').then(m => m.SecuriteComponent)
  },
  {
    path: 'apercu',
    canActivate: [stepperGuard],
    loadComponent: () =>
      import('./features/apercu/apercu.component').then(m => m.ApercuComponent)
  },
  {
    path: 'export',
    canActivate: [stepperGuard],
    loadComponent: () =>
      import('./features/export/export.component').then(m => m.ExportComponent)
  },
  // Redirection racine
  { path: '', redirectTo: 'accueil', pathMatch: 'full' },
  {
  path: '**',
  loadComponent: () =>
    import('./features/not-found/not-found.component').then(m => m.NotFoundComponent)
}
  // Optionnel : page 404
  // { path: '**', component: NotFoundComponent }
];
