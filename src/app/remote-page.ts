import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { remoteApps } from './federation';
import { RemotePanel } from './remote-panel';

@Component({
  imports: [RemotePanel],
  template: '<h2>{{ app.title }}</h2><app-remote-panel [remote]="app.id" />',
})
export class RemotePage {
  protected readonly app = this.resolveApp();

  private resolveApp() {
    const id: unknown = inject(ActivatedRoute).snapshot.data['remote'];
    const app = remoteApps.find(candidate => candidate.id === id);
    if (!app) throw new Error('Unknown remote route.');
    return app;
  }
}
