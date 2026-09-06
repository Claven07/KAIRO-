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
  CheckCircle2,
  Loader2,
  Layers,
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
    'When I receive an important email, analyze its priority, summarize it, and notify me.'
  );
  const [isVoiceActive, setIsVoiceActive] = useState(false);

  const suggestions = [
    {
      id: 'email',
      icon: Mail,
      title: 'Smart Email Assistant',
      description: 'Filter high-priority emails, generate summaries, and notify Slack',
      prompt: 'When I receive an important email, analyze its priority, summarize it, and notify me.',
    },
    {
      id: 'reports',
      icon: BarChart3,
      title: 'Automated Reports',
      description: 'Synthesize Stripe revenue, GA4 web analytics into daily leadership briefing',
      prompt: 'Every day at 6 PM, collect data across Stripe and GA4, then generate an executive report.',
    },
    {
      id: 'documents',
      icon: FileSpreadsheet,
      title: 'Document Intelligence',
      description: 'Extract tables, invoice details, and vendor dates directly from PDFs',
      prompt: 'When a new invoice PDF is added to Drive, extract vendor, total, line items, and route to finance.',
    },
    {
      id: 'meetings',
      icon: Calendar,
      title: 'Meeting Intelligence',
      description: 'Transcribe recordings, detect action points, and assign Linear tickets',
      prompt: 'When a Zoom meeting concludes, transcribe the recording, extract deliverables, and post tasks to Linear.',
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
      showToast('Voice dictation active. Speak clearly...', 'info');
      setTimeout(() => {
        setPromptText(
          'When I receive an important email, analyze its priority, summarize it, and notify me.'
        );
        setIsVoiceActive(false);
        showToast('Voice input processed successfully', 'success');
      }, 2200);
    } else {
      setIsVoiceActive(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 space-y-12">
      <AnimatePresence mode="wait">
        {!isGenerating ? (
          <motion.div
            key="input-form"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="space-y-10"
          >
            {/* Headline */}
            <div className="text-center space-y-3 max-w-2xl mx-auto">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-indigo-50 text-indigo-700 border border-indigo-100">
                <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                <span>Natural Language Workflow Engine</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
                Describe what you want to automate.
              </h2>
              <p className="text-sm sm:text-base text-slate-600">
                Kairo understands your intent and designs the workflow for you.
              </p>
            </div>

            {/* Main AI Input Interface */}
            <form onSubmit={handleSubmit} className="relative">
              <div className="bg-white rounded-panel border border-black/[0.09] shadow-command p-4 sm:p-6 focus-within:border-[#2547D0] focus-within:ring-4 focus-within:ring-indigo-500/10 transition-all">
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                  Automation Intent
                </label>
                <textarea
                  value={promptText}
                  onChange={e => setPromptText(e.target.value)}
                  rows={4}
                  placeholder="Describe your automation in plain language (e.g. When I receive an important email, analyze its priority, summarize it, and notify me.)"
                  className="w-full text-base text-slate-900 placeholder:text-slate-400 bg-transparent resize-none outline-none leading-relaxed"
                  onKeyDown={e => {
                    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
                      handleSubmit();
                    }
                  }}
                />

                <div className="pt-4 mt-2 border-t border-black/[0.05] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-1 text-slate-500">
                    <button
                      type="button"
                      onClick={() => showToast('Attachment options loaded', 'info')}
                      className="p-2 hover:text-slate-800 rounded-control hover:bg-slate-100 transition-colors"
                      title="Attach documents or data schemas"
                    >
                      <Paperclip className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={handleVoiceToggle}
                      className={`p-2 rounded-control transition-colors ${
                        isVoiceActive
                          ? 'text-red-600 bg-red-50 ring-1 ring-red-200 animate-pulse'
                          : 'hover:text-slate-800 hover:bg-slate-100'
                      }`}
                      title="Dictate prompt with voice"
                    >
                      <Mic className="w-4 h-4" />
                    </button>
                    <span className="text-xs text-slate-400 ml-2 hidden sm:inline">
                      Press ⌘ + Enter to generate
                    </span>
                  </div>

                  <button
                    type="submit"
                    className="inline-flex items-center justify-center gap-2 px-6 py-2.5 text-sm font-semibold text-white bg-[#2547D0] hover:bg-[#1D3BB5] rounded-control shadow-sm transition-all active:scale-[0.98]"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>Generate Workflow</span>
                  </button>
                </div>
              </div>
            </form>

            {/* Example Suggestions */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Example Suggestions
                </span>
                <span className="text-xs text-slate-400">Click to populate prompt</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {suggestions.map(s => {
                  const Icon = s.icon;
                  return (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => setPromptText(s.prompt)}
                      className="text-left p-4 bg-white rounded-card border border-black/[0.07] hover:border-indigo-300 hover:shadow-subtle transition-all group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-control bg-slate-100 group-hover:bg-indigo-50 text-slate-600 group-hover:text-[#2547D0] flex items-center justify-center shrink-0 transition-colors">
                          <Icon className="w-4 h-4" />
                        </div>
                        <div className="min-w-0">
                          <h4 className="text-sm font-semibold text-slate-900 group-hover:text-[#2547D0] transition-colors">
                            {s.title}
                          </h4>
                          <p className="text-xs text-slate-500 truncate mt-0.5">
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
          /* PREMIUM AI PROCESSING EXPERIENCE */
          <motion.div
            key="processing-view"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.4 }}
            className="p-8 sm:p-12 bg-white rounded-panel border border-black/[0.08] shadow-command relative overflow-hidden text-center max-w-2xl mx-auto"
          >
            {/* Subtle glow background */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-40 bg-indigo-100/50 blur-3xl rounded-full pointer-events-none" />

            <div className="relative z-10 space-y-6">
              {/* Spinner/Icon badge */}
              <div className="w-12 h-12 rounded-panel bg-indigo-50 border border-indigo-200/80 text-[#2547D0] flex items-center justify-center mx-auto shadow-subtle">
                <Sparkles className="w-6 h-6 animate-pulse" />
              </div>

              <div>
                <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
                  Kairo is designing your workflow
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 mt-1.5 font-mono max-w-md mx-auto line-clamp-1">
                  "{generationPrompt || promptText}"
                </p>
              </div>

              {/* Step by step checklist */}
              <div className="w-full max-w-md mx-auto bg-[#FAFBFD] rounded-card border border-black/[0.06] p-5 text-left space-y-3.5">
                {/* Step 1 */}
                <div className="flex items-center gap-3 text-xs sm:text-sm">
                  {generationStep >= 1 ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  ) : (
                    <div className="w-4 h-4 rounded-full border border-slate-300 shrink-0" />
                  )}
                  <span
                    className={
                      generationStep >= 1
                        ? 'font-medium text-slate-800'
                        : 'text-slate-400'
                    }
                  >
                    Understanding your objective
                  </span>
                </div>

                {/* Step 2 */}
                <div className="flex items-center gap-3 text-xs sm:text-sm">
                  {generationStep >= 2 ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  ) : generationStep === 1 ? (
                    <Loader2 className="w-4 h-4 text-indigo-600 animate-spin shrink-0" />
                  ) : (
                    <div className="w-4 h-4 rounded-full border border-slate-300 shrink-0" />
                  )}
                  <span
                    className={
                      generationStep >= 2
                        ? 'font-medium text-slate-800'
                        : generationStep === 1
                        ? 'font-medium text-indigo-700'
                        : 'text-slate-400'
                    }
                  >
                    Identifying the trigger
                  </span>
                </div>

                {/* Step 3 */}
                <div className="flex items-center gap-3 text-xs sm:text-sm">
                  {generationStep >= 3 ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  ) : generationStep === 2 ? (
                    <Loader2 className="w-4 h-4 text-indigo-600 animate-spin shrink-0" />
                  ) : (
                    <div className="w-4 h-4 rounded-full border border-slate-300 shrink-0" />
                  )}
                  <span
                    className={
                      generationStep >= 3
                        ? 'font-medium text-slate-800'
                        : generationStep === 2
                        ? 'font-medium text-indigo-700'
                        : 'text-slate-400'
                    }
                  >
                    Designing automation logic
                  </span>
                </div>

                {/* Step 4 */}
                <div className="flex items-center gap-3 text-xs sm:text-sm">
                  {generationStep >= 4 ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  ) : generationStep === 3 ? (
                    <Loader2 className="w-4 h-4 text-indigo-600 animate-spin shrink-0" />
                  ) : (
                    <div className="w-4 h-4 rounded-full border border-slate-300 shrink-0" />
                  )}
                  <span
                    className={
                      generationStep >= 4
                        ? 'font-medium text-slate-800'
                        : generationStep === 3
                        ? 'font-medium text-indigo-700'
                        : 'text-slate-400'
                    }
                  >
                    Selecting actions
                  </span>
                </div>

                {/* Step 5 */}
                <div className="flex items-center gap-3 text-xs sm:text-sm">
                  {generationStep >= 5 ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  ) : generationStep === 4 ? (
                    <Loader2 className="w-4 h-4 text-indigo-600 animate-spin shrink-0" />
                  ) : (
                    <div className="w-4 h-4 rounded-full border border-slate-300 shrink-0" />
                  )}
                  <span
                    className={
                      generationStep >= 5
                        ? 'font-medium text-slate-800'
                        : generationStep === 4
                        ? 'font-medium text-indigo-700'
                        : 'text-slate-400'
                    }
                  >
                    Optimizing workflow
                  </span>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-center gap-2 text-xs text-slate-500">
                <span className="w-2 h-2 rounded-full bg-indigo-600 animate-pulse" />
                <span>Synthesizing parameters and verifying execution graph...</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
