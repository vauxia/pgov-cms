---
sidebar_position: 0
---

# Local Development


This codebase is configured to use [DDEV](https://ddev.com/) to allow developers
to run a version of the site locally, at the following URLs:

| *URL*                              | *Purpose*
|------------------------------------| ------------------
| https://performance.ddev.site      | [Drupal back end](../back-end)
| https://localhost:3000             | [Next.js front end](../front-end)
| https://performance.ddev.site:4000 | Documentation

## DDEV

DDEV is an open-source tool that simplifies the process of creating and managing local development environments, particularly for PHP-based projects like Drupal. It uses Docker to provide consistent, reproducible environments with pre-configured services, allowing developers to focus on coding rather than environment setup.

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

## Install Dependencies Using Composer

In a Drupal project, Composer manages all the PHP dependencies, including Drupal core, contributed modules, and libraries. It automates the process of downloading, installing, and updating these components, ensuring that all required elements are present and compatible, leading to a more stable and maintainable codebase.

```shell
# Install dependencies
ddev composer install
```

## Drupal Site Install and Config Import

Drupal site install is the process of setting up a fresh Drupal instance, configuring the database, creating the initial admin user, and enabling necessary modules. It essentially lays the foundation for a functional Drupal website, allowing you to then customize it with content, themes, and configurations.

Drupal configuration refers to the settings and options that define how a Drupal website functions, encompassing things like content types, user roles, views, and system settings. These configurations, which can be exported and imported, allow for consistent and reproducible site setups across different environments, making development and deployment more efficient. 

If no database exists, you can import exiting config as part of the initial site install.

```shell
# Run site install and import config
ddev drush site-install --existing-config
```

If the database already exits, then you may import the config into the existing site.

```shell
# Import config into an existing site
ddev drush config:import
```

## Drupal Admin Access

After the local site has been installed, Drush may be used to generate a one-time login link to access the Drupal administration pages. 

```shell
# Generate one-time login link
ddev drush user:login
```

## Site Database and Migrations

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

# Next.js Decoupled Frontend

This project uses Next.js as the frontend to render content fetched from a Drupal backend. This approach allows developers to leverage the benefits of both systems: Drupal's content management capabilities and Next.js's frontend development experience.

```shell
# Move to the Next.Js install directory
cd src/frontend

# Install dependencies
npm install

# Create a local env file from the example file
cp .env.example .env.local

# Start the local dev server
npm run dev
```

## Next.js for Drupal Oauth Client Config

An OAuth client must be set up in Drupal before the decoupled Next.Js frontend can connect to and consume content from Drupal. Follow the instruction in the [Next.Js for Drupal documentation](https://next-drupal.org/learn/preview-mode/create-oauth-client) to configure the OAuth client locally.
