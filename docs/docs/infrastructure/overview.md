# Overview

## Codebase Structure

```
📁 .ddev
📁 config
📁 docs
 |- 📁 docs
 |- docusaurus.config.ts
 |- sidebars.ts
📁 src
 |- 📁 frontend
📁 tests
 |- 📁 cypress
    |- 📁 e2e
📁 web
```

### Drupal and DDEV

The following directories support the installation of the Drupal content management framework.

📁 **web**
- This is the docroot of the Drupal installation

📁 **config**
- Storage of `*.yml` configuration management files for Drupal

📁 **.ddev**
- Configuration for [DDEV](https://ddev.readthedocs.io/en/stable/)


### NextJS Front End

📁 **src/frontend**
- This is the docroot of [NextJS](https://nextjs.org/) front end.

### Documentation

📁 **docs**
- Project documentation powered by [Docusaurus](https://docusaurus.io/).
- Source files are in `📁 docs/docs/`
- See `📁 docs/sidebars.ts` for configuring the left-side navigation in the Docusaurus UI.

### Tests

📁 **tests**
- Includes the configuration for end-to-end tests written with [Cypress](https://www.cypress.io/).
- See `📁 tests/cypress/e2e/*cy.js` for individual tests.
