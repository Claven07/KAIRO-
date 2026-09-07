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
    'When I receive an important email, analyze its priority, summarize it, and notify me on Slack.'
  );
  const [isVoiceActive, setIsVoiceActive] = useState(false);

  const suggestions = [
    {
      id: 'email',
      icon: Mail,
      title: 'Smart Email Prioritization',
      description: 'Filter high-priority inbound messages, extract key entities, and notify Slack',
      prompt: 'When I receive an important email, analyze its priority, summarize it, and notify me on Slack.',
    },
    {
      id: 'reports',
      icon: BarChart3,
      title: 'Daily Revenue & Analytics Brief',
      description: 'Synthesize Stripe revenue, GA4 web analytics into daily leadership summary',
      prompt: 'Every day at 6 PM, collect data across Stripe and GA4, then generate an executive summary report.',
    },
    {
      id: 'documents',
      icon: FileSpreadsheet,
      title: 'Invoice & Document Parsing',
      description: 'Extract line items, tax IDs, and vendor dates directly from PDF uploads',
      prompt: 'When a new invoice PDF is added to Google Drive, extract vendor, total amount, and route to finance.',
    },
    {
      id: 'meetings',
      icon: Calendar,
      title: 'Meeting Action Extraction',
      description: 'Transcribe recordings, detect action points, and assign Linear tickets',
      prompt: 'When a Zoom meeting concludes, transcribe the audio, extract deliverables, and post tasks to Linear.',
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
          'When I receive an urgent customer inquiry, analyze sentiment, draft a personalized response, and alert account lead.'
        );
        setIsVoiceActive(false);
        showToast('Voice input transcribed successfully', 'success');
      }, 2200);
    } else {
      setIsVoiceActive(false);
    }
  };

  const synthesisStages = [
    { step: 1, title: 'Understanding intent & parameters', node: 'Trigger' },
    { step: 2, title: 'Identifying trigger event & data schema', node: 'Ingress' },
    { step: 3, title: 'Synthesizing reasoning & decision logic', node: 'Intelligence' },
    { step: 4, title: 'Configuring downstream actions & integrations', node: 'Dispatch' },
    { step: 5, title: 'Validating workflow integrity & compiling graph', node: 'Complete' },
  ];

  const miniNodes = [
    { id: 't1', icon: Zap, label: 'Gmail Inbound', type: 'Trigger', activeAt: 2 },
    { id: 'i1', icon: Brain, label: 'Priority Classifier', type: 'Intelligence', activeAt: 3 },
    { id: 'd1', icon: GitFork, label: 'High Priority Filter', type: 'Decision', activeAt: 4 },
    { id: 'a1', icon: Send, label: 'Post to #leads', type: 'Action', activeAt: 5 },
  ];

  return (
    <div className="max-w-3xl mx-auto px-6 py-12 space-y-12">
      <AnimatePresence mode="wait">
        {!isGenerating ? (
          <motion.div
            key="composer"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-10"
          >
            {/* Header / Objective */}
            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 text-xs font-medium text-[#52525B]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#2D44D8]" />
                <span>Workflow Composer</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#18181B]">
                What do you want to automate?
              </h1>
              <p className="text-sm text-[#71717A] max-w-lg leading-relaxed">
                Describe your objective in plain English. Kairo will interpret the intent,
                resolve schemas, and construct an executable workflow graph.
              </p>
            </div>

            {/* Prompt Composer */}
            <form onSubmit={handleSubmit} className="relative">
              <div className="bg-white rounded-2xl border border-black/[0.08] shadow-[0_4px_24px_rgba(0,0,0,0.04)] focus-within:border-black/[0.2] focus-within:shadow-[0_8px_32px_rgba(0,0,0,0.06)] transition-all overflow-hidden">
                <div className="p-5 pb-3">
                  <textarea
                    value={promptText}
                    onChange={e => setPromptText(e.target.value)}
                    rows={4}
                    placeholder="e.g. When a new customer signs up, check if their company size is over 50. If so, create an opportunity in Salesforce and send an alert to the VIP channel in Slack."
                    className="w-full text-sm sm:text-base text-[#18181B] placeholder:text-[#A1A1AA] bg-transparent resize-none outline-none leading-relaxed"
                    onKeyDown={e => {
                      if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
                        handleSubmit();
                      }
                    }}
                  />
                </div>

                {/* Composer Footer Actions */}
                <div className="px-5 py-3.5 bg-[#FAF9F7]/70 border-t border-black/[0.05] flex items-center justify-between gap-4">
                  <div className="flex items-center gap-1.5 text-[#71717A]">
                    <button
                      type="button"
                      onClick={() => showToast('Attachment options loaded', 'info')}
                      className="p-1.5 hover:text-[#18181B] rounded-md hover:bg-black/[0.05] transition-colors"
                      title="Attach sample payload or schema"
                    >
                      <Paperclip className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={handleVoiceToggle}
                      className={`p-1.5 rounded-md transition-colors ${
                        isVoiceActive
                          ? 'text-red-600 bg-red-50 ring-1 ring-red-200 animate-pulse'
                          : 'hover:text-[#18181B] hover:bg-black/[0.05]'
                      }`}
                      title="Voice dictation"
                    >
                      <Mic className="w-4 h-4" />
                    </button>
                    <span className="text-[11px] text-[#A1A1AA] ml-2 hidden sm:inline">
                      Press <kbd className="px-1.5 py-0.5 rounded bg-black/[0.04] border border-black/[0.06] font-mono text-[10px]">⌘</kbd> + <kbd className="px-1.5 py-0.5 rounded bg-black/[0.04] border border-black/[0.06] font-mono text-[10px]">↵</kbd> to build
                    </span>
                  </div>

                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 px-4 py-2 text-xs font-medium text-white bg-[#18181B] hover:bg-[#27272A] rounded-lg shadow-sm transition-all active:scale-[0.98]"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-indigo-300" />
                    <span>Generate Workflow</span>
                  </button>
                </div>
              </div>
            </form>

            {/* Suggestions */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between text-xs text-[#71717A]">
                <span className="font-medium text-[#52525B]">Suggested blueprints</span>
                <span>Select to populate</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {suggestions.map(s => {
                  const Icon = s.icon;
                  return (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => setPromptText(s.prompt)}
                      className="group text-left p-4 bg-white rounded-xl border border-black/[0.06] hover:border-black/[0.15] hover:shadow-[0_2px_12px_rgba(0,0,0,0.03)] transition-all"
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-lg bg-[#FAF9F7] border border-black/[0.05] text-[#52525B] group-hover:text-[#2D44D8] group-hover:border-[#2D44D8]/20 flex items-center justify-center shrink-0 transition-colors">
                          <Icon className="w-4 h-4" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center justify-between">
                            <h4 className="text-xs font-medium text-[#18181B] group-hover:text-[#2D44D8] transition-colors">
                              {s.title}
                            </h4>
                            <ArrowRight className="w-3 h-3 text-[#A1A1AA] opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                          </div>
                          <p className="text-[11px] text-[#71717A] line-clamp-2 mt-1 leading-relaxed">
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
          /* MULTI-STAGE SYNTHESIS EXPERIENCE */
          <motion.div
            key="synthesizer"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="p-8 sm:p-10 bg-white rounded-2xl border border-black/[0.08] shadow-[0_8px_32px_rgba(0,0,0,0.06)] relative overflow-hidden"
          >
            <div className="space-y-8">
              {/* Status Header */}
              <div className="text-center space-y-2">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-[#2D44D8]/[0.08] text-[#2D44D8]">
                  <Sparkles className="w-3.5 h-3.5 animate-pulse" />
                  <span>Synthesizing Workflow</span>
                </div>
                <h3 className="text-xl font-semibold tracking-tight text-[#18181B]">
                  Analyzing intent & constructing graph
                </h3>
                <p className="text-xs text-[#71717A] max-w-md mx-auto line-clamp-1 font-mono">
                  "{generationPrompt || promptText}"
                </p>
              </div>

              {/* Emerging Workflow Graph Preview */}
              <div className="p-4 bg-[#FAF9F7] rounded-xl border border-black/[0.05]">
                <div className="text-[10px] font-medium text-[#71717A] uppercase tracking-wider mb-3 text-center">
                  Live Graph Assembly
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {miniNodes.map((n) => {
                    const NodeIcon = n.icon;
                    const isConstructed = generationStep >= n.activeAt;
                    const isCurrent = generationStep === n.activeAt - 1;

                    return (
                      <div
                        key={n.id}
                        className={`p-3 rounded-lg border text-center transition-all ${
                          isConstructed
                            ? 'bg-white border-[#2D44D8]/20 shadow-sm'
                            : isCurrent
                            ? 'bg-white/60 border-[#2D44D8]/30 ring-1 ring-[#2D44D8]/20 animate-pulse'
                            : 'bg-transparent border-dashed border-black/[0.08] opacity-40'
                        }`}
                      >
                        <div className="flex items-center justify-center mb-1.5">
                          <div
                            className={`w-7 h-7 rounded-md flex items-center justify-center ${
                              isConstructed
                                ? 'bg-[#2D44D8]/10 text-[#2D44D8]'
                                : 'bg-black/[0.04] text-[#71717A]'
                            }`}
                          >
                            <NodeIcon className="w-3.5 h-3.5" />
                          </div>
                        </div>
                        <div className="text-[10px] font-semibold text-[#18181B] truncate">
                          {n.label}
                        </div>
                        <div className="text-[9px] text-[#71717A]">
                          {n.type}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Synthesis Steps List */}
              <div className="space-y-2.5 max-w-md mx-auto">
                {synthesisStages.map((stage) => {
                  const isDone = generationStep > stage.step;
                  const isActive = generationStep === stage.step;

                  return (
                    <div
                      key={stage.step}
                      className={`flex items-center gap-3 px-3 py-2 rounded-lg text-xs transition-colors ${
                        isActive
                          ? 'bg-[#2D44D8]/[0.06] text-[#18181B]'
                          : isDone
                          ? 'text-[#52525B]'
                          : 'text-[#A1A1AA]'
                      }`}
                    >
                      <div className="shrink-0">
                        {isDone ? (
                          <div className="w-4 h-4 rounded-full bg-emerald-500 text-white flex items-center justify-center">
                            <Check className="w-2.5 h-2.5" />
                          </div>
                        ) : isActive ? (
                          <Loader2 className="w-4 h-4 text-[#2D44D8] animate-spin" />
                        ) : (
                          <div className="w-4 h-4 rounded-full border border-black/[0.12]" />
                        )}
                      </div>
                      <span className={`flex-1 ${isActive ? 'font-medium text-[#18181B]' : ''}`}>
                        {stage.title}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Live status footer */}
              <div className="text-center">
                <span className="text-[11px] text-[#71717A] font-mono">
                  Compiling runtime AST and validating token pathways...
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
