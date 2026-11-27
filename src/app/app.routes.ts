import { Routes } from '@angular/router';
import { Dashboard } from './dashboard';
import { RemotePage } from './remote-page';

export const routes: Routes = [
  { path: '', component: Dashboard, pathMatch: 'full' },
  { path: 'books', component: RemotePage, data: { remote: 'book_library' } },
  { path: 'goals', component: RemotePage, data: { remote: 'goals_tracker' } },
  { path: 'todos', component: RemotePage, data: { remote: 'todo_list' } },
  { path: '**', redirectTo: '' },
];
