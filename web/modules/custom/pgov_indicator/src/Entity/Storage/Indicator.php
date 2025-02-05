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
   * @return array
   */
  public function getData() {
    $data = [];
    if ($this->hasField('field_measurements') && $measurements = $this->get('field_measurements')) {
      foreach ($measurements->referencedEntities() as $measurement) {
        $date = _pgov_indicator_get_date($measurement);
        $period = $measurement->get('field_period')->referencedEntities()[0];
        $data[$date] = [
          'name' => $period->getName(),
          'date' => $date,
          'target' => $measurement->get('field_target_value')->getString(),
          'value' => $measurement->get('field_value')->getString(),
        ];
      }
    }
    return $data;
  }

  public function getProgress() {
    $start = $current = $target = NULL;

    foreach ($this->getData() as $row) {
      // Start is the earliest ActualResult, so set it once.
      if (is_null($start) && !empty($row['value'])) {
        $start = $row['value'];
      }
    }

    $progress = ($current - $start) / ($target - $start) * 100;
    return $progress;
  }

}
