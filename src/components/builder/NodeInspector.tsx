import React, { useState, useEffect } from 'react';
import { useAutomation } from '../../context/AutomationContext';
import { WorkflowNode } from '../../types';
import {
  X,
  Sparkles,
  Mail,
  Zap,
  Bell,
  Cpu,
  Sliders,
  Check,
  Code2,
  Settings,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

interface NodeInspectorProps {
  node: WorkflowNode | null;
  onClose: () => void;
}

export const NodeInspector: React.FC<NodeInspectorProps> = ({ node, onClose }) => {
  const { updateNodeConfig, showToast } = useAutomation();

  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [model, setModel] = useState('Kairo Neural Engine v2.4');
  const [promptTemplate, setPromptTemplate] = useState('');
  const [temperature, setTemperature] = useState(0.2);
  const [actionChannel, setActionChannel] = useState('');
  const [recipients, setRecipients] = useState('');
  const [showAdvanced, setShowAdvanced] = useState(false);

  useEffect(() => {
    if (node) {
      setTitle(node.title);
      setSubtitle(node.subtitle);
      setModel(node.config.model || 'Kairo Neural Engine v2.4 (Fast Reasoning)');
      setPromptTemplate(node.config.promptTemplate || '');
      setTemperature(node.config.temperature ?? 0.2);
      setActionChannel(node.config.actionChannel || '');
      setRecipients(node.config.recipients || '');
    }
  }, [node]);

  if (!node) {
    return (
      <aside className="w-80 border-l border-black/[0.05] bg-[#FAF9F7] p-6 flex flex-col items-center justify-center text-center text-slate-400 select-none">
        <Sliders className="w-6 h-6 stroke-[1.5] text-slate-300 mb-2" />
        <p className="text-xs font-medium text-slate-600">No node selected</p>
        <p className="text-[11px] text-slate-400 mt-0.5">
          Select any workflow step to configure parameters.
        </p>
      </aside>
    );
  }

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
        return { label: 'Trigger', badge: 'text-blue-700 bg-blue-50 border-blue-200/60' };
      case 'AI_PROCESSING':
        return { label: 'Intelligence', badge: 'text-indigo-700 bg-indigo-50 border-indigo-200/60' };
      case 'LOGIC':
        return { label: 'Decision', badge: 'text-amber-700 bg-amber-50 border-amber-200/60' };
      case 'ACTION':
        return { label: 'Action', badge: 'text-emerald-700 bg-emerald-50 border-emerald-200/60' };
      default:
        return { label: 'Node', badge: 'text-slate-700 bg-slate-100 border-slate-200' };
    }
  };

  const meta = getTypeMeta();

  return (
    <aside className="w-80 border-l border-black/[0.05] bg-white flex flex-col h-full overflow-hidden shadow-card z-10 animate-in slide-in-from-right-3 duration-150 select-none">
      {/* Inspector Header */}
      <div className="h-12 px-4 border-b border-black/[0.05] flex items-center justify-between bg-[#FAF9F7]/70">
        <div className="flex items-center gap-2">
          <span
            className={`px-2 py-0.5 rounded text-[10px] font-medium border ${meta.badge}`}
          >
            {meta.label}
          </span>
          <span className="text-[10.5px] font-mono text-slate-400">ID: {node.id}</span>
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
            <label className="text-[11px] font-medium text-slate-500">
              Step title
            </label>
            <input
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
              className="w-full px-2.5 py-1.5 bg-white rounded-md border border-black/[0.08] text-[#18181B] font-medium focus:outline-none focus:border-[#2D44D8] focus:ring-2 focus:ring-[#2D44D8]/15 transition-all text-xs"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[11px] font-medium text-slate-500">
              Description & intent
            </label>
            <input
              type="text"
              value={subtitle}
              onChange={e => setSubtitle(e.target.value)}
              className="w-full px-2.5 py-1.5 bg-white rounded-md border border-black/[0.08] text-slate-700 focus:outline-none focus:border-[#2D44D8] focus:ring-2 focus:ring-[#2D44D8]/15 transition-all text-xs"
            />
          </div>
        </div>

        {/* Section 2: Type-specific Configuration */}
        {node.type === 'AI_PROCESSING' && (
          <div className="space-y-3 pt-3 border-t border-black/[0.04]">
            <div className="space-y-1">
              <label className="text-[11px] font-medium text-slate-500 flex items-center justify-between">
                <span>Inference engine</span>
                <Sparkles className="w-3 h-3 text-indigo-500" />
              </label>
              <select
                value={model}
                onChange={e => setModel(e.target.value)}
                className="w-full px-2.5 py-1.5 bg-white rounded-md border border-black/[0.08] text-slate-800 focus:outline-none focus:border-[#2D44D8] text-xs font-normal"
              >
                <option value="Kairo Neural Engine v2.4 (Fast Reasoning)">
                  Kairo Neural Engine v2.4 (Fast)
                </option>
                <option value="Gemini 1.5 Pro (Deep Context)">
                  Gemini 1.5 Pro (Deep Context)
                </option>
                <option value="Claude 3.5 Sonnet (Synthesizer)">
                  Claude 3.5 Sonnet (Synthesizer)
                </option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-medium text-slate-500">
                System instructions
              </label>
              <textarea
                value={promptTemplate}
                onChange={e => setPromptTemplate(e.target.value)}
                rows={3}
                className="w-full px-2.5 py-1.5 bg-white rounded-md border border-black/[0.08] text-slate-800 focus:outline-none focus:border-[#2D44D8] focus:ring-2 focus:ring-[#2D44D8]/15 text-xs leading-relaxed resize-none font-mono"
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-[11px] font-medium text-slate-500">
                <span>Temperature / Precision</span>
                <span className="font-mono text-slate-700">{temperature}</span>
              </div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={temperature}
                onChange={e => setTemperature(parseFloat(e.target.value))}
                className="w-full accent-[#2D44D8] h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>
          </div>
        )}

        {node.type === 'TRIGGER' && (
          <div className="space-y-3 pt-3 border-t border-black/[0.04]">
            <div className="space-y-1">
              <label className="text-[11px] font-medium text-slate-500">
                Event source
              </label>
              <input
                type="text"
                value={node.config.sourceApp || 'Google Workspace (Gmail)'}
                readOnly
                className="w-full px-2.5 py-1.5 bg-[#FAF9F7] rounded-md border border-black/[0.06] text-slate-600 font-mono text-xs"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[11px] font-medium text-slate-500">
                Filter criteria
              </label>
              <input
                type="text"
                value={promptTemplate}
                onChange={e => setPromptTemplate(e.target.value)}
                className="w-full px-2.5 py-1.5 bg-white rounded-md border border-black/[0.08] text-slate-800 font-mono text-xs focus:outline-none focus:border-[#2D44D8]"
              />
            </div>
          </div>
        )}

        {node.type === 'LOGIC' && (
          <div className="space-y-2 pt-3 border-t border-black/[0.04]">
            <label className="text-[11px] font-medium text-slate-500 block">
              Branching rules
            </label>
            <div className="space-y-1.5">
              {(node.config.decisionRules || []).map((rule, idx) => (
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
          <div className="space-y-3 pt-3 border-t border-black/[0.04]">
            <div className="space-y-1">
              <label className="text-[11px] font-medium text-slate-500">
                Dispatch channel
              </label>
              <input
                type="text"
                value={actionChannel}
                onChange={e => setActionChannel(e.target.value)}
                className="w-full px-2.5 py-1.5 bg-white rounded-md border border-black/[0.08] text-slate-800 text-xs font-medium focus:outline-none focus:border-[#2D44D8]"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[11px] font-medium text-slate-500">
                Target recipient / webhook
              </label>
              <input
                type="text"
                value={recipients}
                onChange={e => setRecipients(e.target.value)}
                className="w-full px-2.5 py-1.5 bg-white rounded-md border border-black/[0.08] text-slate-800 text-xs font-mono focus:outline-none focus:border-[#2D44D8]"
              />
            </div>
          </div>
        )}

        {/* Section 3: Progressive Disclosure (Advanced / Telemetry) */}
        <div className="pt-3 border-t border-black/[0.04]">
          <button
            type="button"
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="flex items-center justify-between w-full text-[11.5px] font-medium text-slate-600 hover:text-slate-900 py-1"
          >
            <span>Telemetry & Payload</span>
            {showAdvanced ? (
              <ChevronUp className="w-3.5 h-3.5 text-slate-400" />
            ) : (
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            )}
          </button>

          {showAdvanced && (
            <div className="mt-2 space-y-2 animate-in fade-in duration-100">
              {node.executionLatency && (
                <div className="flex items-center justify-between text-[11px] text-slate-500">
                  <span>Execution latency:</span>
                  <span className="font-mono text-emerald-600">{node.executionLatency}</span>
                </div>
              )}
              {node.executionOutput && (
                <div className="p-2.5 bg-[#FAF9F7] rounded-md border border-black/[0.05] text-[10.5px] font-mono text-slate-600 leading-relaxed break-words">
                  {node.executionOutput}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Inspector Footer */}
      <div className="p-3 border-t border-black/[0.05] bg-[#FAF9F7]/70 flex items-center justify-end gap-2">
        <button
          onClick={onClose}
          className="px-2.5 py-1 text-xs text-slate-600 hover:text-slate-900 rounded hover:bg-black/[0.04] transition-colors"
        >
          Cancel
        </button>
        <button
          onClick={handleSave}
          className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium text-white bg-[#18181B] hover:bg-[#2D44D8] rounded-md shadow-2xs transition-colors"
        >
          <Check className="w-3 h-3" />
          <span>Save Changes</span>
        </button>
      </div>
    </aside>
  );
};
