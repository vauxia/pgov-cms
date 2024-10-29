<?php

namespace Drupal\pgov_migrate\Plugin\migrate\source;

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

  /**
   * Airtable's API URL; is the base of all requests.
   */
  const string AIRTABLE_URL = 'https://api.airtable.com/v0/';

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
   * @param $name
   *
   * @return mixed|string|bool
   */
  protected function getAirtableBaseId($name) {
    if (!$this->airtableBases) {
      $uri = $this::AIRTABLE_URL . 'meta/bases';
      $result = \Drupal::httpClient()->get($uri, ['headers' => $this->getAirtableHeaders()]);

      $this->airtableBases = [];
      foreach(json_decode($result->getBody())->bases as $base) {
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
   * @throws \GuzzleHttp\Exception\GuzzleException
   */
  private function getAirtableFields() {
    if ($base = $this->airtableBase) {
      $uri = $this::AIRTABLE_URL . 'meta/bases/' . $base . '/tables';
    }
    $result = \Drupal::httpClient()->get($uri, ['headers' => $this->getAirtableHeaders()]);

    // There doesn't seem to be a way to get fields for _a_ table, so find ours.
    foreach(json_decode($result->getBody())->tables as $table) {
      if ($table->name == $this->table) {
        $fields = [];
        $fields['airtable_id'] = ['name'  => 'airtable_id', 'selector' => 'id'];
        $fields['airtable_created_time'] = ['name'  => 'airtable_created', 'selector' => 'createdTime'];
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
    $url = $this::AIRTABLE_URL . $base;
    if (isset($configuration['table'])) {
     $url .= '/' . $configuration['table'];
    }
    $configuration['urls'] = [$url];

    // Set Auth headers.
    $configuration['headers'] = $this->getAirtableHeaders();

    // The ID field is the same for all Airtable tables.
    $configuration['ids'] = ['id' => ['type' => 'string']];

    // Automatically populate the list of available fields for this base/table.
    $configuration['fields'] = $this->getAirtableFields();

    parent::__construct($configuration, $plugin_id, $plugin_definition, $migration);
  }
}
