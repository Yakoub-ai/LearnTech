import { MarkerType } from '@xyflow/react'

const base = {
  padding: '12px 16px',
  borderRadius: 12,
  fontSize: 13,
  fontFamily: 'Inter, system-ui, sans-serif',
  border: '1px solid var(--color-border)',
  background: 'var(--color-surface-2)',
  color: 'var(--color-text)',
  cursor: 'pointer',
}

const primary = { ...base, background: '#6366f1', color: '#fff', border: '1px solid #4f46e5' }
const green = { ...base, background: '#10b981', color: '#fff', border: '1px solid #059669' }
const amber = { ...base, background: '#f59e0b', color: '#fff', border: '1px solid #d97706' }
const sky = { ...base, background: '#0ea5e9', color: '#fff', border: '1px solid #0284c7' }

const nodes = [
  // Sources
  {
    id: 'api',
    position: { x: 0, y: 0 },
    data: {
      label: '🌐 REST APIs',
      detail: 'External APIs, SaaS platforms, webhooks. Data arrives as JSON via HTTP and needs schema validation before ingestion.',
      tips: ['Rate limiting and backoff strategies', 'Incremental extraction via cursors/timestamps', 'Schema validation with Pydantic or JSON Schema'],
    },
    style: base,
  },
  {
    id: 'db',
    position: { x: 0, y: 100 },
    data: {
      label: '🗄️ Databases',
      detail: 'Operational databases (PostgreSQL, MySQL, MongoDB). Use CDC (Change Data Capture) for real-time replication or batch extraction with watermarks.',
      code: '-- CDC with Debezium reads the WAL\n-- No impact on source database performance\n-- Captures INSERT, UPDATE, DELETE\n-- Emits change events to Kafka',
      tips: ['CDC via Debezium/Fivetran for real-time', 'Batch: incremental loads with updated_at watermarks', 'Full refresh for small reference tables'],
    },
    style: base,
  },
  {
    id: 'events',
    position: { x: 0, y: 200 },
    data: {
      label: '📡 Event Streams',
      detail: 'Real-time event data from Kafka, Kinesis, or Pub/Sub. Clickstreams, IoT sensors, application logs. Continuous, unbounded data.',
      tips: ['Kafka topics with schema registry', 'Exactly-once semantics with transactions', 'Partition by entity ID for ordering'],
    },
    style: base,
  },

  // Ingestion
  {
    id: 'ingest',
    position: { x: 220, y: 100 },
    data: {
      label: '📥 Ingestion Layer',
      detail: 'Extracts data from sources and loads raw data into the landing zone. Handles schema detection, deduplication, and exactly-once delivery.',
      tips: ['Tools: Fivetran, Airbyte, custom Python', 'Idempotent loads (replayable)', 'Schema evolution detection', 'Data contracts between producers and consumers'],
    },
    style: primary,
  },

  // Landing / Bronze
  {
    id: 'bronze',
    position: { x: 420, y: 100 },
    data: {
      label: '🥉 Bronze (Raw)',
      detail: 'Raw data exactly as received from sources. Append-only, immutable. Stored in Parquet format in the data lake.',
      code: '-- Medallion architecture: Bronze layer\n-- Raw, unprocessed data\nCREATE TABLE bronze.orders_raw (\n  _ingested_at TIMESTAMP,\n  _source STRING,\n  payload VARIANT  -- raw JSON\n);',
      tips: ['Never modify raw data', 'Add metadata: ingestion timestamp, source, batch ID', 'Parquet or Delta Lake format', 'Enables full reprocessing from source of truth'],
    },
    style: amber,
  },

  // Silver
  {
    id: 'silver',
    position: { x: 620, y: 50 },
    data: {
      label: '🥈 Silver (Cleaned)',
      detail: 'Cleaned, deduplicated, and typed data. Business rules applied. Schema enforced. This is where dbt models do most transformation work.',
      code: '-- dbt model: silver/orders_cleaned.sql\nSELECT\n  order_id,\n  CAST(amount AS DECIMAL(10,2)) AS amount,\n  COALESCE(status, \'unknown\') AS status,\n  created_at::TIMESTAMP AS created_at\nFROM {{ ref(\'bronze_orders\') }}\nWHERE order_id IS NOT NULL\nQUALIFY ROW_NUMBER() OVER (\n  PARTITION BY order_id ORDER BY _ingested_at DESC\n) = 1  -- deduplicate',
      tips: ['Schema enforcement and type casting', 'Deduplication with ROW_NUMBER()', 'NULL handling and default values', 'Data quality tests with dbt-expectations'],
    },
    style: green,
  },

  // Gold
  {
    id: 'gold',
    position: { x: 620, y: 200 },
    data: {
      label: '🥇 Gold (Business)',
      detail: 'Business-level aggregations and dimensional models ready for consumption. Star schemas, KPI metrics, and pre-computed summaries.',
      code: '-- dbt model: gold/daily_revenue.sql\nSELECT\n  DATE_TRUNC(\'day\', created_at) AS date,\n  COUNT(*) AS total_orders,\n  SUM(amount) AS revenue,\n  AVG(amount) AS avg_order_value\nFROM {{ ref(\'silver_orders\') }}\nWHERE status = \'completed\'\nGROUP BY 1',
      tips: ['Star schema: fact + dimension tables', 'Pre-aggregated for dashboard performance', 'SLA-bound: must refresh by X time daily', 'Semantic layer on top for self-service'],
    },
    style: sky,
  },

  // Quality
  {
    id: 'quality',
    position: { x: 420, y: 280 },
    data: {
      label: '🔍 Data Quality',
      detail: 'Automated checks at every layer: schema validation, freshness checks, volume anomaly detection, and data contracts.',
      tips: ['Great Expectations, dbt tests, Soda', 'Freshness: is data arriving on time?', 'Volume: unexpected spikes or drops?', 'Schema: new/removed columns?', 'Alert on failure, halt pipeline if critical'],
    },
    style: primary,
  },

  // Consumers
  {
    id: 'bi',
    position: { x: 850, y: 50 },
    data: {
      label: '📊 BI Dashboards',
      detail: 'Looker, Tableau, Power BI, Metabase. Connect to the Gold layer for self-service analytics and reporting.',
    },
    style: base,
  },
  {
    id: 'ml',
    position: { x: 850, y: 150 },
    data: {
      label: '🤖 ML Models',
      detail: 'Feature engineering reads from Silver/Gold layers. Model training, scoring, and feature stores consume curated data.',
    },
    style: base,
  },
  {
    id: 'reverse',
    position: { x: 850, y: 250 },
    data: {
      label: '🔄 Reverse ETL',
      detail: 'Push curated data back to operational tools: CRM, marketing platforms, customer support. Census, Hightouch.',
    },
    style: base,
  },
]

