# AngularHostV20

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 20.3.42.

## Development server

To start a local development server, run:

```bash
npm run serve-angularv20-host
```

Once the server is running, open your browser and navigate to `http://localhost:4201/`. The application will automatically reload whenever you modify any of the source files.

## Book library Web Component

Before starting or building this host, run `npm run build-web-elem-angular` in
the sibling `book-library-angular` project. The host's asset configuration serves
that project's `dist/webComponent-book-library-angular/browser` files under
`book-library/`, including the component script and stylesheet loaded by
`src/index.html`. The host build also copies these files into its output.

Run `npm run start:mock-server` in `book-library-angular` for the books API on
port 7002. The library's frontend development server is not required.
After changing the library, rebuild its Web Component and reload the host.

## React and Svelte Web Components

Before starting or building this host, run `npm run build-web-component-react`
in `to-do-list-react` and `npm run build-web-component-svelte` in `goals-tracker`.
The host exposes the React build under `to-do-list-react/` (including its
`static` directory) and the Svelte build under `goals-tracker/`.
The source filesystem paths are not part of these public URLs.

Run `npm run start:mock-server` in each project for the to-do API on port 7000
and goals API on port 7001. Their frontend development servers are not required.
Restart the host after changing `angular.json` asset mappings; rebuild the
components and reload the host after changing their source.

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
