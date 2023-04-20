import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home.page').then((m) => m.HomePage),
  },
  {
    path: 'profile',
    loadComponent: () => import('./pages/profile/profile.page').then((m) => m.ProfilePage),
  },
  {
    path: 'search',
    loadComponent: () => import('./pages/search/search.page').then( m => m.SearchPage)
  },
  {
    path: 'cart',
    loadComponent: () => import('./pages/cart/cart.page').then( m => m.CartPage)
  },
  {
    path: 'orders',
    loadComponent: () => import('./pages/orders/orders.page').then( m => m.OrdersPage)
  },
  {
    path: 'product',
    loadComponent: () => import('./pages/product-detail/product-detail.page').then( m => m.ProductDetailPage)
  },
  {
    path: 'startup',
    loadComponent: () => import('./pages/startup/startup.page').then( m => m.StartupPage)
  },

];
