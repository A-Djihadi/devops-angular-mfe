import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./remote/remote.component').then((m) => m.RemoteComponent),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
