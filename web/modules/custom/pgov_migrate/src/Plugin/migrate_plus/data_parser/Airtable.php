<?php

namespace Drupal\pgov_migrate\Plugin\migrate_plus\data_parser;

use Drupal\Component\Utility\UrlHelper;
use Drupal\Core\Url;
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
   * Maximum number of results per page (max value is 100).
   */
  const AIRTABLE_PAGESIZE = 100;

  /**
   * {@inheritdoc}
   */
  public function __construct(array $configuration, $plugin_id, $plugin_definition) {
    parent::__construct($configuration, $plugin_id, $plugin_definition);

    $this->itemSelector = 'records/';
  }

  /**
   * Get the total count of records in the current Airtable table.
   *
   * There is no way to obtain a record count directly through the API, so we
   * are in the business of paging through all pages of results and tallying
   * the record count.
   *
   * Airtable has a 100-results-per-page record limit and can only receive 5
   * requests per second, so it may take some time to count more than 500.
   *
   * This method adds result page URLs to $this->urls so that iterations like
   * $this->nextSource() will work for data collection.
   *
   * @return int
   *   The total number of records in the current table.
   */
  public function count(): int {
    if (isset($this->count)) {
      return $this->count;
    }

    $this->count = 0;

    $urls = [];
    $primary_url = UrlHelper::parse(current($this->urls));
    $primary_url['query']['sort'] = [['field' => 'id', 'direction' => 'asc']];
    $primary_url['query']['pageSize'] = self::AIRTABLE_PAGESIZE;
    $primary_url['absolute'] = TRUE;

    $next_url = $primary_url;
    $cooldown = 0;
    while ($next_url) {
      $urls[] = $next_url;

      // Respect Airtable's 5 requests/second limit :(.
      if (++$cooldown > self::AIRTABLE_THROTTLE) {
        sleep(1);
        $cooldown = 0;
      }

      // Send less traffic over the wire by omitting field data.
      $next_url['query']['fields'] = [];
      $url = Url::fromUri($next_url['path'], $next_url)->toString();
      $data = $this->getSourceData($url, '');
      $this->count += count($data['records']);

      if (!isset($data['offset'])) {
        // This will terminate the loop.
        $next_url = FALSE;
      }
      else {
        $next_url = $primary_url;
        $next_url['query']['offset'] = $data['offset'];
      }
      $urls[] = $url;
    }
    $this->urls = $urls;

    return $this->count;
  }

  /**
   *
   * {inheritdoc}
   *
   */
  protected function getNextUrls(string $url): array {
    $y = 1;
    return [];
  }

}
