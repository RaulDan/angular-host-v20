# AngularHostV20

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 20.3.42.

## Development server

To start a local development server, run:

```bash
npm start
```

Open `http://localhost:4201/`. The dashboard loads all three remotes; `/books`,
`/goals`, and `/todos` display individual apps.

## Module Federation

In each remote project, install with `npm ci`, then run `npm run serve:federation`
and, in another terminal, `npm run start:mock-server`.

| Remote | Federation entry | API |
| --- | --- | --- |
| book-library-angular | http://localhost:4200/remoteEntry.js | http://localhost:7002 |
| goals-tracker | http://localhost:5000/remoteEntry.js | http://localhost:7001 |
| to-do-list-react | http://localhost:3000/remoteEntry.js | http://localhost:7000 |

Stop a remote's standalone server before starting federation serving on that
same port. The standalone commands/builds remain available. The React host can
run concurrently at `http://localhost:3001/` against the same remote servers.

Configure remote URLs independently in `public/federation.remotes.json`; reload
the host after changing configuration or recovering a failed remote. The hosts
load `./mount` and call its disposer on navigation; an unavailable remote shows
its own error instead of blocking siblings. Each remote owns its framework and
Shadow DOM styles; Angular 20 is not shared with the Angular 22 book runtime.

Run `npm ci` and `npm run build` in this host. For deployment, publish each
remote's federation output with all chunks intact, configure the deployed host's
`federation.remotes.json` with those entry URLs, and serve host routes with an
`index.html` fallback. Remote servers must permit the host origins through CORS;
use HTTPS remote URLs when hosting the shell over HTTPS. No copied web-component
assets or sibling build files are required by the host build.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
