# Airtable

_Throughout the MVP development cycle_, the source of truth for all content on the
site is in a protected [Airtable](https://airtable.com) base in the Performance
Reporting workspace.

## MVP Development and Migration

When an MVP is finalized, a live version of the PGOV Drupal site will become
the source of truth for finalized content and ongoing updates.

Until then, the content team can populate, clean, and validate the information
in Airtable, while the development team can make structural or architectural
changes without needing to provide an upgrade path or support legacy data.

It is possible to [bootstrap](../local) a fresh copy of the Drupal back end site
and populate it with the latest content and files from Airtable.

### Restricted Access

Access to the Airtable base must be obtained in advance.

### API Key

[Local](../local) and live versions of the site be reinstalled and populated
with content from Airtable, but depend on having a valid API key.

An API key can be obtained at https://airtable.com/create/tokens

The migration script expects to find the API key in an environment variable
called `AIRTABLE_API_KEY`. When using DDEV, the new key can be added using an
`.env` file:

* Copy `.ddev/.env.pgov-example` to `.ddev/.env`
* Add the new API key to the value of `AIRTABLE_API_KEY` in `.ddev/.env`
* Run `ddev restart` for the settings to apply.

### Data Migration

PGOV content is migrated from Airtable using the [Migrate](https://www.drupal.org/docs/core-modules-and-themes/core-modules/migrate-module)
framework built into Drupal core. A small module that extends some the core
modules is in `web/modules/custom/pgov_migrate`. The module also contains
preconfigured migrations and default content, which will be added to the site
each time it's rebuilt.

Migrations can be listed using `ddev drush migrate:status` (this may take some time)
Migrations can be executed using `ddev migrate` (local environment) or
`bin/migrate` (hosted environment).
