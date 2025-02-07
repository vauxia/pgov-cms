---
sidebar_position: 0
---

# Local Development


This codebase is configured to use [DDEV](https://ddev.com/) to allow developers
to run a version of the site locally, at the following URLs:

| *URL*                              | *Purpose*
|------------------------------------| ------------------
| https://performance.ddev.site      | [Drupal back end](../back-end)
| https://performance.ddev.site:3000 | [Next.js front end](../front-end)
| https://performance.ddev.site:3999 | Documentation

## DDEV

Before setting up a local environment, refer to the
[getting started](https://ddev.readthedocs.io/en/stable/) guide to prepare your
computer to run this site using DDEV.

Once DDEV is installed and working, you can use these commands in a terminal
window to start local version of this site:

```shell
# Check out the site
git clone git@github.com:CivicActions/pgov-cms.git

# Enter the project directory
cd pgov-cms

# Start up the site
ddev start
```

The site will now be available at the above URLs.

## Site Database

Throughout the MVP development process, the database is considered disposable.
A new site can be bootstrapped from code and populated from a fresh migration:

A migration requires access to the source bases ([more here](../back-end/airtable))
With a proper access token in place, these commands will generate a fresh site,
populated with content and images from Airtable.

```shell
# Bootstrap the site
drush site-install --existing-config

# Migrate content from Airtable
ddev migrate
```
