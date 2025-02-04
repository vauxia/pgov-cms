<?php

declare(strict_types=1);

namespace Drupal\pgov_plan;

use Drupal\Core\Entity\EntityInterface;

/**
 * Helper functions based to find data based on the hierarchy of Plan content.
 */
final class Hierarchy {

  /**
   * Reference field hierarchy.
   *
   * @var array|string[]
   * A list of entity reference fields, from lowest-to-highest in the hierarchy.
   */
  private array $hierarchy = [
    'field_indicator',
    'field_objective',
    'field_goal',
    'field_plan',
    'field_administration',
  ];

  /**
   * Get the nearest parent in the hierarchy that is of type $bundle.
   */
  public function getNearestParentEntity(EntityInterface $entity, $bundle) {
    foreach ($this->hierarchy as $parent_field) {
      if ($entity->hasField($parent_field)) {

        // We can't filter if a parent field exists but isn't populated: return.
        if (!$references = $entity->get($parent_field)->referencedEntities()) {
          return FALSE;
        }
        else {
          // If the current entity matches the requested bundle, return it.
          $parent_entity = current($references);
          if ($parent_entity?->bundle() === $bundle) {
            return $parent_entity;
          }
          else {
            // Recursively find the next level up.
            return $this->getNearestParentEntity($parent_entity, $bundle);
          }
        }
      }
    }
    // Return FALSE on failure.
    return FALSE;
  }

  /**
   * Return the time period entry for the nearest parent.
   *
   * Given that the plan content appears in a nested hierarchy, use the time
   * period referenced by the parent entity of the current item. If the nearest
   * parent does not have a time period, look at that parent's parent, and
   * so-on until the list of parents are exhausted.
   *
   * @param \Drupal\Core\Entity\EntityInterface $entity
   *   The current entity to inspect (or a parent entity, by way of recursion)
   *
   * @return false|mixed|void
   *   A Time period (period) Storage entity or FALSE.
   */
  public function getTimePeriod(EntityInterface $entity) {
    foreach ($this->hierarchy as $parent_field) {
      if ($entity->hasField($parent_field)) {
        // We can't filter if a parent field exists but isn't populated: return.
        if (!$references = $entity->get($parent_field)->referencedEntities()) {
          return FALSE;
        }
        else {
          $parent_entity = current($references);

          // If the parent has a field_period value, return that.
          if ($parent_entity?->hasField('field_period')) {
            if ($period = $parent_entity->get('field_period')
              ->referencedEntities()) {
              return current($period);
            }
          }
          // Or, if it has a date range (as on Administration) return that.
          elseif ($parent_entity?->hasField('field_date_range')) {
            return $parent_entity;
          }
          else {
            // Recursively find the next level up.
            return $this->parentTimePeriod($parent_entity);
          }
        }
      }
    }
    // Return FALSE on failure.
    return FALSE;
  }

}
