<?php

declare(strict_types=1);

namespace Drupal\pgov_indicator\Entity\Storage;

use Drupal\storage\Entity\Storage;

/**
 * A bundle class for encapsulating logic for Performance indicator entities.
 */
class Indicator extends Storage {

  /**
   * Get all recorded measurements for this performance indicator.
   *
   * @return array
   *   A list of measurements and performance indicator metadata.
   */
  public function getMeasurements() {
    return [
      'target' => $this->get('field_target')->getString(),
      'dimension' => $this->get('field_dimension')->getString(),
      'keyness' => $this->get('field_keyness')->getString(),
      'data' => $this->getData(),
      'progress' => $this->getProgress(),
    ];
  }

  /**
   * Return indicator measurements, as a simple array.
   *
   * @return array
   *   Target and actual values for measurements associated with this indicator.
   */
  public function getData($column = NULL) {
    $data = [];
    if ($this->hasField('field_measurements') && $measurements = $this->get('field_measurements')) {
      foreach ($measurements->referencedEntities() as $measurement) {
        $date = date('Y-m-d', _pgov_indicator_get_date($measurement));
        $period = $measurement->get('field_period')->referencedEntities()[0];
        $data[$date] = [
          'name' => $period->getName(),
          'date' => $date,
          'target' => $measurement->get('field_target_value')->getString(),
          'value' => $measurement->get('field_value')->getString(),
        ];
      }
    }
    if ($data && isset($column)) {
      return array_column($data, $column);
    }
    return $data;
  }

  /**
   * Returns progress to target, as a percentage.
   *
   * Based on the measurement values for this indicator, calculate the progress
   * to measurement target.
   *
   * See
   * https://docs.google.com/document/d/1b9x03CS2blmTmhEjiLgVf1gQDhcmT7ARuo6EOYpHpBY/edit?pli=1&tab=t.0
   *
   *   In short: the formula divides the absolute distance between the
   *   start/current values by the absolute distance between the start/target
   *   values for a given indicator.
   * Handling Missing StartingResult
   *   Since StartingResult is not explicitly stored, derive it dynamically,
   *   ensuring that it resets when a new target is set:
   * For the first-ever target set for a KPI
   *   The earliest ActualResult (by StartDate) should be treated as the
   *   StartingResult.
   * For subsequent target changes
   *   Whenever a TargetResult changes for a KPI, the first ActualResult
   *   recorded after the change becomes the new StartingResult.
   * Valid values only
   *   Check whether values are valid. If a Target or StartingResult changes to
   *   NA, it shouldn’t be treated as a new target or new actual - it simply
   *   means the last valid Target or StartingResult value should persist.
   *
   * @return int
   *   Progress to target, as a percentage (0-100)
   */
  public function getProgress() {
    $start = $target = $value = NULL;

    foreach ($this->getData() as $row) {
      if ($row['target'] != $target && !empty($row['target'])) {
        $target = $row['target'];

        // When TargetResult changes, the first ActualResult recorded after
        // the change becomes the new StartingResult.
        $start = NULL;
      }

      // The earliest ActualResult (by Date) should be the StartingResult.
      if (is_null($start) && !empty($row['value'])) {
        $start = $row['value'];
      }

      // Always update current, as long as the data is valid.
      if (!empty($row['value'])) {
        $value = $row['value'];
      }
    }

    // Return a percentage only if all numbers have been touched.
    if (!empty($start) && !empty($value) && !empty($target)) {
      // Full progress if target == start (no division by zero).
      // @todo confirm if we should exceed 100 when the data supports that.
      if ($value >= $target) {
        return 100;
      }
      return round((($value - $start) / ($target - $start)) * 100);
    }

    // Return NULL on failure.
    return NULL;
  }

}
