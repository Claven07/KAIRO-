import React, { useState } from 'react';
import { useAutomation } from '../../context/AutomationContext';
import {
  Sparkles,
  Paperclip,
  Mic,
  ArrowRight,
  Mail,
  BarChart3,
  FileSpreadsheet,
  Calendar,
  Check,
  Loader2,
  Zap,
  Brain,
  GitFork,
  Send,
  Cpu,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const CreateAutomationPage: React.FC = () => {
  const {
    startAIGeneration,
    isGenerating,
    generationStep,
    generationPrompt,
    showToast,
  } = useAutomation();

  const [promptText, setPromptText] = useState(
    'When an executive contract review arrives, analyze its priority, summarize key deliverables, and alert legal lead.'
  );
  const [isVoiceActive, setIsVoiceActive] = useState(false);
  const [selectedIntent, setSelectedIntent] = useState<'autonomous' | 'sandboxed' | 'verification'>('autonomous');

  const suggestions = [
    {
      id: 'email',
      icon: Mail,
      title: 'Smart Email & Contract Triage',
      category: 'COMMUNICATION',
      description: 'Filter high-priority inbound messages, extract deliverables, and dispatch executive brief.',
      prompt: 'When an executive contract review arrives, analyze its priority, summarize key deliverables, and alert legal lead.',
    },
    {
      id: 'reports',
      icon: BarChart3,
      title: 'Industrial Anomaly Sentinel',
      category: 'TELEMETRY',
      description: 'Correlate metric spikes across Datadog and internal logs, isolating root-cause anomalies.',
      prompt: 'When Datadog alerts a latency anomaly, correlate application traces, query Postgres logs, and notify on-call.',
    },
    {
      id: 'documents',
      icon: FileSpreadsheet,
      title: 'Confidential Invoice & Schema Parser',
      category: 'DOCUMENTS',
      description: 'Extract line items, tax IDs, and vendor payment milestones directly into internal ledger.',
      prompt: 'When an invoice PDF is uploaded to the secure vault, extract line items, tax IDs, and queue for ledger approval.',
    },
    {
      id: 'meetings',
      icon: Calendar,
      title: 'Strategic Action Item Extractor',
      category: 'PRODUCTIVITY',
      description: 'Transcribe meeting audio, detect task assignees, and dispatch Jira deliverables.',
      prompt: 'When a roadmap sync concludes, transcribe audio, extract actionable deliverables with due dates, and post to Jira.',
    },
  ];

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!promptText.trim()) return;
    startAIGeneration(promptText.trim());
  };

  const handleVoiceToggle = () => {
    if (!isVoiceActive) {
      setIsVoiceActive(true);
      showToast('Voice dictation active. Speak mission objective...', 'info');
      setTimeout(() => {
        setPromptText(
          'When an urgent incident alert triggers, evaluate severity, draft mitigation plan, and dispatch to on-call channel.'
        );
        setIsVoiceActive(false);
        showToast('Mission objective transcribed', 'success');
      }, 2000);
    } else {
      setIsVoiceActive(false);
    }
  };

  // The 7 requested execution timeline states
  const executionStages = [
    { step: 1, title: 'ROUTING', desc: 'Arbitrating between local reasoning and code specialists', node: 'Router' },
    { step: 2, title: 'PLANNING', desc: 'Synthesizing multi-step dependency graph & state checkpoints', node: 'Graph DAG' },
    { step: 3, title: 'RETRIEVING', desc: 'Resolving confidential schemas & local vector embeddings', node: 'Schema' },
    { step: 4, title: 'ANALYZING', desc: 'Evaluating branching criteria & decision threshold bounds', node: 'Logic' },
    { step: 5, title: 'EXECUTING', desc: 'Running sandboxed tool operations & API contracts', node: 'Tool Unit' },
  ];

  const miniNodes = [
    { id: 't1', icon: Zap, label: 'Ingress Stream', type: 'TRIGGER', activeAt: 2 },
    { id: 'i1', icon: Brain, label: 'Neural Router', type: 'ROUTER', activeAt: 3 },
    { id: 'd1', icon: GitFork, label: 'Decision Logic', type: 'DECISION', activeAt: 4 },
    { id: 'a1', icon: Send, label: 'Tool Dispatch', type: 'ACTION', activeAt: 5 },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 space-y-10 select-none">
      <AnimatePresence mode="wait">
        {!isGenerating ? (
          <motion.div
            key="composer"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
            className="space-y-8"
          >
            {/* Header: Clear Framing */}
            <div className="space-y-1.5 text-left">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono font-semibold text-[#1D4ED8] bg-blue-50 px-2 py-0.5 rounded border border-blue-200/60">
                  MISSION COMPOSER
                </span>
                <span className="text-xs font-mono text-slate-400">
                  ARASAKA // AGENTIC WORKSPACE
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#121316]">
                What do you need KAIRO to do?
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 max-w-xl leading-relaxed">
                State your operational mission in natural language. KAIRO will arbitrate model routing, 
                synthesize verifiable dependencies, and compile an autonomous execution graph.
              </p>
            </div>

            {/* Primary Mission Composer */}
            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="bg-white rounded-command border border-black/[0.08] shadow-subtle focus-within:border-[#1D4ED8] focus-within:shadow-command focus-within:ring-2 focus-within:ring-[#1D4ED8]/15 transition-all overflow-hidden text-left">
                {/* Mode Selector Header Bar */}
                <div className="px-5 py-2.5 bg-[#FAF9F7]/70 border-b border-black/[0.05] flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-mono font-medium text-slate-700 uppercase">
                      Execution Intent:
                    </span>
                    <div className="flex items-center gap-1 bg-black/[0.03] p-0.5 rounded border border-black/[0.05]">
                      <button
                        type="button"
                        onClick={() => setSelectedIntent('autonomous')}
                        className={`px-2 py-0.5 rounded text-[10px] font-mono transition-colors ${
                          selectedIntent === 'autonomous'
                            ? 'bg-white text-[#121316] font-semibold shadow-2xs'
                            : 'text-slate-500 hover:text-slate-800'
                        }`}
                      >
                        AUTONOMOUS
                      </button>
                      <button
                        type="button"
                        onClick={() => setSelectedIntent('sandboxed')}
                        className={`px-2 py-0.5 rounded text-[10px] font-mono transition-colors ${
                          selectedIntent === 'sandboxed'
                            ? 'bg-white text-[#121316] font-semibold shadow-2xs'
                            : 'text-slate-500 hover:text-slate-800'
                        }`}
                      >
                        AIR-GAPPED
                      </button>
                      <button
                        type="button"
                        onClick={() => setSelectedIntent('verification')}
                        className={`px-2 py-0.5 rounded text-[10px] font-mono transition-colors ${
                          selectedIntent === 'verification'
                            ? 'bg-white text-[#121316] font-semibold shadow-2xs'
                            : 'text-slate-500 hover:text-slate-800'
                        }`}
                      >
                        DUAL-VERIFIED
                      </button>
                    </div>
                  </div>

                  <span className="text-[10px] font-mono text-slate-400">
                    Sovereign Runtime // SIH26117
                  </span>
                </div>

                {/* Textarea Input */}
                <div className="p-5 pb-3">
                  <textarea
                    value={promptText}
                    onChange={e => setPromptText(e.target.value)}
                    rows={4}
                    placeholder="e.g. When a new customer agreement is uploaded, verify signatory credentials against our ERP database, extract key milestones, and dispatch briefing..."
                    className="w-full text-sm sm:text-base text-[#121316] placeholder:text-slate-400 bg-transparent resize-none outline-none leading-relaxed font-normal"
                    onKeyDown={e => {
                      if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
                        handleSubmit();
                      }
                    }}
                  />
                </div>

                {/* Action Footer Bar */}
                <div className="px-5 py-3 bg-[#FAF9F7]/80 border-t border-black/[0.05] flex items-center justify-between gap-4">
                  <div className="flex items-center gap-1.5 text-slate-500">
                    <button
                      type="button"
                      onClick={() => showToast('Schema upload ready for OpenAPI / JSON schemas', 'info')}
                      className="p-1.5 hover:text-[#121316] rounded-control hover:bg-black/[0.04] transition-colors pressable"
                      title="Attach schema specification or payload"
                    >
                      <Paperclip className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={handleVoiceToggle}
                      className={`p-1.5 rounded-control transition-colors pressable ${
                        isVoiceActive
                          ? 'text-red-600 bg-red-50 ring-1 ring-red-200 animate-pulse'
                          : 'hover:text-[#121316] hover:bg-black/[0.04]'
                      }`}
                      title="Voice dictation"
                    >
                      <Mic className="w-4 h-4" />
                    </button>
                    <span className="text-[10.5px] text-slate-400 font-mono ml-2 hidden sm:inline">
                      Press <kbd className="px-1.5 py-0.5 rounded bg-black/[0.04] border border-black/[0.06] font-mono text-[9.5px]">⌘</kbd> + <kbd className="px-1.5 py-0.5 rounded bg-black/[0.04] border border-black/[0.06] font-mono text-[9.5px]">↵</kbd> to compile
                    </span>
                  </div>

                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 px-4 py-2 text-xs font-medium text-white bg-[#121316] hover:bg-[#1D4ED8] rounded-control shadow-2xs transition-all pressable"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-indigo-300" />
                    <span>Compile Agentic Workflow</span>
                  </button>
                </div>
              </div>
            </form>

            {/* Model Routing Surface Preview */}
            <div className="p-4 bg-white rounded-card border border-black/[0.07] shadow-2xs text-left space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Cpu className="w-3.5 h-3.5 text-[#1D4ED8]" />
                  <span className="text-xs font-semibold text-[#121316]">
                    Autonomous Model Routing Matrix
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">
                    (分散知能)
                  </span>
                </div>
                <span className="text-[10px] font-mono text-emerald-600 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  ONLINE
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-4 gap-2.5 pt-1">
                <div className="p-2.5 rounded-control bg-[#FAF9F7] border border-black/[0.05] space-y-1">
                  <div className="flex items-center justify-between text-[10.5px] font-mono font-medium text-[#121316]">
                    <span>Router</span>
                    <span className="text-[#1D4ED8]">Core v2.4</span>
                  </div>
                  <p className="text-[10px] text-slate-500 leading-tight">
                    Dynamic task intent decomposition & DAG routing.
                  </p>
                </div>

                <div className="p-2.5 rounded-control bg-[#FAF9F7] border border-black/[0.05] space-y-1">
                  <div className="flex items-center justify-between text-[10.5px] font-mono font-medium text-[#121316]">
                    <span>Reasoning</span>
                    <span className="text-slate-500">Claude / Gemini</span>
                  </div>
                  <p className="text-[10px] text-slate-500 leading-tight">
                    Deep contract, policy & semantic logic extraction.
                  </p>
                </div>

                <div className="p-2.5 rounded-control bg-[#FAF9F7] border border-black/[0.05] space-y-1">
                  <div className="flex items-center justify-between text-[10.5px] font-mono font-medium text-[#121316]">
                    <span>Vision Unit</span>
                    <span className="text-slate-500">Local OCR</span>
                  </div>
                  <p className="text-[10px] text-slate-500 leading-tight">
                    Tabular PDFs, schematics, and UI element parsing.
                  </p>
                </div>

                <div className="p-2.5 rounded-control bg-[#FAF9F7] border border-black/[0.05] space-y-1">
                  <div className="flex items-center justify-between text-[10.5px] font-mono font-medium text-[#121316]">
                    <span>Sandbox Code</span>
                    <span className="text-slate-500">WASM / Py</span>
                  </div>
                  <p className="text-[10px] text-slate-500 leading-tight">
                    Deterministic math, database queries, and webhooks.
                  </p>
                </div>
              </div>
            </div>

            {/* Industrial Blueprint Suggestions */}
            <div className="space-y-3 pt-2 text-left">
              <div className="flex items-center justify-between text-xs text-slate-500 font-mono">
                <span className="font-semibold text-slate-700 uppercase tracking-wider text-[10.5px]">
                  Enterprise Blueprints
                </span>
                <span>Select to populate mission</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {suggestions.map(s => {
                  const Icon = s.icon;
                  return (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => setPromptText(s.prompt)}
                      className="group text-left p-3.5 bg-white rounded-card border border-black/[0.06] hover:border-black/[0.14] hover:shadow-subtle transition-all pressable"
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-7 h-7 rounded-control bg-[#FAF9F7] border border-black/[0.05] text-slate-600 group-hover:text-[#1D4ED8] group-hover:border-[#1D4ED8]/30 flex items-center justify-center shrink-0 transition-colors">
                          <Icon className="w-3.5 h-3.5" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center justify-between">
                            <span className="text-[9.5px] font-mono text-slate-400">
                              {s.category}
                            </span>
                            <ArrowRight className="w-3 h-3 text-slate-400 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                          </div>
                          <h4 className="text-xs font-semibold text-[#121316] group-hover:text-[#1D4ED8] transition-colors mt-0.5">
                            {s.title}
                          </h4>
                          <p className="text-[11px] text-slate-500 line-clamp-2 mt-1 leading-relaxed">
                            {s.description}
                          </p>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </motion.div>
        ) : (
          /* MULTI-STAGE SYNTHESIS EXPERIENCE: ROUTING -> PLANNING -> RETRIEVING -> ANALYZING -> EXECUTING */
          <motion.div
            key="synthesizer"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
            className="p-7 sm:p-9 bg-white rounded-card border border-black/[0.08] shadow-card text-left relative overflow-hidden"
          >
            <div className="space-y-7">
              {/* Header Telemetry */}
              <div className="text-center space-y-2">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-control text-xs font-mono font-medium bg-blue-50 text-[#1D4ED8] border border-blue-200/60">
                  <Sparkles className="w-3.5 h-3.5 animate-pulse" />
                  <span>SYNTHESIZING EXECUTION GRAPH</span>
                </div>
                <h3 className="text-xl font-bold tracking-tight text-[#121316]">
                  Compiling autonomous dependency DAG
                </h3>
                <p className="text-xs text-slate-500 max-w-lg mx-auto line-clamp-1 font-mono">
                  "{generationPrompt || promptText}"
                </p>
              </div>

              {/* Emerging Workflow Graph Preview */}
              <div className="p-4 bg-[#FAF9F7] rounded-card border border-black/[0.05]">
                <div className="text-[10px] font-mono uppercase tracking-wider text-slate-500 mb-3 text-center">
                  Live Runtime Assembly
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {miniNodes.map((n) => {
                    const NodeIcon = n.icon;
                    const isConstructed = generationStep >= n.activeAt;
                    const isCurrent = generationStep === n.activeAt - 1;

                    return (
                      <div
                        key={n.id}
                        className={`p-3 rounded-control border text-center transition-all ${
                          isConstructed
                            ? 'bg-white border-[#1D4ED8]/30 shadow-2xs'
                            : isCurrent
                            ? 'bg-white/80 border-[#1D4ED8] ring-2 ring-[#1D4ED8]/20 animate-pulse'
                            : 'bg-transparent border-dashed border-black/[0.08] opacity-35'
                        }`}
                      >
                        <div className="flex items-center justify-center mb-1.5">
                          <div
                            className={`w-7 h-7 rounded flex items-center justify-center ${
                              isConstructed
                                ? 'bg-blue-50 text-[#1D4ED8]'
                                : 'bg-black/[0.04] text-slate-400'
                            }`}
                          >
                            <NodeIcon className="w-3.5 h-3.5" />
                          </div>
                        </div>
                        <div className="text-[11px] font-semibold text-[#121316] truncate">
                          {n.label}
                        </div>
                        <div className="text-[9px] font-mono text-slate-500">
                          {n.type}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Multi-Stage Execution Steps */}
              <div className="space-y-2 max-w-md mx-auto">
                {executionStages.map((stage) => {
                  const isDone = generationStep > stage.step;
                  const isActive = generationStep === stage.step;

                  return (
                    <div
                      key={stage.step}
                      className={`flex items-center gap-3 px-3 py-2 rounded-control text-xs font-mono transition-colors ${
                        isActive
                          ? 'bg-blue-50 text-[#121316] border border-blue-200/60'
                          : isDone
                          ? 'text-slate-700 bg-slate-50/50'
                          : 'text-slate-400 opacity-60'
                      }`}
                    >
                      <div className="shrink-0">
                        {isDone ? (
                          <div className="w-4 h-4 rounded-full bg-emerald-500 text-white flex items-center justify-center">
                            <Check className="w-2.5 h-2.5" />
                          </div>
                        ) : isActive ? (
                          <Loader2 className="w-4 h-4 text-[#1D4ED8] animate-spin" />
                        ) : (
                          <div className="w-4 h-4 rounded-full border border-black/[0.15]" />
                        )}
                      </div>
                      <div className="flex-1 flex items-center justify-between min-w-0">
                        <span className={`truncate ${isActive ? 'font-semibold text-[#1D4ED8]' : ''}`}>
                          {stage.step}. {stage.title}
                        </span>
                        <span className="text-[10px] text-slate-400 ml-2">
                          {stage.node}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Status footer */}
              <div className="text-center pt-2 border-t border-black/[0.04]">
                <span className="text-[10.5px] text-slate-500 font-mono">
                  Compiling runtime AST · Validating local tool execution contracts...
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
