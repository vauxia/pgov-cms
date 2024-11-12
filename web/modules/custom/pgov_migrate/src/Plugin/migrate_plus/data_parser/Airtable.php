<?php

namespace Drupal\pgov_migrate\Plugin\migrate_plus\data_parser;

use Drupal\migrate_plus\Plugin\migrate_plus\data_parser\Json;

/**
 * Extend the Json parser to support Airtable-specific paging and parsing.
 *
 * @DataParser(
 *   id = "airtable_data",
 *   title = @Translation("Airtable")
 * )
 */
class Airtable extends Json {

  /**
   * Maximum number of requests per second.
   *
   * This is an airtable constraint. Additional request per second will result
   * in a 422 error.
   */
  const AIRTABLE_THROTTLE = 5;

  /**
   * The number of requests that have been made to Airtable.
   *
   * @var int
   */
  protected int $cooldown = 0;

  /**
   * The start time for a series of requests.
   *
   * @var float
   */
  protected float $cooldownStart;

  /**
   * {@inheritdoc}
   */
  public function __construct(array $configuration, $plugin_id, $plugin_definition) {
    parent::__construct($configuration, $plugin_id, $plugin_definition);

    $this->itemSelector = 'records/';
    $this->cooldownStart = microtime(TRUE);
  }

  /**
   * {@inheritdoc}
   */
  protected function getNextUrls(string $url): array {
    // Respect Airtable's 5 requests/second limit :(.
    if (++$this->cooldown > self::AIRTABLE_THROTTLE) {
      $time = (microtime(TRUE) - $this->cooldownStart) * 1000;
      if ($time < 1000000) {
        usleep($time);
      }
      $this->cooldown = 0;
      $this->cooldownStart = microtime(TRUE);
    }
    return parent::getNextUrls($url);
  }

}
