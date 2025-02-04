## Strategic Plans,  Goals and Objectives

The Strategic plans, goals, and objectives module adds business rules and data
management to these hierarchical components of a Strategic plan.

### Site architecture and assumptions

Much of the logic is based on the idea that the content is managed in a
hierarchy:

* A _Strategic Plan_ (Content type) lists one or more _Goals_ as entity
  references.
* A _Goal_ (Content type) lists one or more _Objectives_ as entity references.
* An _Objective_ (Content type) lists one or more _Performance indicators_
  as entity references.
* A _Performance indicator_ (Storage) lists one or more _Measurements_
  (Storage) as entity references.

In each of these cases, the relationship is visible in both directions: _Plan_
nodes use `field_goals`, a multi-value reference field, to reference _Goal_
nodes, and _Goal_ nodes reference their parent _Plan_ nodes using a single-value
`field_plan` reference field. These fields are kept in sync using the
CER module.

### Custom business rules
The content structure is set up using standard Sitebuilding practices and Drupal
core functionality. This module relies on the above-referenced hierarchy to
enforce some extra business rules:

#### All content references an Administration

All content should be tagged with a presidential administration, so that it can
be filtered based on the current administration.

Given that `field_administration` is a required field _Plan_, this module uses
`hook_entity_presave` to ensure that the same value is added to every Goal,
Objective, and Indicator that falls under that plan.
