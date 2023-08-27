import { Routes } from '@angular/router';
import { isLoggedGuardFn } from '../../guards';

export const productsRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    canActivate: [isLoggedGuardFn],
    loadComponent: async () =>
      (await import('./products.component')).ProductsComponent,
  },
  {
    path: ':id',
    loadComponent: async () =>
      (await import('./product-detail/product-detail.component'))
        .ProductDetailComponent,
  },
];
