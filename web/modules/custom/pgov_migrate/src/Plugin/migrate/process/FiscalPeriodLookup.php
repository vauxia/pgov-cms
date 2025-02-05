<?php

namespace Drupal\pgov_migrate\Plugin\migrate\process;

use Drupal\migrate\MigrateException;
use Drupal\migrate_plus\Plugin\migrate\process\EntityLookup;

/**
 * Locate a period entity give its start_date and end_date.
 *
 *  Example usage:
 *
 * @code
 *  destination:
 *    ...
 *  process:
 *    ...
 *    field_period/target_id:
 *      plugin: period_lookup
 *      source:
 *        - StartDate
 *        - EndDate
 * @endcode
 *
 * @MigrateProcessPlugin(
 *   id = "period_lookup",
 * )
 */
class FiscalPeriodLookup extends EntityLookup {

  /**
   * {@inheritdoc}
   */
  protected function determineLookupProperties(string $destinationProperty): void {
    // Simply hard-code the values that were getting set by this method.
    $this->lookupEntityType = 'storage';
    $this->lookupBundle = 'period';
    $this->lookupBundleKey = 'type';
  }

  /**
   * {@inheritdoc}
   */
  protected function query($value) {
    if (empty($value[0]) || empty($value[1])) {
      return NULL;
    }
    $query = $this->entityTypeManager->getStorage($this->lookupEntityType)
      ->getQuery()
      ->accessCheck(FALSE)
      ->condition('field_date_range.value', $value[0])
      ->condition('field_date_range.end_value', $value[1]);

    $results = $query->execute();
    if (empty($results)) {
      throw new MigrateException(sprintf('No fiscal period exists for %s - %s.', $value[0], $value[1]));
    }

    return reset($results);
  }

}
