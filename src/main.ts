import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import { startSingleSpa } from './single-spa';

bootstrapApplication(App, appConfig)
  .then(() => startSingleSpa())
  .catch((err) => console.error(err));
