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
        <section class="app-card">
          <h3><a [routerLink]="app.path">{{ app.title }}</a></h3>
          <app-remote-panel [remote]="app.id" />
        </section>
      }
    </div>
  `,
  styles: [`
    .dashboard { display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 440px), 1fr)); gap: 24px; background: gray }
    .app-card {
      min-width: 0;
      overflow: auto;
      background: #edf1f7;
      border: 1px solid #dbe5f4;
      border-radius: 18px;
      box-shadow: 0 12px 30px rgba(30, 58, 95, 0.16);
    }
    .app-card h3 {
      margin: 0;
      padding: 18px 22px;
      background: linear-gradient(135deg, #eff6ff, #f8fafc);
      border-bottom: 1px solid #dbe5f4;
    }
    .app-card h3 a {
      color: #1e40af;
      font-size: 1.15rem;
      text-decoration: none;
    }
    .app-card h3 a:hover { color: #1d4ed8; text-decoration: underline; }
    .app-card h3 a:focus-visible { outline: 2px solid #2563eb; outline-offset: 4px; }
  `],
})
export class Dashboard {
  protected readonly apps = remoteApps;
}
