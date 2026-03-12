import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: 'login', loadComponent: () => import('./components/login/login').then(m => m.Login) },
  { path: 'register', loadComponent: () => import('./components/register/register').then(m => m.Register) },
  { path: 'books', loadComponent: () => import('./components/book-list/book-list').then(m => m.BookList), canActivate: [authGuard] },
  { path: 'books/add', loadComponent: () => import('./components/book-form/book-form').then(m => m.BookForm), canActivate: [authGuard] },
  { path: 'books/edit/:id', loadComponent: () => import('./components/edit-book/edit-book').then(m => m.EditBook), canActivate: [authGuard] },
  { path: '', redirectTo: 'books', pathMatch: 'full' }
];