const edgeDefaults = {
  style: { stroke: '#6366f1', strokeWidth: 2 },
  markerEnd: { type: MarkerType.ArrowClosed, color: '#6366f1' },
}

const edges = [
  { id: 'e1', source: 'api', target: 'ingest', ...edgeDefaults, animated: true },
  { id: 'e2', source: 'db', target: 'ingest', ...edgeDefaults, animated: true },
  { id: 'e3', source: 'events', target: 'ingest', ...edgeDefaults, animated: true },
  { id: 'e4', source: 'ingest', target: 'bronze', label: 'raw load', ...edgeDefaults, animated: true },
  { id: 'e5', source: 'bronze', target: 'silver', label: 'clean + type', ...edgeDefaults },
  { id: 'e6', source: 'silver', target: 'gold', label: 'aggregate', ...edgeDefaults },
  { id: 'e7', source: 'bronze', target: 'quality', label: 'validate', ...edgeDefaults, style: { ...edgeDefaults.style, strokeDasharray: '5 5' } },
  { id: 'e8', source: 'silver', target: 'quality', label: 'validate', ...edgeDefaults, style: { ...edgeDefaults.style, strokeDasharray: '5 5' } },
  { id: 'e9', source: 'gold', target: 'bi', ...edgeDefaults },
  { id: 'e10', source: 'gold', target: 'ml', ...edgeDefaults },
  { id: 'e11', source: 'gold', target: 'reverse', ...edgeDefaults },
]

export default {
  title: 'Modern Data Pipeline — Medallion Architecture (Bronze → Silver → Gold)',
  nodes,
  edges,
}
