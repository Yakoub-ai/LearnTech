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

const dangerStyle = {
  ...nodeDefaults.style,
  background: '#ef4444',
  color: '#fff',
  border: '1px solid #dc2626',
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
  {
    id: 'preparation',
    position: { x: 0, y: 0 },
    data: {
      label: '🛡️ Preparation',
      detail: 'Build incident response capabilities before an incident occurs. This includes developing the IR plan, assembling the response team, configuring monitoring tools, and running tabletop exercises.',
      tips: ['Maintain an up-to-date IR plan with contact lists and escalation paths', 'Ensure logging is enabled on all critical systems (SIEM, EDR)', 'Run tabletop exercises quarterly to test response procedures', 'Prepare forensic toolkits and clean analysis environments'],
    },
    style: primaryStyle,
  },
  {
    id: 'detection',
    position: { x: 220, y: 0 },
    data: {
      label: '🔔 Detection',
      detail: 'Identify potential security incidents through monitoring alerts, user reports, threat intelligence, or anomaly detection. Not every alert is a true incident — triage is critical.',
      code: '# Example: SIEM alert correlation\nalert_sources:\n  - EDR: endpoint anomalies\n  - SIEM: log correlation rules\n  - IDS/IPS: network signatures\n  - WAF: application-layer attacks\n  - User reports: phishing, suspicious behaviour',
      tips: ['Tune alert thresholds to reduce false positives', 'Correlate alerts across multiple sources for higher confidence', 'Maintain a threat intelligence feed for known IoCs (Indicators of Compromise)'],
    },
    style: accentStyle,
  },
  {
    id: 'analysis',
    position: { x: 440, y: 0 },
    data: {
      label: '🔍 Analysis',
      detail: 'Determine scope, severity, and impact. Identify what systems are affected, what data may be compromised, and how the attacker gained access. Classify severity (P1-P4).',
      tips: ['Determine: What happened? When? What systems? What data?', 'Classify severity to drive response urgency and communication', 'Preserve evidence — create forensic images before making changes', 'Check if the incident is still active or already contained'],
    },
    style: amberStyle,
  },
  {
    id: 'containment',
    position: { x: 0, y: 160 },
    data: {
      label: '🚧 Containment',
      detail: 'Limit the damage and prevent the incident from spreading. Short-term containment isolates affected systems immediately; long-term containment keeps business running while a fix is prepared.',
      code: '# Short-term containment examples:\n- Isolate affected host from network\n- Block malicious IP at firewall\n- Disable compromised user account\n- Redirect DNS to sinkhole\n\n# Long-term containment:\n- Apply temporary patches\n- Segment affected network zone\n- Increase monitoring on affected area',
      tips: ['Short-term: stop the bleeding immediately', 'Long-term: allow business continuity while preparing eradication', 'Document every action taken and its timestamp', 'Do NOT alert the attacker by making obvious changes if the incident is active'],
    },
    style: dangerStyle,
  },
  {
    id: 'eradication',
    position: { x: 220, y: 160 },
    data: {
      label: '🗑️ Eradication',
      detail: 'Remove the root cause of the incident. This may involve removing malware, closing vulnerabilities, revoking compromised credentials, and rebuilding affected systems from clean images.',
      tips: ['Identify and patch the vulnerability that allowed the breach', 'Remove all attacker persistence mechanisms (backdoors, scheduled tasks)', 'Rotate all potentially compromised credentials', 'Rebuild from known-good backups if integrity is uncertain'],
    },
    style: dangerStyle,
  },
  {
    id: 'recovery',
    position: { x: 440, y: 160 },
    data: {
      label: '🔄 Recovery',
      detail: 'Restore affected systems to normal operation. Verify that the threat has been eliminated and systems are functioning correctly before returning to production.',
      tips: ['Restore from verified clean backups', 'Monitor recovered systems closely for recurrence', 'Gradually return systems to production, not all at once', 'Verify data integrity after restoration'],
    },
    style: greenStyle,
  },
  {
    id: 'postincident',
    position: { x: 220, y: 300 },
    data: {
      label: '📋 Post-Incident Review',
      detail: 'Conduct a blameless post-mortem to document what happened, what went well, what failed, and what improvements are needed. Update the IR plan based on lessons learned.',
      tips: ['Hold the review within 1-2 weeks while memory is fresh', 'Blameless culture — focus on systems and processes, not individuals', 'Document a timeline, root cause, contributing factors, and action items', 'Update detection rules, playbooks, and training based on findings'],
    },
    style: primaryStyle,
  },
]

const edgeDefaults = {
  style: { stroke: 'var(--color-primary)', strokeWidth: 2 },
  markerEnd: { type: MarkerType.ArrowClosed, color: 'var(--color-primary)' },
  animated: true,
}

const edges = [
  { id: 'e1', source: 'preparation', target: 'detection', label: 'alert triggered', ...edgeDefaults },
  { id: 'e2', source: 'detection', target: 'analysis', label: 'triage', ...edgeDefaults },
  { id: 'e3', source: 'analysis', target: 'containment', label: 'scope determined', ...edgeDefaults },
  { id: 'e4', source: 'containment', target: 'eradication', label: 'threat isolated', ...edgeDefaults },
  { id: 'e5', source: 'eradication', target: 'recovery', label: 'root cause removed', ...edgeDefaults },
  { id: 'e6', source: 'recovery', target: 'postincident', label: 'systems restored', ...edgeDefaults },
  { id: 'e7', source: 'postincident', target: 'preparation', label: 'lessons applied', ...edgeDefaults, animated: false, style: { ...edgeDefaults.style, strokeDasharray: '5 5' } },
]

export default {
  title: 'Incident Response Lifecycle — NIST SP 800-61',
  nodes,
  edges,
}
