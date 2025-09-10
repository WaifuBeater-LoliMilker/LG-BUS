import { Routes } from '@angular/router';
//import { managersRoutes } from './components/managers/managers.routes';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    loadComponent: () => {
      return import('./components/login/login.component').then(
        (c) => c.LoginComponent
      );
    },
  },
  {
    path: 'main-page',
    loadComponent: () => {
      return import('./components/main-page/main-page.component').then(
        (c) => c.MainPageComponent
      );
    },
  },
  {
    path: '**',
    loadComponent: () =>
      import('./components/_shared/not-found/not-found.component').then(
        (c) => c.NotFoundComponent
      ),
  },
];
