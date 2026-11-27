import { AfterViewInit, Component, ElementRef, Input, OnDestroy, ViewChild, signal } from '@angular/core';
import { activateRemote, RemoteId } from './federation';

@Component({
  selector: 'app-remote-panel',
  template: `
    @if (loading()) { <p role="status">Loading application...</p> }
    @if (error()) { <p role="alert">{{ error() }} Reload the page to try again.</p> }
    <div #surface></div>
  `,
  styles: [':host { display: block; min-width: 0; } [role="alert"] { color: #a11919; }'],
})
export class RemotePanel implements AfterViewInit, OnDestroy {
  @Input({ required: true }) remote!: RemoteId;
  @ViewChild('surface', { static: true }) surface!: ElementRef<HTMLElement>;
  protected readonly loading = signal(true);
  protected readonly error = signal('');
  private deactivate?: () => void;

  ngAfterViewInit(): void {
    this.deactivate = activateRemote(
      this.surface.nativeElement,
      this.remote,
      () => this.loading.set(false),
      error => {
        this.loading.set(false);
        this.error.set(error instanceof Error ? error.message : 'Application could not be loaded.');
      },
    );
  }

  ngOnDestroy(): void { this.deactivate?.(); }
}
