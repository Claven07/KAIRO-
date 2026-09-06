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
      showToast('Voice input activated. Speak your workflow...', 'info');
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
    <div className="max-w-6xl mx-auto px-6 py-8 space-y-10">
      {/* Header Greeting */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
            Good evening, Omansh.
          </h2>
          <p className="text-sm text-slate-600 mt-1 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-pulse" />
            Everything is running smoothly across your 12 automations.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => navigateTo('activity')}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-white hover:bg-slate-50 rounded-control border border-black/[0.08] shadow-subtle transition-colors"
          >
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            <span>Audit Logs</span>
          </button>
          <button
            onClick={() => navigateTo('analytics')}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-white hover:bg-slate-50 rounded-control border border-black/[0.08] shadow-subtle transition-colors"
          >
            <TrendingUp className="w-3.5 h-3.5 text-slate-400" />
            <span>Performance</span>
          </button>
        </div>
      </div>

      {/* PRIMARY AI COMMAND PANEL */}
      <div className="bg-white rounded-panel border border-black/[0.08] p-6 sm:p-8 shadow-command relative overflow-hidden">
        {/* Subtle decorative glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-indigo-50/70 via-transparent to-transparent pointer-events-none rounded-full blur-2xl" />

        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-indigo-50 text-indigo-700 border border-indigo-100 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
            <span>AI Automation Architect</span>
          </div>

          <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
            What would you like to automate?
          </h3>
          <p className="text-sm text-slate-600 mt-1">
            Describe your workflow in natural language. Kairo will handle the rest.
          </p>

          <form onSubmit={handleGenerate} className="mt-6">
            <div className="bg-[#FAFBFD] rounded-card border border-black/[0.1] focus-within:border-[#2547D0] focus-within:ring-2 focus-within:ring-indigo-500/15 transition-all p-3 shadow-subtle">
              <textarea
                value={promptText}
                onChange={e => setPromptText(e.target.value)}
                rows={3}
                placeholder="e.g. When I receive an important email, analyze its priority, summarize it, and notify me on Slack."
                className="w-full bg-transparent text-sm text-slate-900 placeholder:text-slate-400 resize-none outline-none leading-relaxed"
                onKeyDown={e => {
                  if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
                    handleGenerate();
                  }
                }}
              />

              <div className="flex items-center justify-between pt-2 border-t border-black/[0.04] mt-1">
                <div className="flex items-center gap-1 text-slate-400">
                  <button
                    type="button"
                    onClick={() => showToast('Attachment capability ready for schemas and documents', 'info')}
                    className="p-1.5 hover:text-slate-700 rounded-control hover:bg-slate-200/50 transition-colors"
                    title="Attach schema or API doc"
                  >
                    <Paperclip className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={handleVoiceToggle}
                    className={`p-1.5 rounded-control transition-colors ${
                      isListening
                        ? 'text-red-600 bg-red-50 ring-1 ring-red-200 animate-pulse'
                        : 'hover:text-slate-700 hover:bg-slate-200/50'
                    }`}
                    title="Dictate with voice"
                  >
                    <Mic className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <span className="hidden sm:inline text-[11px] text-slate-600 font-mono">
                    ⌘ + Enter
                  </span>
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-[#2547D0] hover:bg-[#1D3BB5] rounded-control shadow-xs transition-all active:scale-[0.98]"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Generate Workflow</span>
                  </button>
                </div>
              </div>
            </div>
          </form>

          {/* Prompt Suggestion Chips */}
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <span className="text-xs text-slate-600 font-medium">Try asking:</span>
            {samplePrompts.map((sample, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setPromptText(sample)}
                className="text-xs text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200/80 px-2.5 py-1 rounded-full border border-black/[0.04] transition-colors truncate max-w-xs text-left"
                title={sample}
              >
                "{sample.length > 38 ? sample.substring(0, 38) + '...' : sample}"
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* SYSTEM OVERVIEW (Elegant horizontal layout without bloated cards) */}
      <div className="bg-white rounded-card border border-black/[0.07] p-6 shadow-subtle">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 divide-y sm:divide-y-0 sm:divide-x divide-black/[0.06]">
          <div className="pt-2 sm:pt-0 sm:px-4 first:pl-0">
            <span className="text-xs font-medium text-slate-600 uppercase tracking-wider">
              Running Automations
            </span>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-3xl font-bold tracking-tight text-slate-900">
                {metrics.activeAutomations}
              </span>
              <span className="text-xs text-emerald-600 font-medium">Active</span>
            </div>
            <p className="text-[11px] text-slate-600 mt-1">100% cloud uptime</p>
          </div>

          <div className="pt-4 sm:pt-0 sm:px-4">
            <span className="text-xs font-medium text-slate-600 uppercase tracking-wider">
              Tasks Completed
            </span>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-3xl font-bold tracking-tight text-slate-900">
                {metrics.tasksCompleted.toLocaleString()}
              </span>
              <span className="text-xs text-emerald-600 font-medium">+14% this wk</span>
            </div>
            <p className="text-[11px] text-slate-600 mt-1">Autonomous executions</p>
          </div>

          <div className="pt-4 sm:pt-0 sm:px-4">
            <span className="text-xs font-medium text-slate-600 uppercase tracking-wider">
              Time Saved
            </span>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-3xl font-bold tracking-tight text-slate-900">
                {metrics.timeSaved}
              </span>
              <span className="text-xs text-blue-600 font-medium">Estimated</span>
            </div>
            <p className="text-[11px] text-slate-600 mt-1">~5.4 hrs/employee</p>
          </div>

          <div className="pt-4 sm:pt-0 sm:px-4">
            <span className="text-xs font-medium text-slate-600 uppercase tracking-wider">
              Success Rate
            </span>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-3xl font-bold tracking-tight text-slate-900">
                {metrics.successRate}
              </span>
              <span className="text-xs text-emerald-600 font-medium">Exceptional</span>
            </div>
            <p className="text-[11px] text-slate-600 mt-1">Zero unhandled breaks</p>
          </div>
        </div>
      </div>

      {/* RECENT AUTOMATIONS */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold tracking-tight text-slate-900">
              Recent automations
            </h3>
            <p className="text-xs text-slate-600">
              Workflows actively monitoring triggers and processing inputs
            </p>
          </div>
          <button
            onClick={() => navigateTo('automations')}
            className="text-xs font-medium text-[#2547D0] hover:underline inline-flex items-center gap-1"
          >
            <span>View all automations</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="bg-white rounded-card border border-black/[0.07] divide-y divide-black/[0.05] shadow-subtle overflow-hidden">
          {automations.slice(0, 4).map(auto => {
            const isActive = auto.status === 'active';
            return (
              <div
                key={auto.id}
                className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50/70 transition-colors group"
              >
                <div
                  className="flex items-start gap-4 cursor-pointer flex-1"
                  onClick={() => navigateTo('builder')}
                >
                  <div
                    className={`w-10 h-10 rounded-control flex items-center justify-center shrink-0 border ${
                      isActive
                        ? 'bg-blue-50/70 text-[#2547D0] border-blue-100'
                        : 'bg-slate-100 text-slate-500 border-slate-200'
                    }`}
                  >
                    {auto.icon === 'Mail' && <Mail className="w-5 h-5" />}
                    {auto.icon === 'FileText' && <FileText className="w-5 h-5" />}
                    {auto.icon === 'FileSpreadsheet' && <FileSpreadsheet className="w-5 h-5" />}
                    {auto.icon !== 'Mail' && auto.icon !== 'FileText' && auto.icon !== 'FileSpreadsheet' && (
                      <Zap className="w-5 h-5" />
                    )}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2.5">
                      <h4 className="text-sm font-semibold text-slate-900 group-hover:text-[#2547D0] transition-colors">
                        {auto.title}
                      </h4>
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold tracking-wider uppercase ${
                          isActive
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200/60'
                            : 'bg-amber-50 text-amber-700 border border-amber-200/60'
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            isActive ? 'bg-emerald-500' : 'bg-amber-500'
                          }`}
                        />
                        {isActive ? 'ACTIVE' : 'PAUSED'}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 mt-1 line-clamp-1">
                      {auto.description}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-4 text-xs shrink-0 pl-14 sm:pl-0">
                  <div className="text-left sm:text-right">
                    <div className="text-slate-600 text-[11px]">Last run</div>
                    <div className="font-medium text-slate-700">{auto.lastRun}</div>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => toggleAutomationStatus(auto.id)}
                      className={`p-1.5 rounded-control border transition-colors ${
                        isActive
                          ? 'border-amber-200 text-amber-700 hover:bg-amber-50'
                          : 'border-emerald-200 text-emerald-700 hover:bg-emerald-50'
                      }`}
                      title={isActive ? 'Pause Automation' : 'Resume Automation'}
                    >
                      {isActive ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                    </button>
                    <button
                      onClick={() => navigateTo('builder')}
                      className="px-2.5 py-1.5 text-xs font-medium text-slate-700 bg-white hover:bg-slate-100 rounded-control border border-black/[0.08] transition-colors"
                      title="Open in Builder"
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
