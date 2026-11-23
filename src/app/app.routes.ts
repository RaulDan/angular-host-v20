import { Routes } from '@angular/router';
import { NotFoundPage, RemotePage, remotes } from './remote-page';

export const routes: Routes = [
  { path: '', component: RemotePage, pathMatch: 'full' },
  ...remotes.map((remote) => ({
    path: remote.path.slice(1),
    component: RemotePage,
    data: { remote },
  })),
  { path: '**', component: NotFoundPage },
];
