import {
  AfterViewInit, Component, ElementRef, Input, OnDestroy, ViewChild, signal,
} from '@angular/core';
import type { RemoteId } from '../federation/contract';
import { activateRemote } from '../federation/lifecycle';
import { loadRemoteApp } from '../federation/runtime';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-remote-panel',
  imports: [RouterLink],
  template: `
    <section [attr.aria-labelledby]="remoteId + '-heading'" [attr.aria-busy]="status() === 'loading'">
      <header><a [id]="remoteId + '-heading'" [routerLink]="path">{{ title }}</a><span>{{ framework }}</span></header>
      @if (status() === 'loading') {
        <p role="status">Loading {{ title }}...</p>
      }
      @if (status() === 'error') {
        <p role="alert">Could not load {{ title }}. {{ error() }}</p>
      }
      <div #outlet></div>
    </section>
  `,
  styles: `
    :host { display: block; min-width: 0; }
    section { background: white; border: 1px solid #cbd5e1; border-radius: 12px; overflow: hidden; }
    header { padding: 16px; border-bottom: 1px solid #e2e8f0; }
    a { display: block; margin: 0 0 4px; font-size: 1.25rem; font-weight: 700; }
    span { color: #475569; }
    p { padding: 0 16px; }
    [role="alert"] { color: #b91c1c; }
  `,
})
export class RemotePanel implements AfterViewInit, OnDestroy {
  @Input({ required: true }) remoteId!: RemoteId;
  @Input({ required: true }) title = '';
  @Input({ required: true }) framework = '';
  @Input({ required: true }) path = '';
  @ViewChild('outlet', { static: true }) outlet!: ElementRef<HTMLElement>;

  protected readonly status = signal<'loading' | 'ready' | 'error'>('loading');
  protected readonly error = signal('');
  private stop?: () => void;
  private target?: HTMLElement;

  ngAfterViewInit(): void {
    const target = document.createElement('div');
    this.target = target;
    this.outlet.nativeElement.append(target);
    this.stop = activateRemote(
      async () => (await loadRemoteApp(this.remoteId)).mount(target),
      () => this.status.set('ready'),
      (error) => {
        console.error(`Failed to mount ${this.remoteId}`, error);
        this.error.set(error instanceof Error ? error.message : 'Unknown remote error.');
        this.status.set('error');
        target.replaceChildren();
      },
      (error) => console.error(`Failed to dispose ${this.remoteId}`, error),
    );
  }

  ngOnDestroy(): void {
    this.stop?.();
    this.target?.remove();
  }
}
