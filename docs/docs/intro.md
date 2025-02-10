---
sidebar-position: 1
slug: /
title: PGOV Overview
---

# Technical documentation

Performance.gov is built using a decoupled architecture. [Drupal](https://drupal.org) is used as the back-end content management system, while [Next.js](https://nextjs.org/) is used for the site's frontend.

## Drupal

Drupal is a free and open-source content management system (CMS). It's built to be flexible and adaptable, letting you manage content for different uses beyond just regular websites. Drupal's modular design means you can customize it to fit your needs, from simple sites to complex apps that handle lots of data.

Drupal works well when you want to separate how content is stored (the backend) from how it's displayed (the frontend). This setup lets you build fast and interactive user interfaces using technologies like React, Angular, or Vue.js. Drupal's focus on APIs and tools like JSON:API makes it easy to get content out of Drupal in a standard format. This means frontend developers can use the content without being restricted by Drupal's view system, allowing for more design choices and better performance.

Using Drupal in a decoupled setup gives you several benefits. You keep Drupal's powerful content management features, like managing users, workflows, and how content is structured. At the same time, you gain the freedom to build modern and dynamic user experiences. This also makes it easier to scale and update your application, since the frontend and backend can be updated separately.

## Next.js

Next.js is a popular open-source React framework for building fast and modern web applications. It's known for features like server-side rendering (SSR), static site generation (SSG), and built-in routing, which contribute to improved performance, SEO, and a better user experience. Next.js handles a lot of the complex setup typically required for React projects, making it easier to focus on building the application itself.

When used as the frontend for a decoupled Drupal site, Next.js becomes the presentation layer, responsible for fetching content from Drupal and displaying it to the user. Next.js can communicate with Drupal's API endpoints, including those provided by JSON:API or a GraphQL endpoint.

Combining Next.js with a decoupled Drupal backend provides a powerful and flexible architecture. Drupal handles content creation, management, and storage, while Next.js focuses on delivering a performant and engaging user experience. This separation of concerns allows developers to leverage the strengths of both technologies, resulting in a scalable and maintainable web application.

## Next.Js for Drupal

This site utilizes the [Next.js for Drupal](https://next-drupal.org/) project. Next.js for Drupal is a powerful toolkit designed to streamline the development of decoupled Drupal websites using Next.js as the frontend. It provides a set of pre-built components, functions, and utilities that simplify common tasks like fetching Drupal content, handling authentication, and managing routing. By abstracting away much of the boilerplate code typically associated with decoupled Drupal development, Next.js for Drupal allows developers to focus on building unique features and delivering exceptional user experiences. It offers a well-defined structure and best practices, making it easier to create performant, scalable, and maintainable decoupled Drupal applications with Next.js.
