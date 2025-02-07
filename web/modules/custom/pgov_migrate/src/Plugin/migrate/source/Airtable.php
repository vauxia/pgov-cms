<?php

namespace Drupal\pgov_migrate\Plugin\migrate\source;

use Drupal\Core\StringTranslation\StringTranslationTrait;
use Drupal\migrate\Plugin\MigrationInterface;
use Drupal\migrate_plus\Plugin\migrate\source\Url;

/**
 * A source plugin that can migrate records from Airtable.
 *
 * Example:
 *
 * @code
 *  source:
 *    plugin: airtable
 *    base: Base Name
 *    table: Goals
 * @endcode
 *
 * @MigrateSource (
 *   id = "airtable"
 * )
 */
class Airtable extends Url {

  use StringTranslationTrait;

  /**
   * Airtable's API URL; is the base of all requests.
   */
  const string AIRTABLE_URL = 'https://api.airtable.com/v0/';

  /**
   * Maximum number of results per page (max value is 99).
   */
  const AIRTABLE_PAGESIZE = 100;

  /**
   * A list of Airtable bases available for this migration.
   *
   * @var array
   */
  protected array $airtableBases = [];

  /**
   * The Airtable base for this migration.
   *
   * @var string
   */
  protected string $airtableBase;

  /**
   * The table in the current Airtable base that contains data to be migrated.
   *
   * @var string
   */
  protected string $table;

  /**
   * Cache counts to avoid the overhead of paging through all tables.
   *
   * @var bool
   */
  protected $cacheCounts = TRUE;

  /**
   * An API key to authorize this connection.
   *
   * This should be added to the hosting server's environment, or in
   * .ddev/env during local development.
   *
   * @see https://support.airtable.com/docs/creating-personal-access-tokens
   *
   * @var string
   */
  private function getAirtableApiKey() {
    return $_ENV['AIRTABLE_API_KEY'];
  }

  /**
   * Authorization headers to validate the API requests.
   *
   * @return string[]
   *   A list of headers suitable for HTTP requests.
   */
  private function getAirtableHeaders() {
    return [
      'Authorization' => 'Bearer ' . $this->getAirtableApiKey(),
      'Accept' => 'application/json',
    ];
  }

  /**
   * Get the Airtable-specific base id using its label.
   *
   * @param string $name
   *   The human-readable name of an Airtable base.
   *
   * @return mixed|string|bool
   *   The internal base ID or FALSE if not found.
   */
  protected function getAirtableBaseId($name) {
    if (!$this->airtableBases) {
      $uri = $this::AIRTABLE_URL . 'meta/bases';
      $result = \Drupal::httpClient()->get($uri, ['headers' => $this->getAirtableHeaders()]);

      $this->airtableBases = [];
      foreach (json_decode($result->getBody())->bases as $base) {
        $this->airtableBases[$base->id] = $base->name;
      }
    }
    return array_search($name, $this->airtableBases);
  }

  /**
   * Derive the available Airtable fields for a given table in the current base.
   *
   * All tables will return `airtable_id` and `airtable_created`, and the rest
   * of the columns are based on the table contents. Column names are the
   * machine names as identified in Airtable's API docs for the current base,
   * and are sufficient for use migration.yaml mappings.
   *
   * @return array
   *   A list of fields in the current Airtable table, suitable for mapping.
   *
   * @throws \GuzzleHttp\Exception\GuzzleException
   */
  private function getAirtableFields() {
    if ($base = $this->airtableBase) {
      $uri = $this::AIRTABLE_URL . 'meta/bases/' . $base . '/tables';
    }
    $result = \Drupal::httpClient()->get($uri, ['headers' => $this->getAirtableHeaders()]);

    // There doesn't seem to be a way to get fields for _a_ table, so find ours.
    foreach (json_decode($result->getBody())->tables as $table) {
      if ($table->name == $this->table) {
        $fields = [];
        $fields['airtable_id'] = ['name' => 'airtable_id', 'selector' => 'id'];
        $fields['airtable_created_time'] = ['name' => 'airtable_created', 'selector' => 'createdTime'];
        foreach ($table->fields as $field) {
          $fields[$field->name] = (array) $field;
          $fields[$field->name]['selector'] = 'fields/' . $field->name;
        }
        return $fields;
      }
    }
    return [];
  }

  /**
   * {@inheritdoc}
   */
  public function __construct(array $configuration, $plugin_id, $plugin_definition, MigrationInterface $migration) {

    // Require base and table configurations.
    if (empty($configuration['table'])) {
      throw new \InvalidArgumentException('Missing required configuration: "table"');
    }
    $this->table = $configuration['table'];

    if (empty($configuration['base'])) {
      throw new \InvalidArgumentException('Missing required configuration: "base"');
    }
    if (!$base = $this->getAirtableBaseId($configuration['base'])) {
      throw new \InvalidArgumentException('"base" must be one of: ');
    }
    $this->airtableBase = $base;

    // Ensure we're using expected plugins.
    $configuration['data_fetcher_plugin'] = 'http';
    $configuration['data_parser_plugin'] = 'airtable_data';

    // Set source URLs based on configuration settings for base and table.
    $url = $this::AIRTABLE_URL . $base . '/' . $configuration['table'];
    $url .= '?pageSize=' . $this::AIRTABLE_PAGESIZE;

    if (isset($configuration['filter'])) {
      $url .= '&filterByFormula=' . urlencode($configuration['filter']);
    }
    if (isset($configuration['view'])) {
      $url .= '&view=' . urlencode($configuration['view']);
    }
    if (isset($configuration['sort'])) {
      $sort = $this->t('sort[0][field]=@sort', ['@sort' => $configuration['sort']]);
      $url .= urlencode($sort);
      if (isset($configuration['direction'])) {
        $sort = $this->t('sort[0][direction]=@direction', ['@direction' => $configuration['direction']]);
        $url .= urlencode($sort);
      }
    }
    $configuration['urls'] = [$url];

    // Set Auth headers.
    $configuration['headers'] = $this->getAirtableHeaders();

    // The ID field is the same for all Airtable tables.
    if (!isset($configuration['ids'])) {
      $configuration['ids'] = ['airtable_id' => ['type' => 'string']];
    }

    // Automatically populate the list of available fields for this base/table.
    $configuration['fields'] = $this->getAirtableFields();

    // Airtable paging works by using the value of 'offset' from the current
    // page as part of the next request. Set the pager accordingly.
    $configuration['pager'] = [
      'selector' => 'offset',
      'type' => 'cursor',
      'key' => 'offset',
    ];

    parent::__construct($configuration, $plugin_id, $plugin_definition, $migration);
  }

}
