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
const rose = { ...base, background: '#f43f5e', color: '#fff', border: '1px solid #e11d48' }
const sky = { ...base, background: '#0ea5e9', color: '#fff', border: '1px solid #0284c7' }

const nodes = [
  {
    id: 'pending',
    position: { x: 0, y: 150 },
    data: {
      label: '⏳ Pending',
      detail: 'Pod accepted by the cluster but one or more containers are not yet created. Waiting for scheduling, image pull, or volume mounting.',
      code: 'kubectl get pods\n# NAME       STATUS    AGE\n# my-pod     Pending   5s\n\nkubectl describe pod my-pod\n# Events: Pulling image...',
      tips: ['ImagePullBackOff: wrong image name or no access', 'Unschedulable: insufficient CPU/memory', 'Check: kubectl describe pod <name>'],
    },
    style: amber,
  },
  {
    id: 'init',
    position: { x: 200, y: 50 },
    data: {
      label: '🔧 Init Containers',
      detail: 'Special containers that run BEFORE app containers start. Run sequentially — each must complete successfully before the next starts.',
      code: 'initContainers:\n  - name: db-migration\n    image: migrate:latest\n    command: ["./migrate", "up"]\n  - name: config-fetch\n    image: curl:latest\n    command: ["curl", "-o", "/config/app.yaml", "http://config-svc/config"]',
      tips: ['Run database migrations', 'Fetch configs or secrets', 'Wait for dependencies to be ready', 'Must exit 0 to proceed'],
    },
    style: sky,
  },
  {
    id: 'running',
    position: { x: 400, y: 150 },
    data: {
      label: '✅ Running',
      detail: 'At least one container is running. Liveness and readiness probes actively check container health. Pod receives traffic only when readiness probe passes.',
      code: 'livenessProbe:\n  httpGet:\n    path: /healthz\n    port: 8080\n  initialDelaySeconds: 10\n  periodSeconds: 5\n\nreadinessProbe:\n  httpGet:\n    path: /ready\n    port: 8080\n  periodSeconds: 3',
      tips: ['Liveness: restart container if unhealthy', 'Readiness: remove from service endpoints if not ready', 'Startup probe: for slow-starting containers'],
    },
    style: green,
  },
  {
    id: 'succeeded',
    position: { x: 650, y: 50 },
    data: {
      label: '🎉 Succeeded',
      detail: 'All containers terminated with exit code 0. Typical for Jobs and CronJobs. Pod stays in this state for log inspection.',
      tips: ['Normal for batch Jobs', 'Logs still accessible', 'Pod cleaned up by TTL controller or manually'],
    },
    style: primary,
  },
  {
    id: 'failed',
    position: { x: 650, y: 250 },
    data: {
      label: '❌ Failed',
      detail: 'At least one container terminated with a non-zero exit code. RestartPolicy determines if the container is restarted.',
      code: 'kubectl logs my-pod --previous\n# View logs from crashed container\n\nkubectl describe pod my-pod\n# Last State: Terminated\n#   Exit Code: 137 (OOMKilled)\n#   Reason: OOMKilled',
      tips: ['Exit 137: OOMKilled (out of memory)', 'Exit 1: application error', 'CrashLoopBackOff: repeated failures with exponential backoff', 'Check: kubectl logs <pod> --previous'],
    },
    style: rose,
  },
  {
    id: 'terminating',
    position: { x: 400, y: 310 },
    data: {
      label: '🔄 Terminating',
      detail: 'Pod is being shut down. Kubernetes sends SIGTERM, waits terminationGracePeriodSeconds (default 30s), then sends SIGKILL.',
      code: 'lifecycle:\n  preStop:\n    exec:\n      command: ["/bin/sh", "-c", "sleep 5"]\n# Ensures in-flight requests complete\n# before the pod is removed from\n# service endpoints',
      tips: ['SIGTERM first, then SIGKILL after grace period', 'preStop hook runs before SIGTERM', 'Remove from service endpoints happens in parallel', 'Default grace period: 30 seconds'],
    },
    style: amber,
  },
]

const edgeDefaults = {
  style: { stroke: '#6366f1', strokeWidth: 2 },
  markerEnd: { type: MarkerType.ArrowClosed, color: '#6366f1' },
}

const edges = [
  { id: 'e1', source: 'pending', target: 'init', label: 'scheduled', ...edgeDefaults, animated: true },
  { id: 'e2', source: 'init', target: 'running', label: 'init done', ...edgeDefaults, animated: true },
  { id: 'e3', source: 'pending', target: 'running', label: 'no init', ...edgeDefaults, style: { ...edgeDefaults.style, strokeDasharray: '5 5' } },
  { id: 'e4', source: 'running', target: 'succeeded', label: 'exit 0', ...edgeDefaults },
  { id: 'e5', source: 'running', target: 'failed', label: 'exit != 0', ...edgeDefaults, style: { stroke: '#f43f5e', strokeWidth: 2 }, markerEnd: { type: MarkerType.ArrowClosed, color: '#f43f5e' } },
  { id: 'e6', source: 'running', target: 'terminating', label: 'delete', ...edgeDefaults },
  { id: 'e7', source: 'failed', target: 'pending', label: 'RestartPolicy', ...edgeDefaults, style: { stroke: '#f59e0b', strokeWidth: 2, strokeDasharray: '5 5' }, markerEnd: { type: MarkerType.ArrowClosed, color: '#f59e0b' } },
]

export default {
  title: 'Kubernetes Pod Lifecycle',
  nodes,
  edges,
}
