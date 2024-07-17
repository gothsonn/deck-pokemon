import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'decks',
    loadComponent: () =>
      import('./components/deck-list/deck-list.component').then(m => m.DeckListComponent),
  },
  {
    path: 'create',
    loadComponent: () =>
      import('./components/deck-create/deck-create.component').then(m => m.DeckCreateComponent),
  },
  {
    path: 'detail/:id',
    loadComponent: () =>
      import('./components/deck-detail/deck-detail.component').then(m => m.DeckDetailComponent),
  },
  { path: '', redirectTo: '/decks', pathMatch: 'full' },
];
