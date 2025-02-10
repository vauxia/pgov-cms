---
sidebar_position: 0
title: Overview
---
# Contributing to Performance.gov

This guide outlines the process for submitting changes.

## Contribution Workflow

1.  Fork the project repository
2.  Checkout the `main` branch

    ```bash
    git checkout main
    ```
3.  **Create a Branch:** Branch name should be descriptive.

    ```bash
    git checkout -b ticket-number-feature-name
    ```
4.  **Make your changes:**
    *   Write clear code with comments and documentation.
    *   Include unit tests (if applicable).
    *   Commit frequently with descriptive messages.
5.  **Push your branch:**

    ```bash
    git push origin ticket-number-feature-name
    ```
6.  **Create Pull Request:** Create a PR against the `main` branch. Include a summary of changes, link to the issue (if applicable), context, and testing instructions.
7. **Request Review:** Request code review and reassign ticket.
8. **Assign Ticket:** After code review, assign back to original ticket holder.
9. **Merging:** Ticket holder merges their PR and changes ticket status to done.