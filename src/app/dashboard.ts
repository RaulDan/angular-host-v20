import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { remoteApps } from './federation';
import { RemotePanel } from './remote-panel';

@Component({
  imports: [RouterLink, RemotePanel],
  template: `
    <h2>Dashboard</h2>
    <div class="dashboard">
      @for (app of apps; track app.id) {
        <section>
          <h3><a [routerLink]="app.path">{{ app.title }}</a></h3>
          <app-remote-panel [remote]="app.id" />
        </section>
      }
    </div>
  `,
  styles: [`
    .dashboard { display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 440px), 1fr)); gap: 24px; }
    section { min-width: 0; overflow: auto; }
  `],
})
export class Dashboard {
  protected readonly apps = remoteApps;
}
