import React, { useState } from 'react';
import { useAutomation } from '../../context/AutomationContext';
import {
  Sparkles,
  Paperclip,
  Mic,
  ArrowRight,
  Mail,
  FileText,
  FileSpreadsheet,
  CheckCircle2,
  Clock,
  Play,
  Pause,
  ExternalLink,
  Zap,
  TrendingUp,
  Cpu,
  ChevronRight,
  CornerDownLeft,
  Command,
} from 'lucide-react';
import { motion } from 'framer-motion';

export const OverviewPage: React.FC = () => {
  const {
    automations,
    navigateTo,
    startAIGeneration,
    toggleAutomationStatus,
    metrics,
    showToast,
  } = useAutomation();

  const [promptText, setPromptText] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [isListening, setIsListening] = useState(false);

  const samplePrompts = [
    'When I receive an important email, analyze its priority, summarize it, and notify me.',
    'Every day at 6 PM, collect data across Stripe and GA4, then generate an executive report.',
    'When a document is uploaded to Google Drive, extract data and update our Notion database.',
  ];

  const handleGenerate = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const targetPrompt = promptText.trim() || samplePrompts[0];
    startAIGeneration(targetPrompt);
    navigateTo('create');
  };

  const handleVoiceToggle = () => {
    if (!isListening) {
      setIsListening(true);
      showToast('Voice input listening...', 'info');
      setTimeout(() => {
        setPromptText('When I receive an important email, analyze its priority, summarize it, and notify me.');
        setIsListening(false);
        showToast('Transcribed: "When I receive an important email, analyze its priority..."', 'success');
      }, 2000);
    } else {
      setIsListening(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-8 space-y-10">
      {/* 1. Header Greeting & Status */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-black/[0.04]">
        <div>
          <h1 className="text-2xl sm:text-[28px] font-semibold tracking-tight text-[#18181B]">
            Good evening, Omansh.
          </h1>
          <p className="text-[13px] text-slate-500 mt-1 flex items-center gap-2 font-normal">
            <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
            Everything is running smoothly across your {metrics.activeAutomations} automations.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => navigateTo('activity')}
            className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-slate-600 hover:text-slate-900 bg-white hover:bg-slate-50 rounded-md border border-black/[0.06] shadow-2xs transition-colors"
          >
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            <span>Audit Logs</span>
          </button>
          <button
            onClick={() => navigateTo('analytics')}
            className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-slate-600 hover:text-slate-900 bg-white hover:bg-slate-50 rounded-md border border-black/[0.06] shadow-2xs transition-colors"
          >
            <TrendingUp className="w-3.5 h-3.5 text-slate-400" />
            <span>Performance</span>
          </button>
        </div>
      </div>

      {/* 2. PRIMARY AI COMMAND SURFACE (Spotlight / Raycast / Editor feel) */}
      <div className="space-y-3">
        <div
          className={`relative bg-white rounded-command border transition-all duration-200 ${
            isFocused
              ? 'border-[#2D44D8] shadow-command ring-4 ring-indigo-500/8'
              : 'border-black/[0.08] shadow-subtle hover:border-black/[0.14]'
          }`}
        >
          {/* Subtle top indicator */}
          <div className="px-5 pt-4 pb-1 flex items-center justify-between border-b border-black/[0.03]">
            <div className="flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-[#2D44D8]" />
              <span className="text-[12px] font-medium text-slate-500">
                Command Surface
              </span>
            </div>
            <div className="flex items-center gap-2 text-[11px] text-slate-400 font-mono">
              <span>Natural Language → Workflow</span>
            </div>
          </div>

          <form onSubmit={handleGenerate} className="p-5">
            <h2 className="text-base font-semibold text-[#18181B] mb-2 tracking-tight">
              What would you like to automate?
            </h2>
            <textarea
              value={promptText}
              onChange={e => setPromptText(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              rows={3}
              placeholder="e.g. When I receive an important email, analyze its priority, summarize it, and notify me on Slack..."
              className="w-full bg-transparent text-[14px] text-[#18181B] placeholder:text-slate-400 resize-none outline-none leading-relaxed font-normal"
              onKeyDown={e => {
                if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
                  handleGenerate();
                }
              }}
            />

            {/* Bottom Controls Bar */}
            <div className="flex items-center justify-between pt-3 border-t border-black/[0.04] mt-2">
              <div className="flex items-center gap-1.5 text-slate-400">
                <button
                  type="button"
                  onClick={() => showToast('Schema upload ready for OpenAPI / JSON schemas', 'info')}
                  className="p-1.5 hover:text-slate-700 rounded hover:bg-black/[0.03] transition-colors"
                  title="Attach API schema or document"
                >
                  <Paperclip className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={handleVoiceToggle}
                  className={`p-1.5 rounded transition-colors ${
                    isListening
                      ? 'text-red-600 bg-red-50 ring-1 ring-red-200 animate-pulse'
                      : 'hover:text-slate-700 hover:bg-black/[0.03]'
                  }`}
                  title="Dictate with voice"
                >
                  <Mic className="w-3.5 h-3.5" />
                </button>
                {promptText.length > 0 && (
                  <span className="text-[11px] text-slate-400 font-mono ml-2">
                    {promptText.length} chars
                  </span>
                )}
              </div>

              <div className="flex items-center gap-3">
                <span className="hidden sm:inline text-[11px] text-slate-400 font-mono">
                  ⌘ + Enter
                </span>
                <button
                  type="submit"
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium text-white bg-[#18181B] hover:bg-[#2D44D8] rounded-md shadow-2xs transition-all active:scale-[0.98]"
                >
                  <span>Synthesize Workflow</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* Typing / Contextual Prompt Suggestions */}
        <div className="flex flex-wrap items-center gap-2 pt-1 px-1">
          <span className="text-[11.5px] text-slate-400 font-medium">Suggestions:</span>
          {samplePrompts.map((sample, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setPromptText(sample)}
              className="text-[11.5px] text-slate-600 hover:text-slate-900 bg-white hover:bg-slate-50 px-2.5 py-1 rounded-md border border-black/[0.06] shadow-2xs transition-colors truncate max-w-sm text-left"
              title={sample}
            >
              {sample.length > 46 ? sample.substring(0, 46) + '...' : sample}
            </button>
          ))}
        </div>
      </div>

      {/* 3. AUTOMATION METRICS: Refined information strip (no giant cards!) */}
      <div className="py-5 px-1 border-y border-black/[0.04]">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 items-baseline">
          <div>
            <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider block mb-1">
              Active listeners
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-semibold tracking-tight text-[#18181B] font-mono">
                {metrics.activeAutomations}
              </span>
              <span className="text-xs text-emerald-600 font-medium">running</span>
            </div>
            <p className="text-[11.5px] text-slate-400 mt-0.5">100% cloud uptime</p>
          </div>

          <div>
            <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider block mb-1">
              Executions
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-semibold tracking-tight text-[#18181B] font-mono">
                {metrics.tasksCompleted.toLocaleString()}
              </span>
              <span className="text-xs text-slate-500 font-normal">completed</span>
            </div>
            <p className="text-[11.5px] text-emerald-600 mt-0.5">+14% this week</p>
          </div>

          <div>
            <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider block mb-1">
              Time Saved
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-semibold tracking-tight text-[#18181B] font-mono">
                {metrics.timeSaved}
              </span>
              <span className="text-xs text-slate-500 font-normal">saved</span>
            </div>
            <p className="text-[11.5px] text-slate-400 mt-0.5">~5.4 hrs/employee</p>
          </div>

          <div>
            <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider block mb-1">
              Success Rate
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-semibold tracking-tight text-[#18181B] font-mono">
                {metrics.successRate}
              </span>
              <span className="text-xs text-emerald-600 font-medium">success</span>
            </div>
            <p className="text-[11.5px] text-slate-400 mt-0.5">Zero unhandled errors</p>
          </div>
        </div>
      </div>

      {/* 4. RECENT AUTOMATIONS: Elegant Workflow Rows (generous whitespace, no excessive card rounding) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between pb-1">
          <div>
            <h3 className="text-sm font-semibold tracking-tight text-[#18181B]">
              Recent automations
            </h3>
            <p className="text-xs text-slate-400">
              Workflows actively monitoring triggers and evaluating logic
            </p>
          </div>
          <button
            onClick={() => navigateTo('automations')}
            className="text-xs font-medium text-[#2D44D8] hover:underline inline-flex items-center gap-1"
          >
            <span>View all {automations.length} automations</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Clean list with hairline dividers */}
        <div className="bg-white rounded-card border border-black/[0.06] shadow-2xs divide-y divide-black/[0.04] overflow-hidden">
          {automations.slice(0, 4).map(auto => {
            const isActive = auto.status === 'active';
            return (
              <div
                key={auto.id}
                className="p-4 sm:px-5 sm:py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-[#FAF9F7]/60 transition-colors group"
              >
                {/* Left: Icon & Meta */}
                <div
                  className="flex items-center gap-3.5 cursor-pointer flex-1 min-w-0"
                  onClick={() => navigateTo('builder')}
                >
                  <div
                    className={`w-8 h-8 rounded-md flex items-center justify-center shrink-0 border ${
                      isActive
                        ? 'bg-blue-50/60 text-[#2D44D8] border-blue-100'
                        : 'bg-slate-100/70 text-slate-500 border-black/[0.05]'
                    }`}
                  >
                    {auto.icon === 'Mail' && <Mail className="w-4 h-4" />}
                    {auto.icon === 'FileText' && <FileText className="w-4 h-4" />}
                    {auto.icon === 'FileSpreadsheet' && <FileSpreadsheet className="w-4 h-4" />}
                    {auto.icon !== 'Mail' && auto.icon !== 'FileText' && auto.icon !== 'FileSpreadsheet' && (
                      <Zap className="w-4 h-4" />
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[13.5px] font-semibold text-[#18181B] group-hover:text-[#2D44D8] transition-colors truncate">
                        {auto.title}
                      </span>
                      <span
                        className={`inline-flex items-center gap-1 px-1.5 py-0.2 rounded text-[10px] font-medium tracking-tight ${
                          isActive
                            ? 'bg-emerald-50 text-emerald-700'
                            : 'bg-amber-50 text-amber-700'
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            isActive ? 'bg-emerald-500' : 'bg-amber-500'
                          }`}
                        />
                        {isActive ? 'Active' : 'Paused'}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 truncate mt-0.5">
                      {auto.description}
                    </p>
                  </div>
                </div>

                {/* Right: Last run & Actions */}
                <div className="flex items-center justify-between sm:justify-end gap-5 text-xs shrink-0 pl-11 sm:pl-0">
                  <div className="text-left sm:text-right">
                    <span className="text-slate-400 text-[10.5px] block font-mono">Last run</span>
                    <span className="font-medium text-slate-700 text-[12px]">{auto.lastRun}</span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => toggleAutomationStatus(auto.id)}
                      className={`p-1.5 rounded border transition-colors ${
                        isActive
                          ? 'border-amber-200/80 text-amber-700 hover:bg-amber-50'
                          : 'border-emerald-200/80 text-emerald-700 hover:bg-emerald-50'
                      }`}
                      title={isActive ? 'Pause' : 'Resume'}
                    >
                      {isActive ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
                    </button>
                    <button
                      onClick={() => navigateTo('builder')}
                      className="px-2.5 py-1 text-xs font-medium text-slate-700 bg-white hover:bg-slate-100 rounded-md border border-black/[0.08] shadow-2xs transition-colors"
                      title="Open in Workflow Canvas"
                    >
                      Open Canvas
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
