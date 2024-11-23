<?php

namespace Drupal\pgov_migrate\Plugin\migrate\process;

use Drupal\migrate_plus\Plugin\migrate\process\EntityLookup;

/**
 * Locate a fiscal_period entity give its start_date and end_date.
 *
 *  Example usage:
 *
 * @code
 *  destination:
 *    ...
 *  process:
 *    ...
 *    field_fiscal_period/target_id:
 *      plugin: fiscal_period_lookup
 *      source:
 *        - StartDate
 *        - EndDate
 * @endcode
 *
 * @MigrateProcessPlugin(
 *   id = "fiscal_period_lookup",
 * )
 */
class FiscalPeriodLookup extends EntityLookup {

  /**
   * {@inheritdoc}
   */
  protected function determineLookupProperties(string $destinationProperty): void {
    // Simply hard-code the values that were getting set by this method.
    $this->lookupEntityType = 'node';
    $this->lookupBundle = 'fiscal_period';
    $this->lookupBundleKey = 'type';
  }

  /**
   * {@inheritdoc}
   */
  protected function query($value) {
    $query = $this->entityTypeManager->getStorage($this->lookupEntityType)
      ->getQuery()
      ->accessCheck(FALSE)
      ->condition('type', 'fiscal_period')
      ->condition('field_date_range.value', $value[0])
      ->condition('field_date_range.end_value', $value[1]);

    $results = $query->execute();
    if (empty($results)) {
      return NULL;
    }

    return reset($results);
  }

}
