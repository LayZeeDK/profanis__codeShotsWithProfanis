import { Routes } from '@angular/router';
import { DashboardComponent } from './app/pages/dashboard/dashboard.component';

export const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    pathMatch: 'full',
  },
  {
    path: 'products',
    loadChildren: async () =>
      (await import('./app/pages/products/products.routes')).productsRoutes,
  },
  {
    path: 'no-access',
    loadComponent: async () =>
      (await import('./app/pages/no-access/no-access.component'))
        .NoAccessComponent,
  },
];
