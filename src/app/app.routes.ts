import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'details/:id',
    loadComponent: () =>
      import('./pages/details/details.component').then(
        (m) => m.DetailsComponent
      ),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
