import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/landing/landing.component').then(m => m.LandingComponent)
  },
  {
    path: 'en',
    loadComponent: () => import('./features/chronicles/chronicles.component').then(m => m.ChroniclesComponent)
  },
  {
    path: 'fr',
    loadComponent: () => import('./features/chronicles/chronicles.component').then(m => m.ChroniclesComponent)
  },
  {
    path: 'comments',
    loadComponent: () => import('./features/comments/comments.component').then(m => m.CommentsComponent)
  },
  { path: '**', redirectTo: '' }
];
