import { useCallback, useState, lazy, Suspense } from 'react'
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
} from '@xyflow/react'
import '@xyflow/react/dist/style.css'
import { Maximize2, Minimize2, X } from 'lucide-react'
import InteractiveFlowPanel from './InteractiveFlowPanel'

const flowRegistry = {
  ragPipeline: () => import('./flows/ragPipeline'),
  eventLoop: () => import('./flows/eventLoop'),
  microservices: () => import('./flows/microservices'),
  k8sPodLifecycle: () => import('./flows/k8sPodLifecycle'),
  dataPipeline: () => import('./flows/dataPipeline'),
  reactRendering: () => import('./flows/reactRendering'),
  sqlQueryExecution: () => import('./flows/sqlQueryExecution'),
  pythonAsyncio: () => import('./flows/pythonAsyncio'),
}

export default function InteractiveFlow({ flowName }) {
  const [flowData, setFlowData] = useState(null)
  const [nodes, setNodes, onNodesChange] = useNodesState([])
  const [edges, setEdges, onEdgesChange] = useEdgesState([])
  const [selectedNode, setSelectedNode] = useState(null)
  const [expanded, setExpanded] = useState(false)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  useState(() => {
    const loader = flowRegistry[flowName]
    if (!loader) {
      setError(`Unknown flow: ${flowName}`)
      setLoading(false)
      return
    }
    loader()
      .then((mod) => {
        const data = mod.default || mod
        setFlowData(data)
        setNodes(data.nodes)
        setEdges(data.edges)
        setLoading(false)
      })
      .catch(() => {
        setError(`Failed to load flow: ${flowName}`)
        setLoading(false)
      })
  })

  const onNodeClick = useCallback((event, node) => {
    if (node.data?.detail) {
      setSelectedNode(node)
    }
  }, [])

  const closePanel = useCallback(() => setSelectedNode(null), [])

  if (error) {
    return (
      <div className="my-4 p-4 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-2)] text-center text-sm text-[var(--color-text-secondary)]">
        {error}
      </div>
    )
  }

  if (loading) {
    return (
      <div className="my-4 p-4 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] text-center text-sm text-[var(--color-text-secondary)]">
        Loading interactive diagram…
      </div>
    )
  }

  const title = flowData?.title || flowName

  return (
    <div
      className={`rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] overflow-hidden ${
        expanded ? 'fixed inset-4 z-50 shadow-2xl' : 'my-6'
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-3 bg-[var(--color-surface-2)] border-b border-[var(--color-border)]">
        <div>
          <h4 className="text-sm font-semibold text-[var(--color-text)]">{title}</h4>
          <p className="text-xs text-[var(--color-text-secondary)] mt-0.5">
            Click nodes for details · Scroll to zoom · Drag to pan
          </p>
        </div>
        <button
          onClick={() => setExpanded(!expanded)}
          className="p-1.5 rounded-lg hover:bg-[var(--color-surface-3)] cursor-pointer border-none bg-transparent text-[var(--color-text-secondary)]"
        >
          {expanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
        </button>
      </div>

      {expanded && (
        <div className="fixed inset-0 bg-black/50 -z-10" onClick={() => setExpanded(false)} />
      )}

      {/* Flow canvas */}
      <div className={`relative ${expanded ? 'h-[calc(100%-3.5rem)]' : 'h-[280px] sm:h-[420px]'}`}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onNodeClick={onNodeClick}
          fitView
          fitViewOptions={{ padding: 0.2 }}
          proOptions={{ hideAttribution: true }}
          nodesDraggable={false}
          style={{
            backgroundColor: 'var(--color-surface)',
          }}
        >
          <Background color="var(--color-border)" gap={20} size={1} />
          <Controls
            showInteractive={false}
            className="[&>button]:!bg-[var(--color-surface-2)] [&>button]:!border-[var(--color-border)] [&>button]:!text-[var(--color-text-secondary)] [&>button:hover]:!bg-[var(--color-surface-3)]"
          />
          <MiniMap
            nodeColor="var(--color-primary)"
            maskColor="var(--color-surface-2)"
            className="!bg-[var(--color-surface)] !border-[var(--color-border)]"
          />
        </ReactFlow>

        {/* Detail panel */}
        {selectedNode && (
          <InteractiveFlowPanel node={selectedNode} onClose={closePanel} />
        )}
      </div>
    </div>
  )
}
