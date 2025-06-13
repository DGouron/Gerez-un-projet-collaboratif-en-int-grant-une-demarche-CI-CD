# Bobapp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 14.1.0.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

## CI/CD and Automation

### CI/CD Pipeline
The project uses GitHub Actions for development process automation:
- Automatic tests on each push
- Automatic build on main branch
- Automatic deployment to production environment

### Docker Hub
The project uses Docker Hub for image management:
- Images tagged with commit hash for tracking
- `latest` images for main branch
- Snapshot images for development branches

### Snapshots
Snapshots are intermediate versions used for:
- Testing new features in development
- Validating continuous integration
- Facilitating rollback in case of issues

To use a snapshot version:
```bash
docker pull [username]/bobapp:snapshot-[commit-hash]
```

### Development Workflow
1. Development on a feature branch
2. Automatic tests via CI
3. Snapshot image creation
4. Integration testing
5. Merge to main
6. Automatic deployment
