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
const rose = { ...base, background: '#f43f5e', color: '#fff', border: '1px solid #e11d48' }

const nodes = [
  {
    id: 'client',
    position: { x: 300, y: 0 },
    data: {
      label: '👤 Client',
      detail: 'Browser, mobile app, or external API consumer. All traffic enters through the API Gateway — never directly to services.',
    },
    style: base,
  },
  {
    id: 'gateway',
    position: { x: 300, y: 100 },
    data: {
      label: '🚪 API Gateway',
      detail: 'Single entry point for all client requests. Handles routing, rate limiting, authentication, SSL termination, and request transformation.',
      tips: ['Kong, AWS API Gateway, Envoy', 'Rate limiting per client/endpoint', 'JWT validation before forwarding', 'Circuit breaking to protect downstream services'],
    },
    style: primary,
  },
  {
    id: 'auth',
    position: { x: 50, y: 220 },
    data: {
      label: '🔐 Auth Service',
      detail: 'Handles authentication and authorization. Issues and validates JWTs. Manages user sessions and permissions.',
      code: 'POST /auth/login\n  → validate credentials\n  → issue JWT + refresh token\n\nGET /auth/verify\n  → validate JWT signature\n  → check expiry & claims',
      tips: ['Stateless JWT for service-to-service', 'OAuth2 for third-party integration', 'Short-lived access tokens + refresh tokens'],
    },
    style: rose,
  },
  {
    id: 'users',
    position: { x: 250, y: 220 },
    data: {
      label: '👥 User Service',
      detail: 'Manages user profiles, preferences, and account data. Owns the users database. Publishes events on user changes.',
      tips: ['Owns user data exclusively', 'Other services get user info via API or events', 'CQRS: separate read/write models for scale'],
    },
    style: green,
  },
  {
    id: 'orders',
    position: { x: 450, y: 220 },
    data: {
      label: '📦 Order Service',
      detail: 'Manages order lifecycle: creation, payment processing, fulfillment. Coordinates with inventory and notification services via events.',
      code: 'POST /orders\n  → validate items\n  → reserve inventory (sync)\n  → process payment (async)\n  → emit OrderCreated event',
      tips: ['Saga pattern for distributed transactions', 'Compensating transactions on failure', 'Idempotency keys prevent duplicate orders'],
    },
    style: green,
  },
  {
    id: 'inventory',
    position: { x: 650, y: 220 },
    data: {
      label: '📊 Inventory Service',
      detail: 'Tracks product stock levels. Handles reservations during checkout. Listens for order events to decrement stock.',
      tips: ['Optimistic locking for concurrent updates', 'Event-driven stock adjustments', 'Separate read replicas for catalog queries'],
    },
    style: green,
  },
  {
    id: 'msgbus',
    position: { x: 300, y: 370 },
    data: {
      label: '📨 Message Bus',
      detail: 'Asynchronous communication backbone. Services publish domain events; interested services subscribe. Decouples producers from consumers.',
      tips: ['Kafka, RabbitMQ, AWS SNS/SQS', 'At-least-once delivery → consumers must be idempotent', 'Dead-letter queues for failed messages', 'Schema registry for event contracts'],
    },
    style: amber,
  },
  {
    id: 'notifications',
    position: { x: 100, y: 470 },
    data: {
      label: '🔔 Notification Service',
      detail: 'Listens for domain events and sends notifications via email, SMS, push, or in-app channels.',
    },
    style: sky,
  },
  {
    id: 'analytics',
    position: { x: 500, y: 470 },
    data: {
      label: '📈 Analytics Service',
      detail: 'Consumes events from the message bus for reporting and dashboards. Eventually consistent — does not need real-time accuracy.',
    },
    style: sky,
  },
]

const edgeDefaults = {
  style: { stroke: '#6366f1', strokeWidth: 2 },
  markerEnd: { type: MarkerType.ArrowClosed, color: '#6366f1' },
}

const asyncEdge = {
  style: { stroke: '#f59e0b', strokeWidth: 2, strokeDasharray: '6 4' },
  markerEnd: { type: MarkerType.ArrowClosed, color: '#f59e0b' },
  animated: true,
}

const edges = [
  { id: 'e1', source: 'client', target: 'gateway', label: 'HTTPS', ...edgeDefaults },
  { id: 'e2', source: 'gateway', target: 'auth', label: 'verify', ...edgeDefaults },
  { id: 'e3', source: 'gateway', target: 'users', label: 'route', ...edgeDefaults },
  { id: 'e4', source: 'gateway', target: 'orders', label: 'route', ...edgeDefaults },
  { id: 'e5', source: 'gateway', target: 'inventory', label: 'route', ...edgeDefaults },
  { id: 'e6', source: 'orders', target: 'inventory', label: 'reserve', ...edgeDefaults },
  { id: 'e7', source: 'orders', target: 'msgbus', label: 'OrderCreated', ...asyncEdge },
  { id: 'e8', source: 'users', target: 'msgbus', label: 'UserUpdated', ...asyncEdge },
  { id: 'e9', source: 'msgbus', target: 'notifications', label: 'subscribe', ...asyncEdge },
  { id: 'e10', source: 'msgbus', target: 'analytics', label: 'subscribe', ...asyncEdge },
]

export default {
  title: 'Microservices Architecture — Sync + Async Communication',
  nodes,
  edges,
}
