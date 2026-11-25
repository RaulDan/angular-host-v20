import { addErrorHandler, navigateToUrl, registerApplication, start } from 'single-spa';
import type { LifeCycles } from 'single-spa';

type RemoteUrls = {
  books?: string;
  bookBundle?: string;
  todos?: string;
  goals?: string;
};

declare global {
  interface Window {
    singleSpaRemoteUrls?: RemoteUrls;
    bookLibrarySingleSpa?: LifeCycles;
  }
}

const urls = window.singleSpaRemoteUrls ?? {};
const apps = [
  { name: 'books', route: '/angular', url: urls.books },
  { name: 'todos', route: '/react', url: urls.todos ?? 'http://localhost:3000/single-spa.js' },
  { name: 'goals', route: '/svelte', url: urls.goals ?? 'http://localhost:5000/single-spa.js' },
];

function pathname(): string {
  return location.pathname.replace(/\/+$/, '') || '/';
}

function element(id: string): HTMLElement {
  const result = document.getElementById(id);
  if (!result) throw new Error(`Missing single-spa host element: ${id}`);
  return result;
}

function updateLayout(): void {
  const path = pathname();
  for (const app of apps) {
    element(`mfe-section-${app.name}`).hidden = path !== '/' && path !== app.route;
  }
  element('mfe-not-found').hidden = path === '/' || apps.some((app) => app.route === path);
  document.querySelectorAll<HTMLAnchorElement>('[data-mfe-link]').forEach((link) => {
    if (link.getAttribute('href') === path) link.setAttribute('aria-current', 'page');
    else link.removeAttribute('aria-current');
  });
}

function showError(name: string, error: Error): void {
  const errorElement = document.getElementById(`mfe-error-${name}`);
  const message = errorElement?.querySelector('span');
  if (errorElement && message) {
    message.textContent = `Could not load ${name}: ${error.message}`;
    errorElement.hidden = false;
  }
  console.error(`Single-spa application "${name}" failed:`, error);
}

async function loadApplication(name: string, url?: string): Promise<LifeCycles> {
  if (name === 'books' && !url) {
    const bookBundle = urls.bookBundle ?? 'http://localhost:4200/main.js';
    await import(/* @vite-ignore */ bookBundle);
    if (!window.bookLibrarySingleSpa) {
      throw new Error('The Angular book library did not register its lifecycles.');
    }
    return window.bookLibrarySingleSpa;
  }
  if (!url) throw new Error(`No URL configured for ${name}.`);
  return import(/* @vite-ignore */ url);
}

export function startSingleSpa(): void {
  for (const app of apps) {
    registerApplication({
      name: app.name,
      app: async () => {
        const lifecycles = await loadApplication(app.name, app.url);
        element(`mfe-error-${app.name}`).hidden = true;
        return lifecycles;
      },
      activeWhen: () => pathname() === '/' || pathname() === app.route,
      customProps: { domElement: element(`mfe-${app.name}`) },
    });
  }
  addErrorHandler((error) => showError(error.appOrParcelName, error));
  document.addEventListener('click', (event) => {
    if (!(event.target instanceof Element)) return;
    if (event.target.closest('[data-mfe-reload]')) {
      location.reload();
      return;
    }
    const link = event.target.closest<HTMLAnchorElement>('a[data-mfe-link]');
    if (!link || event.defaultPrevented || event.button !== 0 ||
        event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    navigateToUrl(link.href);
  });
  window.addEventListener('single-spa:before-routing-event', updateLayout);
  updateLayout();
  start();
}
