import { MarkerType } from '@xyflow/react'

const nodeDefaults = {
  style: {
    padding: '12px 16px',
    borderRadius: 12,
    fontSize: 13,
    fontFamily: 'Inter, system-ui, sans-serif',
    border: '1px solid var(--color-border)',
    background: 'var(--color-surface-2)',
    color: 'var(--color-text)',
    cursor: 'pointer',
  },
}

const primaryStyle = {
  ...nodeDefaults.style,
  background: '#6366f1',
  color: '#fff',
  border: '1px solid #4f46e5',
}

const accentStyle = {
  ...nodeDefaults.style,
  background: '#0ea5e9',
  color: '#fff',
  border: '1px solid #0284c7',
}

const greenStyle = {
  ...nodeDefaults.style,
  background: '#10b981',
  color: '#fff',
  border: '1px solid #059669',
}

const amberStyle = {
  ...nodeDefaults.style,
  background: '#f59e0b',
  color: '#fff',
  border: '1px solid #d97706',
}

const nodes = [
  // Data collection layer
  {
    id: 'web',
    position: { x: 0, y: 0 },
    data: {
      label: '🌐 Web Events',
      detail: 'Capture user interactions on websites: page views, clicks, form submissions, scroll depth, video plays. Instrumented via analytics SDKs or tag managers.',
      tips: ['Use Google Tag Manager to manage tracking tags without code deploys', 'Implement a data layer to decouple tracking from the UI', 'Fire events on meaningful actions, not every click'],
    },
    style: nodeDefaults.style,
  },
  {
    id: 'app',
    position: { x: 0, y: 100 },
    data: {
      label: '📱 App Events',
      detail: 'Mobile and desktop app interactions: screen views, feature usage, in-app purchases, push notification interactions. Captured via mobile SDKs (Firebase, Segment).',
      tips: ['Track app lifecycle events: install, open, update, uninstall', 'Use consistent event naming across web and app', 'Respect platform privacy controls (ATT on iOS, consent on Android)'],
    },
    style: nodeDefaults.style,
  },
  {
    id: 'crm',
    position: { x: 0, y: 200 },
    data: {
      label: '💼 CRM / Offline',
      detail: 'Customer records from CRM systems (Salesforce, HubSpot), point-of-sale data, call centre interactions, and offline events like store visits.',
      tips: ['Sync CRM data on a regular schedule (hourly or daily)', 'Map CRM fields to the unified profile schema', 'Include offline conversion data for attribution modelling'],
    },
    style: nodeDefaults.style,
  },
  // Processing layer
  {
    id: 'consent',
    position: { x: 220, y: 0 },
    data: {
      label: '✅ Consent Gate',
      detail: 'GDPR and privacy regulations require explicit consent before collecting personal data. The Consent Management Platform (CMP) controls which data flows are allowed based on user choices.',
      tips: ['No consent = no tracking for that user', 'Integrate CMP with all downstream tools (analytics, ads, CDP)', 'Store consent records as legal evidence', 'Respect "Do Not Sell" signals under CCPA/CPRA'],
    },
    style: amberStyle,
  },
  {
    id: 'identity',
    position: { x: 220, y: 120 },
    data: {
      label: '🔗 Identity Resolution',
      detail: 'Match anonymous and known user identifiers across devices and channels into a single customer profile. Uses deterministic matching (email, login ID) and probabilistic matching (device fingerprints, IP).',
      tips: ['Deterministic matching (email, user ID) is reliable but incomplete', 'Probabilistic matching fills gaps but introduces uncertainty', 'First-party cookies are replacing third-party cookies for web identity', 'Always prefer consented first-party data over inferred data'],
    },
    style: primaryStyle,
  },
  {
    id: 'profile',
    position: { x: 440, y: 60 },
    data: {
      label: '👤 Unified Profile',
      detail: 'A single, persistent customer record combining data from all sources: demographics, behaviour history, preferences, purchase history, and engagement scores.',
      tips: ['Design a flexible schema that accommodates new data sources', 'Maintain profile freshness with real-time event streaming', 'Include computed attributes: lifetime value, churn risk, engagement score'],
    },
    style: accentStyle,
  },
  // Activation layer
  {
    id: 'segment',
    position: { x: 440, y: 180 },
    data: {
      label: '🎯 Segmentation',
      detail: 'Group customers by shared characteristics or behaviours: high-value customers, at-risk churners, new visitors, cart abandoners. Segments power targeted marketing.',
      tips: ['Static segments: defined by rules (e.g., "purchased > 3 times")', 'Dynamic segments: update in real-time as behaviour changes', 'Predictive segments: use ML to identify likely converters or churners'],
    },
    style: primaryStyle,
  },
  {
    id: 'personalise',
    position: { x: 220, y: 280 },
    data: {
      label: '✨ Personalisation',
      detail: 'Deliver tailored experiences based on the unified profile and segment membership. Website content, product recommendations, email subject lines, and ad creative adapt per user.',
      tips: ['Start with rule-based personalisation, then add ML-driven recommendations', 'A/B test personalisation against a control group to measure lift', 'Personalisation without consent tracking uses contextual signals (page content, time of day)'],
    },
    style: greenStyle,
  },
  {
    id: 'campaign',
    position: { x: 440, y: 280 },
    data: {
      label: '📧 Campaign Delivery',
      detail: 'Orchestrate multi-channel campaigns: email, push notifications, SMS, in-app messages, and paid media. Triggered by events (cart abandon) or scheduled (weekly newsletter).',
      tips: ['Use event-triggered campaigns for timely, relevant messaging', 'Respect frequency caps to avoid user fatigue', 'Track campaign attribution: which touchpoint drove the conversion?', 'Measure incrementality, not just last-click attribution'],
    },
    style: greenStyle,
  },
]

const edgeDefaults = {
  style: { stroke: 'var(--color-primary)', strokeWidth: 2 },
  markerEnd: { type: MarkerType.ArrowClosed, color: 'var(--color-primary)' },
  animated: true,
}

const edges = [
  { id: 'e1', source: 'web', target: 'consent', label: 'check consent', ...edgeDefaults },
  { id: 'e2', source: 'app', target: 'consent', ...edgeDefaults },
  { id: 'e3', source: 'crm', target: 'identity', ...edgeDefaults },
  { id: 'e4', source: 'consent', target: 'identity', label: 'consented data', ...edgeDefaults },
  { id: 'e5', source: 'identity', target: 'profile', label: 'resolve', ...edgeDefaults },
  { id: 'e6', source: 'profile', target: 'segment', label: 'classify', ...edgeDefaults },
  { id: 'e7', source: 'segment', target: 'personalise', label: 'target', ...edgeDefaults },
  { id: 'e8', source: 'segment', target: 'campaign', label: 'activate', ...edgeDefaults },
  { id: 'e9', source: 'campaign', target: 'web', label: 'feedback', ...edgeDefaults, animated: false, style: { ...edgeDefaults.style, strokeDasharray: '5 5' } },
]

export default {
  title: 'MarTech Data Flow — From Customer Interaction to Campaign Delivery',
  nodes,
  edges,
}
