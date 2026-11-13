import { Type } from '@angular/core';
import { Routes } from '@angular/router';
import { loadRemoteModule } from './core/remote-loader';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'dashboard',
  },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./core/dashboard/dashboard.component').then((m) => m.DashboardComponent),
  },
  {
    // Route vers le micro frontend remote, chargé dynamiquement à l'exécution
    path: 'remote',
    loadComponent: () =>
      loadRemoteModule<{ RemoteComponent: Type<unknown> }>('./Component').then(
        (m) => m.RemoteComponent,
      ),
  },
];
