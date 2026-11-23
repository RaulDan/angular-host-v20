import {Component, Input, provideZonelessChangeDetection} from '@angular/core';
import {TestBed} from '@angular/core/testing';
import {App} from './app';

@Component(
  {selector: 'app-remote-panel', template: '{{ title }}'}
)
class StubRemotePanel {
  @Input() remoteId = '';
  @Input() title = '';
  @Input() framework = '';
}

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideZonelessChangeDetection()]
    }).overrideComponent(App, {set: {imports: [StubRemotePanel]}}).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Angular 20 Module Federation Host');
    expect(compiled.querySelectorAll('app-remote-panel').length).toBe(3);
  });
});
