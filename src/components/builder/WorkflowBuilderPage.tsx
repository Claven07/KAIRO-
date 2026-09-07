import React, { useState } from 'react';
import { useAutomation } from '../../context/AutomationContext';
import { NodeInspector } from './NodeInspector';
import { WorkflowNode } from '../../types';
import {
  Play,
  CheckCircle2,
  Sparkles,
  Zap,
  Mail,
  Bell,
  Save,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Terminal,
  Loader2,
  Clock,
  Layers,
  ChevronDown,
  ChevronUp,
  Check,
  Sliders,
} from 'lucide-react';
import { motion } from 'framer-motion';

export const WorkflowBuilderPage: React.FC = () => {
  const {
    activeWorkflowNodes,
    activeWorkflowEdges,
    selectedNodeId,
    selectNode,
    testWorkflow,
    isTestingWorkflow,
    testLogs,
    activateWorkflow,
    isActivated,
    showToast,
  } = useAutomation();

  const [zoom, setZoom] = useState(1);
  const [showConsole, setShowConsole] = useState(false);
  const [inspectorOpen, setInspectorOpen] = useState(true);

  const selectedNode =
    activeWorkflowNodes.find(n => n.id === selectedNodeId) || null;

  const handleZoomIn = () => setZoom(prev => Math.min(prev + 0.1, 1.4));
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 0.1, 0.75));
  const handleResetZoom = () => setZoom(1);

  const handleSave = () => {
    showToast('Workflow saved to draft repository', 'success');
  };

  const getNodeIcon = (type: string) => {
    switch (type) {
      case 'TRIGGER':
        return <Mail className="w-3.5 h-3.5 text-blue-600" />;
      case 'AI_PROCESSING':
        return <Sparkles className="w-3.5 h-3.5 text-indigo-600" />;
      case 'LOGIC':
        return <Zap className="w-3.5 h-3.5 text-amber-600" />;
      case 'ACTION':
        return <Bell className="w-3.5 h-3.5 text-emerald-600" />;
      default:
        return <Layers className="w-3.5 h-3.5 text-slate-600" />;
    }
  };

  const getTypeMeta = (type: string) => {
    switch (type) {
      case 'TRIGGER':
        return { label: 'Trigger', badge: 'bg-blue-50 text-blue-700 border-blue-200/60' };
      case 'AI_PROCESSING':
        return { label: 'Intelligence', badge: 'bg-indigo-50 text-indigo-700 border-indigo-200/60' };
      case 'LOGIC':
        return { label: 'Decision', badge: 'bg-amber-50 text-amber-700 border-amber-200/60' };
      case 'ACTION':
        return { label: 'Action', badge: 'bg-emerald-50 text-emerald-700 border-emerald-200/60' };
      default:
        return { label: 'Node', badge: 'bg-slate-100 text-slate-700 border-slate-200' };
    }
  };

  // Node position scaling for balanced layout
  const NODE_WIDTH = 220;
  const getNodePosition = (index: number) => {
    const spacing = 260;
    const startX = 50;
    const startY = 140;
    return {
      x: startX + index * spacing,
      y: startY,
    };
  };

  return (
    <div className="flex-1 flex flex-col h-[calc(100vh-3.5rem)] overflow-hidden bg-[#FAF9F7] select-none">
      {/* Top Builder Control Bar */}
      <div className="h-12 bg-white border-b border-black/[0.05] px-5 flex items-center justify-between z-10 shadow-2xs">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <h2 className="text-xs font-semibold text-[#18181B] tracking-tight">
              Smart Email Triage
            </h2>
            <span
              className={`px-2 py-0.5 rounded text-[10px] font-mono tracking-tight ${
                isActivated
                  ? 'bg-emerald-50 text-emerald-700'
                  : 'bg-slate-100 text-slate-600'
              }`}
            >
              {isActivated ? '● Active' : '○ Draft'}
            </span>
          </div>
          <span className="text-slate-300 text-xs">|</span>
          <span className="text-[11.5px] text-slate-400 hidden sm:inline">
            4 nodes · 3 transitions · Autonomous
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          {/* Toggle Console */}
          <button
            onClick={() => setShowConsole(!showConsole)}
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-md border transition-colors ${
              showConsole || testLogs.length > 0
                ? 'bg-slate-100 text-slate-900 border-slate-300'
                : 'bg-white text-slate-600 border-black/[0.08] hover:bg-slate-50'
            }`}
          >
            <Terminal className="w-3.5 h-3.5 text-slate-500" />
            <span className="hidden sm:inline">Execution Console</span>
            {testLogs.length > 0 && (
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            )}
          </button>

          {/* Save Draft */}
          <button
            onClick={handleSave}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-slate-700 bg-white hover:bg-slate-50 rounded-md border border-black/[0.08] shadow-2xs transition-colors"
          >
            <Save className="w-3.5 h-3.5 text-slate-400" />
            <span>Save</span>
          </button>

          {/* Test Workflow Simulation */}
          <button
            onClick={testWorkflow}
            disabled={isTestingWorkflow}
            className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium text-slate-800 bg-slate-100 hover:bg-slate-200/70 rounded-md border border-black/[0.06] transition-all disabled:opacity-50"
            title="Execute simulation across all 4 nodes"
          >
            {isTestingWorkflow ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin text-[#2D44D8]" />
            ) : (
              <Play className="w-3 h-3 text-[#2D44D8] fill-[#2D44D8]" />
            )}
            <span>{isTestingWorkflow ? 'Running...' : 'Test Workflow'}</span>
          </button>

          {/* Activate Workflow Button */}
          <button
            onClick={activateWorkflow}
            className="inline-flex items-center gap-1 px-3.5 py-1 text-xs font-medium text-white bg-[#2D44D8] hover:bg-[#2235B0] rounded-md shadow-2xs transition-all active:scale-[0.98]"
          >
            <Check className="w-3.5 h-3.5" />
            <span>Activate</span>
          </button>
        </div>
      </div>

      {/* Main Workspace Area (Canvas + Slide Inspector) */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* Canvas Area */}
        <div
          className="flex-1 relative overflow-auto bg-dot-grid bg-[#FAF9F7] flex items-center justify-center p-8"
          onClick={() => selectNode(null)}
        >
          {/* Zoom floating controls */}
          <div className="absolute bottom-5 left-5 z-10 flex items-center gap-1 bg-white/95 backdrop-blur-md rounded-md border border-black/[0.07] shadow-card p-1">
            <button
              onClick={handleZoomOut}
              className="p-1 hover:bg-slate-100 rounded text-slate-500 transition-colors"
              title="Zoom Out"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <span className="text-[11px] font-mono px-2 text-slate-500 min-w-[38px] text-center">
              {Math.round(zoom * 100)}%
            </span>
            <button
              onClick={handleZoomIn}
              className="p-1 hover:bg-slate-100 rounded text-slate-500 transition-colors"
              title="Zoom In"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
            <div className="w-px h-3 bg-slate-200 mx-1" />
            <button
              onClick={handleResetZoom}
              className="p-1 hover:bg-slate-100 rounded text-slate-500 transition-colors"
              title="Fit View"
            >
              <Maximize2 className="w-3 h-3" />
            </button>
          </div>

          {/* Workflow Canvas Plane */}
          <div
            className="relative transition-transform duration-150 ease-out origin-center"
            style={{
              transform: `scale(${zoom})`,
              minWidth: '1080px',
              minHeight: '380px',
            }}
            onClick={e => e.stopPropagation()}
          >
            {/* SVG Connecting Flow Lines with dynamic pulses */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none z-0"
              style={{ minWidth: '1080px', minHeight: '380px' }}
            >
              <defs>
                <linearGradient id="flow-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#2D44D8" stopOpacity="0.4" />
                  <stop offset="50%" stopColor="#6366F1" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#059669" stopOpacity="0.6" />
                </linearGradient>
              </defs>

              {activeWorkflowEdges.map((edge, idx) => {
                const sourcePos = getNodePosition(idx);
                const targetPos = getNodePosition(idx + 1);

                // Source right center
                const x1 = sourcePos.x + NODE_WIDTH;
                const y1 = sourcePos.y + 55;
                // Target left center
                const x2 = targetPos.x;
                const y2 = targetPos.y + 55;

                const dx = (x2 - x1) / 2;
                const pathData = `M ${x1} ${y1} C ${x1 + dx} ${y1}, ${x2 - dx} ${y2}, ${x2} ${y2}`;

                return (
                  <g key={edge.id}>
                    {/* Base clean connector track */}
                    <path
                      d={pathData}
                      fill="none"
                      stroke="#E2E8F0"
                      strokeWidth="1.75"
                    />
                    {/* Animated energy flow dashes */}
                    <path
                      d={pathData}
                      fill="none"
                      stroke="url(#flow-gradient)"
                      strokeWidth="1.75"
                      className="animate-flow-dash"
                    />
                  </g>
                );
              })}
            </svg>

            {/* Render Nodes */}
            {activeWorkflowNodes.map((node, index) => {
              const isSelected = selectedNodeId === node.id;
              const meta = getTypeMeta(node.type);
              const pos = getNodePosition(index);

              let statusBorder = 'border-black/[0.08]';
              let statusRing = '';
              if (node.status === 'running') {
                statusBorder = 'border-[#2D44D8]';
                statusRing = 'ring-2 ring-indigo-500/25';
              } else if (node.status === 'success') {
                statusBorder = 'border-emerald-500';
                statusRing = 'ring-2 ring-emerald-500/20';
              } else if (isSelected) {
                statusBorder = 'border-[#2D44D8]';
                statusRing = 'ring-2 ring-[#2D44D8]/20';
              }

              return (
                <motion.div
                  key={node.id}
                  style={{
                    position: 'absolute',
                    left: `${pos.x}px`,
                    top: `${pos.y}px`,
                    width: `${NODE_WIDTH}px`,
                  }}
                  whileHover={{ y: -2 }}
                  transition={{ duration: 0.15 }}
                  onClick={() => {
                    selectNode(node.id);
                    setInspectorOpen(true);
                  }}
                  className={`bg-white rounded-card p-3.5 shadow-card transition-all cursor-pointer z-10 border ${statusBorder} ${statusRing} select-none group`}
                >
                  {/* Top Node Header */}
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-1.5">
                      <div className="w-6 h-6 rounded bg-[#FAF9F7] border border-black/[0.06] flex items-center justify-center">
                        {getNodeIcon(node.type)}
                      </div>
                      <span
                        className={`text-[10px] font-medium px-1.5 py-0.2 rounded border ${meta.badge}`}
                      >
                        {meta.label}
                      </span>
                    </div>

                    {/* Status Badge */}
                    {node.status === 'running' && (
                      <Loader2 className="w-3.5 h-3.5 text-[#2D44D8] animate-spin" />
                    )}
                    {node.status === 'success' && (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    )}
                    {node.status === 'idle' && (
                      <span className="text-[10px] font-mono text-slate-300">
                        #{index + 1}
                      </span>
                    )}
                  </div>

                  {/* Title & Subtitle */}
                  <div>
                    <h3 className="text-[13px] font-semibold text-[#18181B] leading-snug group-hover:text-[#2D44D8] transition-colors">
                      {node.title}
                    </h3>
                    <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-2 leading-relaxed font-normal">
                      {node.subtitle}
                    </p>
                  </div>

                  {/* Metadata & Footer */}
                  <div className="mt-3 pt-2 border-t border-black/[0.04] flex items-center justify-between text-[10px] text-slate-400">
                    <span className="truncate max-w-[130px] font-mono">
                      {node.config.model || node.config.sourceApp || node.config.actionChannel || 'Default'}
                    </span>
                    {node.executionLatency && (
                      <span className="font-mono text-slate-500">
                        {node.executionLatency}
                      </span>
                    )}
                  </div>

                  {/* Port dots */}
                  {index > 0 && (
                    <div className="absolute -left-1.5 top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-white border-2 border-slate-400" />
                  )}
                  {index < activeWorkflowNodes.length - 1 && (
                    <div className="absolute -right-1.5 top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-white border-2 border-slate-400" />
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Contextual Configuration Inspector Drawer */}
        {inspectorOpen && selectedNode && (
          <NodeInspector
            node={selectedNode}
            onClose={() => setInspectorOpen(false)}
          />
        )}
      </div>

      {/* Execution Console (Bottom Drawer) */}
      {showConsole && (
        <div className="h-44 bg-[#18181B] text-slate-200 border-t border-black/[0.15] p-3.5 flex flex-col z-20 font-mono text-xs shadow-float animate-in slide-in-from-bottom-2 duration-150">
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-zinc-800">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-medium text-white tracking-wide text-xs">
                Kairo Neural Runtime Log
              </span>
              <span className="text-[11px] text-slate-400 ml-2">
                (4 nodes verified)
              </span>
            </div>
            <button
              onClick={() => setShowConsole(false)}
              className="text-slate-400 hover:text-white transition-colors"
            >
              <ChevronDown className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto space-y-1 text-slate-300 pr-2">
            {testLogs.length === 0 ? (
              <p className="text-slate-500 italic">
                Click "Test Workflow" above to execute a live simulation through all 4 nodes.
              </p>
            ) : (
              testLogs.map((log, i) => (
                <div key={i} className="flex items-start gap-2 text-[11px]">
                  <span className="text-slate-500 select-none">
                    [{new Date().toISOString().substring(11, 19)}]
                  </span>
                  <span
                    className={
                      log.startsWith('✓')
                        ? 'text-emerald-400'
                        : log.startsWith('✨')
                        ? 'text-indigo-300 font-semibold'
                        : 'text-slate-300'
                    }
                  >
                    {log}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};
