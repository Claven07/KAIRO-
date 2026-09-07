import React, { useState } from 'react';
import { useAutomation } from '../../context/AutomationContext';
import { WorkflowNode } from '../../types';
import {
  X,
  Sparkles,
  Sliders,
  Check,
  ChevronDown,
  ChevronUp,
  ShieldCheck,
  Activity,
  Database,
} from 'lucide-react';

interface NodeInspectorProps {
  node: WorkflowNode | null;
  onClose: () => void;
}

interface NodeInspectorFormProps {
  node: WorkflowNode;
  onClose: () => void;
}

const NodeInspectorForm: React.FC<NodeInspectorFormProps> = ({ node, onClose }) => {
  const { updateNodeConfig, showToast } = useAutomation();

  const [title, setTitle] = useState(node.title);
  const [subtitle, setSubtitle] = useState(node.subtitle);
  const [model, setModel] = useState(
    node.config.model || 'KAIRO Neural Core v2.4 (Air-Gapped Local)'
  );
  const [promptTemplate, setPromptTemplate] = useState(node.config.promptTemplate || '');
  const [temperature, setTemperature] = useState(node.config.temperature ?? 0.2);
  const [actionChannel, setActionChannel] = useState(node.config.actionChannel || '');
  const [recipients, setRecipients] = useState(node.config.recipients || '');
  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleSave = () => {
    updateNodeConfig(node.id, {
      title,
      subtitle,
      config: {
        ...node.config,
        model,
        promptTemplate,
        temperature,
        actionChannel,
        recipients,
      },
    });
    showToast(`Saved settings for "${title}"`, 'success');
  };

  const getTypeMeta = () => {
    switch (node.type) {
      case 'TRIGGER':
        return { label: 'TRIGGER', badge: 'text-accent bg-blue-50 border-blue-200/60' };
      case 'AI_PROCESSING':
        return { label: 'INTELLIGENCE', badge: 'text-indigo-700 bg-indigo-50 border-indigo-200/60' };
      case 'LOGIC':
        return { label: 'DECISION', badge: 'text-amber-700 bg-amber-50 border-amber-200/60' };
      case 'ACTION':
        return { label: 'DISPATCH', badge: 'text-status-success bg-emerald-50 border-emerald-200/60' };
      default:
        return { label: 'NODE', badge: 'text-slate-700 bg-slate-100 border-slate-200' };
    }
  };

  const meta = getTypeMeta();

  return (
    <aside className="w-84 border-l border-black/[0.07] bg-white flex flex-col h-full overflow-hidden shadow-card z-10 animate-in slide-in-from-right-3 duration-150 select-none">
      {/* Inspector Header */}
      <div className="h-12 px-4 border-b border-black/[0.07] flex items-center justify-between bg-[#FAF9F7]/80">
        <div className="flex items-center gap-2">
          <span
            className={`px-2 py-0.5 rounded text-[9.5px] font-mono font-medium border ${meta.badge}`}
          >
            {meta.label}
          </span>
          <span className="text-[10px] font-mono text-slate-400">
            NODE // {node.id}
          </span>
        </div>
        <button
          onClick={onClose}
          className="p-1 rounded text-slate-400 hover:text-slate-700 hover:bg-black/[0.04] transition-colors"
          title="Close Inspector"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Inspector Form Body */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 text-left text-xs">
        {/* Section 1: Core Essentials */}
        <div className="space-y-3">
          <div className="space-y-1">
            <label className="text-[10.5px] font-mono uppercase tracking-wider text-slate-400">
              Step Title
            </label>
            <input
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
              className="w-full px-2.5 py-1.5 bg-white rounded-md border border-black/[0.08] text-graphite font-medium focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/15 transition-all text-xs"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[10.5px] font-mono uppercase tracking-wider text-slate-400">
              Execution Intent
            </label>
            <input
              type="text"
              value={subtitle}
              onChange={e => setSubtitle(e.target.value)}
              className="w-full px-2.5 py-1.5 bg-white rounded-md border border-black/[0.08] text-slate-700 focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/15 transition-all text-xs"
            />
          </div>
        </div>

        {/* Section 2: Type-specific Configuration */}
        {node.type === 'AI_PROCESSING' && (
          <div className="space-y-3 pt-3 border-t border-black/[0.05]">
            <div className="space-y-1">
              <label className="text-[10.5px] font-mono uppercase tracking-wider text-slate-400 flex items-center justify-between">
                <span>Model Engine</span>
                <Sparkles className="w-3 h-3 text-indigo-500" />
              </label>
              <select
                value={model}
                onChange={e => setModel(e.target.value)}
                className="w-full px-2.5 py-1.5 bg-white rounded-md border border-black/[0.08] text-slate-800 focus:outline-none focus:border-accent text-xs font-mono"
              >
                <option value="KAIRO Neural Core v2.4 (Air-Gapped Local)">
                  KAIRO Neural Core v2.4 (Air-Gapped Local)
                </option>
                <option value="DeepSeek-R1 / 70B (On-Prem Cluster)">
                  DeepSeek-R1 / 70B (On-Prem Cluster)
                </option>
                <option value="Llama-3.3 70B Instruct (Hardware Enclave)">
                  Llama-3.3 70B Instruct (Hardware Enclave)
                </option>
                <option value="Gemini 1.5 Pro (Encrypted Sovereign Gateway)">
                  Gemini 1.5 Pro (Encrypted Sovereign Gateway)
                </option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-[10.5px] font-mono uppercase tracking-wider text-slate-400">
                System Instructions & Verification Constraint
              </label>
              <textarea
                value={promptTemplate}
                onChange={e => setPromptTemplate(e.target.value)}
                rows={3}
                className="w-full px-2.5 py-1.5 bg-white rounded-md border border-black/[0.08] text-slate-800 focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/15 text-xs leading-relaxed resize-none font-mono"
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-[10.5px] font-mono uppercase text-slate-400">
                <span>Determinism / Temp</span>
                <span className="font-mono text-graphite font-semibold">{temperature}</span>
              </div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={temperature}
                onChange={e => setTemperature(parseFloat(e.target.value))}
                className="w-full accent-accent h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex items-center justify-between text-[9px] font-mono text-slate-400">
                <span>0.0 STRICT REPRODUCIBLE</span>
                <span>1.0 HEURISTIC</span>
              </div>
            </div>
          </div>
        )}

        {node.type === 'TRIGGER' && (
          <div className="space-y-3 pt-3 border-t border-black/[0.05]">
            <div className="space-y-1">
              <label className="text-[10.5px] font-mono uppercase tracking-wider text-slate-400">
                Telemetry Ingestion Source
              </label>
              <div className="flex items-center gap-2 px-2.5 py-1.5 bg-[#FAF9F7] rounded-md border border-black/[0.06] text-slate-600 font-mono text-xs">
                <Database className="w-3.5 h-3.5 text-accent" />
                <span>{node.config.sourceApp || 'ARASAKA Internal Mail Relay (SMTP/TLS)'}</span>
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-[10.5px] font-mono uppercase tracking-wider text-slate-400">
                Ingestion Filter Regex
              </label>
              <input
                type="text"
                value={promptTemplate}
                onChange={e => setPromptTemplate(e.target.value)}
                className="w-full px-2.5 py-1.5 bg-white rounded-md border border-black/[0.08] text-slate-800 font-mono text-xs focus:outline-none focus:border-accent"
              />
            </div>
          </div>
        )}

        {node.type === 'LOGIC' && (
          <div className="space-y-2 pt-3 border-t border-black/[0.05]">
            <label className="text-[10.5px] font-mono uppercase tracking-wider text-slate-400 block">
              Deterministic Decision Rules
            </label>
            <div className="space-y-1.5">
              {(node.config.decisionRules || [
                'IF confidence > 0.90 THEN route to Automated Action',
                'IF confidence <= 0.90 THEN require Human Verification',
              ]).map((rule, idx) => (
                <div
                  key={idx}
                  className="p-2 bg-[#FAF9F7] rounded-md border border-black/[0.05] text-[11px] text-slate-700 font-mono leading-relaxed"
                >
                  {rule}
                </div>
              ))}
            </div>
          </div>
        )}

        {node.type === 'ACTION' && (
          <div className="space-y-3 pt-3 border-t border-black/[0.05]">
            <div className="space-y-1">
              <label className="text-[10.5px] font-mono uppercase tracking-wider text-slate-400">
                Dispatch Protocol
              </label>
              <input
                type="text"
                value={actionChannel}
                onChange={e => setActionChannel(e.target.value)}
                className="w-full px-2.5 py-1.5 bg-white rounded-md border border-black/[0.08] text-slate-800 text-xs font-mono focus:outline-none focus:border-accent"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10.5px] font-mono uppercase tracking-wider text-slate-400">
                Target Internal Recipient / Webhook
              </label>
              <input
                type="text"
                value={recipients}
                onChange={e => setRecipients(e.target.value)}
                className="w-full px-2.5 py-1.5 bg-white rounded-md border border-black/[0.08] text-slate-800 text-xs font-mono focus:outline-none focus:border-accent"
              />
            </div>
          </div>
        )}

        {/* Section 3: Progressive Disclosure (Advanced / Telemetry) */}
        <div className="pt-3 border-t border-black/[0.05]">
          <button
            type="button"
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="flex items-center justify-between w-full text-[11px] font-mono uppercase tracking-wider text-slate-500 hover:text-graphite py-1"
          >
            <span>Air-Gapped Telemetry Payload</span>
            {showAdvanced ? (
              <ChevronUp className="w-3.5 h-3.5 text-slate-400" />
            ) : (
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            )}
          </button>

          {showAdvanced && (
            <div className="mt-2 space-y-2 animate-in fade-in duration-100">
              <div className="flex items-center justify-between text-[11px] text-slate-500 font-mono">
                <span className="flex items-center gap-1">
                  <Activity className="w-3 h-3 text-status-success" />
                  Inference Latency:
                </span>
                <span className="text-status-success font-semibold">
                  {node.executionLatency || '38ms (local)'}
                </span>
              </div>
              <div className="flex items-center justify-between text-[11px] text-slate-500 font-mono">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-status-success" />
                  Isolation Integrity:
                </span>
                <span className="text-slate-700">VERIFIED // LOCAL ENCLAVE</span>
              </div>
              {node.executionOutput && (
                <div className="p-2.5 bg-[#FAF9F7] rounded-md border border-black/[0.05] text-[10px] font-mono text-slate-600 leading-relaxed break-words">
                  {node.executionOutput}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Inspector Footer */}
      <div className="p-3 border-t border-black/[0.07] bg-[#FAF9F7]/80 flex items-center justify-end gap-2">
        <button
          onClick={onClose}
          className="pressable px-2.5 py-1 text-xs text-slate-600 hover:text-slate-900 rounded hover:bg-black/[0.04] transition-colors"
        >
          Cancel
        </button>
        <button
          onClick={handleSave}
          className="pressable inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium text-white bg-graphite hover:bg-accent rounded-md shadow-2xs transition-colors"
        >
          <Check className="w-3 h-3" />
          <span>Save Parameters</span>
        </button>
      </div>
    </aside>
  );
};

export const NodeInspector: React.FC<NodeInspectorProps> = ({ node, onClose }) => {
  if (!node) {
    return (
      <aside className="w-84 border-l border-black/[0.07] bg-[#FAF9F7] p-6 flex flex-col items-center justify-center text-center text-slate-400 select-none">
        <Sliders className="w-6 h-6 stroke-[1.5] text-slate-300 mb-2" />
        <p className="text-xs font-medium text-slate-600">No node selected</p>
        <p className="text-[11px] text-slate-400 mt-0.5">
          Select any workflow step to configure parameters.
        </p>
      </aside>
    );
  }

  return <NodeInspectorForm key={node.id} node={node} onClose={onClose} />;
};
