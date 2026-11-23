import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import type { RemoteId } from '../federation/contract';
import { RemotePanel } from './remote-panel';

export interface RemoteInfo {
  remoteId: RemoteId;
  title: string;
  framework: string;
  path: string;
}

export const remotes: RemoteInfo[] = [
  { remoteId: 'book_library', title: 'Book library', framework: 'Angular 22', path: '/angular-app' },
  { remoteId: 'goals_tracker', title: 'Goals tracker', framework: 'Svelte 5', path: '/svelte-app' },
  { remoteId: 'todo_list', title: 'To-do list', framework: 'React 19', path: '/react-app' },
];

@Component({
  imports: [RemotePanel],
  template: `
    <div class="dashboard" [class.single]="panels.length === 1">
      @for (panel of panels; track panel.remoteId) {
        <app-remote-panel [remoteId]="panel.remoteId" [title]="panel.title"
          [framework]="panel.framework" [path]="panel.path" />
      }
    </div>
  `,
  styles: `
    .dashboard { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 20px; align-items: start; }
    .dashboard.single { grid-template-columns: minmax(0, 1fr); }
    @media (max-width: 1200px) { .dashboard { grid-template-columns: 1fr; } }
  `,
})
export class RemotePage {
  private readonly route = inject(ActivatedRoute);
  protected readonly panels: RemoteInfo[] = this.route.snapshot.data['remote']
    ? [this.route.snapshot.data['remote'] as RemoteInfo]
    : remotes;
}

@Component({ template: '<p role="alert">Page not found.</p>' })
export class NotFoundPage {}
