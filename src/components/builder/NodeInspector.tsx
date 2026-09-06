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
  HelpCircle,
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
      <aside className="w-80 border-l border-black/[0.07] bg-[#FDFDFE] p-6 flex flex-col items-center justify-center text-center text-slate-400">
        <Sliders className="w-8 h-8 stroke-1 text-slate-300 mb-3" />
        <p className="text-xs font-medium text-slate-600">No node selected</p>
        <p className="text-[11px] text-slate-400 mt-1">
          Click on any node in the canvas to inspect and configure its parameters.
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
    showToast(`Updated node: ${title}`, 'success');
  };

  const getTypeColor = () => {
    switch (node.type) {
      case 'TRIGGER':
        return 'text-blue-700 bg-blue-50 border-blue-200/70';
      case 'AI_PROCESSING':
        return 'text-indigo-700 bg-indigo-50 border-indigo-200/70';
      case 'LOGIC':
        return 'text-amber-700 bg-amber-50 border-amber-200/70';
      case 'ACTION':
        return 'text-emerald-700 bg-emerald-50 border-emerald-200/70';
    }
  };

  return (
    <aside className="w-88 border-l border-black/[0.07] bg-[#FFFFFF] flex flex-col h-full overflow-hidden shadow-card z-10 animate-in slide-in-from-right-4 duration-200">
      {/* Inspector Header */}
      <div className="p-4 border-b border-black/[0.06] flex items-center justify-between bg-[#FAFBFD]">
        <div className="flex items-center gap-2">
          <span
            className={`px-2 py-0.5 rounded-full text-[10px] font-semibold tracking-wider uppercase border ${getTypeColor()}`}
          >
            {node.type.replace('_', ' ')}
          </span>
          <span className="text-xs font-mono text-slate-400">ID: {node.id}</span>
        </div>
        <button
          onClick={onClose}
          className="p-1 rounded-control text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          title="Close Inspector"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Inspector Body */}
      <div className="flex-1 overflow-y-auto p-5 space-y-5 text-left text-xs">
        {/* Node Name */}
        <div className="space-y-1.5">
          <label className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
            Node Label
          </label>
          <input
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            className="w-full px-3 py-2 bg-[#F8F9FA] rounded-control border border-black/[0.08] text-slate-900 font-medium focus:outline-none focus:border-[#2547D0] focus:bg-white transition-all text-xs"
          />
        </div>

        {/* Node Subtitle */}
        <div className="space-y-1.5">
          <label className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
            Description / Purpose
          </label>
          <input
            type="text"
            value={subtitle}
            onChange={e => setSubtitle(e.target.value)}
            className="w-full px-3 py-2 bg-[#F8F9FA] rounded-control border border-black/[0.08] text-slate-700 focus:outline-none focus:border-[#2547D0] focus:bg-white transition-all text-xs"
          />
        </div>

        {/* AI Processing Settings */}
        {node.type === 'AI_PROCESSING' && (
          <div className="space-y-4 pt-2 border-t border-black/[0.05]">
            <div className="space-y-1.5">
              <label className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider flex items-center justify-between">
                <span>Inference Engine</span>
                <Sparkles className="w-3 h-3 text-indigo-600" />
              </label>
              <select
                value={model}
                onChange={e => setModel(e.target.value)}
                className="w-full px-3 py-2 bg-[#F8F9FA] rounded-control border border-black/[0.08] text-slate-800 focus:outline-none focus:border-[#2547D0] text-xs font-medium"
              >
                <option value="Kairo Neural Engine v2.4 (Fast Reasoning)">
                  Kairo Neural Engine v2.4 (Fast Reasoning)
                </option>
                <option value="Gemini 1.5 Pro (Deep Context)">
                  Gemini 1.5 Pro (Deep Context)
                </option>
                <option value="Claude 3.5 Sonnet (Synthesizer)">
                  Claude 3.5 Sonnet (Synthesizer)
                </option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                System Prompt Instructions
              </label>
              <textarea
                value={promptTemplate}
                onChange={e => setPromptTemplate(e.target.value)}
                rows={3}
                className="w-full px-3 py-2 bg-[#F8F9FA] rounded-control border border-black/[0.08] text-slate-800 focus:outline-none focus:border-[#2547D0] focus:bg-white text-xs leading-relaxed resize-none"
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                <span>Creativity & Precision (Temp)</span>
                <span className="font-mono text-slate-700">{temperature}</span>
              </div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={temperature}
                onChange={e => setTemperature(parseFloat(e.target.value))}
                className="w-full accent-[#2547D0]"
              />
            </div>
          </div>
        )}

        {/* Trigger Configuration */}
        {node.type === 'TRIGGER' && (
          <div className="space-y-4 pt-2 border-t border-black/[0.05]">
            <div className="space-y-1.5">
              <label className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                Event Source
              </label>
              <input
                type="text"
                value={node.config.sourceApp || 'Google Workspace (Gmail)'}
                readOnly
                className="w-full px-3 py-2 bg-[#F8F9FA] rounded-control border border-black/[0.08] text-slate-700 font-mono text-xs"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                Filter Expression
              </label>
              <input
                type="text"
                value={promptTemplate}
                onChange={e => setPromptTemplate(e.target.value)}
                className="w-full px-3 py-2 bg-[#F8F9FA] rounded-control border border-black/[0.08] text-slate-800 font-mono text-xs"
              />
            </div>
          </div>
        )}

        {/* Logic Rules */}
        {node.type === 'LOGIC' && (
          <div className="space-y-3 pt-2 border-t border-black/[0.05]">
            <label className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
              Branching Rules
            </label>
            <div className="space-y-2">
              {(node.config.decisionRules || []).map((rule, idx) => (
                <div
                  key={idx}
                  className="p-2.5 bg-[#F8F9FA] rounded-control border border-black/[0.05] text-[11px] text-slate-700 font-mono"
                >
                  {rule}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Action Dispatch */}
        {node.type === 'ACTION' && (
          <div className="space-y-4 pt-2 border-t border-black/[0.05]">
            <div className="space-y-1.5">
              <label className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                Dispatch Destination
              </label>
              <input
                type="text"
                value={actionChannel}
                onChange={e => setActionChannel(e.target.value)}
                className="w-full px-3 py-2 bg-[#F8F9FA] rounded-control border border-black/[0.08] text-slate-800 text-xs font-medium"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                Target Recipient / Webhook
              </label>
              <input
                type="text"
                value={recipients}
                onChange={e => setRecipients(e.target.value)}
                className="w-full px-3 py-2 bg-[#F8F9FA] rounded-control border border-black/[0.08] text-slate-800 text-xs font-mono"
              />
            </div>
          </div>
        )}

        {/* Simulation Output Preview */}
        {node.executionOutput && (
          <div className="pt-2 border-t border-black/[0.05] space-y-1.5">
            <div className="flex items-center justify-between text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
              <span>Test Output Payload</span>
              {node.executionLatency && (
                <span className="font-mono text-emerald-600 lowercase">
                  {node.executionLatency}
                </span>
              )}
            </div>
            <div className="p-3 bg-[#FAFBFD] rounded-control border border-black/[0.06] text-[11px] font-mono text-slate-700 leading-relaxed break-words">
              {node.executionOutput}
            </div>
          </div>
        )}
      </div>

      {/* Inspector Footer */}
      <div className="p-4 border-t border-black/[0.06] bg-[#FAFBFD] flex items-center justify-end gap-2">
        <button
          onClick={onClose}
          className="px-3 py-1.5 text-xs text-slate-600 hover:text-slate-900 rounded-control hover:bg-slate-100 transition-colors"
        >
          Cancel
        </button>
        <button
          onClick={handleSave}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-[#2547D0] hover:bg-[#1D3BB5] rounded-control shadow-xs transition-colors"
        >
          <Check className="w-3.5 h-3.5" />
          <span>Save Changes</span>
        </button>
      </div>
    </aside>
  );
};
