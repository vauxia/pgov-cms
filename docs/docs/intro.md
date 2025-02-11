---
sidebar-position: 1
slug: /
title: PGOV Overview
---

# Performance.gov

Performance.gov is a digital product from the U.S. government that helps the
American public–especially civil society professionals–track the progress of
U.S. strategic goals and find opportunities to contribute. Performance.gov
fulfills the legal requirement established by the Government Performance and
Results Modernization Act of 2010 that Federal performance information must be
consolidated and presented on a single website, such that it provides “a
coherent picture of . . . the performance of the federal government and
individual agencies.

## Technical overview

Performance.gov is built using a decoupled architecture. [Drupal](https://drupal.org) is used
as the back-end content management system, while [Next.js](https://nextjs.org/)
is used for the site's front end.

### Drupal

Drupal is a free and open-source content management system (CMS). It's built to
be flexible and adaptable, letting you manage content for different uses beyond
just regular websites.

Drupal's modular design means you can customize it to fit your needs, from
simple sites to complex apps that handle lots of data. Drupal has powerful content
management features, user management, editorial workflows, and reliable content
architectures.

This site uses uses Next.js as a separate, decoupled front end framework, which
it can be updated and managed separately.

[Learn more about the Drupal implementation](development/back-end)

### Next.js

Next.js is a popular open-source React framework for building fast and modern
web applications. It's known for features like server-side rendering (SSR),
static site generation (SSG), and built-in routing, which contribute to improved
performance, SEO, and a better user experience. Next.js handles a lot of the
complex setup typically required for React projects, making it easier to focus
on building the application itself.

When used as the front end for a decoupled Drupal site, Next.js becomes the
presentation layer, responsible for fetching content from Drupal and displaying
it to the user. Next.js can communicate with Drupal's API endpoints, including
those provided by JSON:API or a GraphQL endpoint.

Combining Next.js with a decoupled Drupal back end provides a powerful and
flexible architecture. Drupal handles content creation, management, and storage,
while Next.js focuses on delivering a performant and engaging user experience.
This separation of concerns allows developers to leverage the strengths of both
technologies, resulting in a scalable and maintainable web application.

[Learn more about the Next.js Front end](development/front-end)

### Next.js for Drupal

This site utilizes the [Next.js for Drupal](https://next-drupal.org/) project.
Next.js for Drupal is a powerful toolkit designed to streamline the development
of decoupled Drupal websites using Next.js as the front end. It provides a set
of pre-built components, functions, and utilities that simplify common tasks
like fetching Drupal content, handling authentication, and managing routing. By
abstracting away much of the boilerplate code typically associated with
decoupled Drupal development, Next.js for Drupal allows developers to focus on
building unique features and delivering exceptional user experiences. It offers
a well-defined structure and best practices, making it easier to create performant, scalable, and maintainable decoupled Drupal applications with Next.js.
