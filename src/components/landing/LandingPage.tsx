import React from 'react';
import { useAutomation } from '../../context/AutomationContext';
import {
  ArrowRight,
  Sparkles,
  Zap,
  Mail,
  Bell,
  CheckCircle2,
  Shield,
  Layers,
  Cpu,
  CornerDownRight,
} from 'lucide-react';
import { motion } from 'framer-motion';

export const LandingPage: React.FC = () => {
  const { navigateTo } = useAutomation();

  return (
    <div className="min-h-screen bg-[#FAFBFD] text-slate-900 flex flex-col selection:bg-indigo-100 selection:text-indigo-900">
      {/* Refined Header */}
      <header className="w-full max-w-6xl mx-auto px-6 h-20 flex items-center justify-between border-b border-black/[0.05]">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-[#2547D0] flex items-center justify-center text-white shadow-xs">
            <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <div className="flex flex-col">
            <span className="font-semibold tracking-tight text-slate-900 text-lg leading-none">
              KAIRO
            </span>
            <span className="text-[10px] text-slate-600 font-medium tracking-wide uppercase mt-0.5">
              Smart Automation
            </span>
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-8 text-[13.5px] font-medium text-slate-600">
          <button
            onClick={() => navigateTo('library')}
            className="hover:text-slate-900 transition-colors"
          >
            Templates
          </button>
          <button
            onClick={() => navigateTo('analytics')}
            className="hover:text-slate-900 transition-colors"
          >
            Performance
          </button>
          <button
            onClick={() => navigateTo('builder')}
            className="hover:text-slate-900 transition-colors"
          >
            Canvas
          </button>
        </nav>

        <div className="flex items-center gap-3">
          <button
            onClick={() => navigateTo('overview')}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-[#2547D0] hover:bg-[#1D3BB5] rounded-control shadow-sm transition-all active:scale-[0.98]"
          >
            <span>Enter Kairo</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col justify-center max-w-5xl mx-auto px-6 pt-16 pb-24 text-center">
        {/* Subtle pill tag */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3 py-1 mx-auto mb-8 rounded-full text-xs font-medium bg-white text-slate-700 border border-black/[0.08] shadow-subtle"
        >
          <span className="w-2 h-2 rounded-full bg-[#2547D0]" />
          <span>Next-Generation Autonomous Workflow Synthesis</span>
        </motion.div>

        {/* Hero Title */}
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-6xl font-bold tracking-tight text-slate-950 max-w-3xl mx-auto leading-[1.12]"
        >
          Intelligence that automates.
        </motion.h1>

        {/* Supporting Statement */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-6 text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto font-normal leading-relaxed"
        >
          Tell Kairo what you want to accomplish. It understands your intent and transforms complex tasks into intelligent automation.
        </motion.p>

        {/* Primary Call to Actions */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <button
            onClick={() => navigateTo('overview')}
            className="inline-flex items-center gap-2.5 px-6 py-3 text-sm font-semibold text-white bg-[#2547D0] hover:bg-[#1D3BB5] rounded-control shadow-md hover:shadow-lg transition-all active:scale-[0.98]"
          >
            <span>Enter Kairo</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <button
            onClick={() => navigateTo('library')}
            className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-slate-700 bg-white hover:bg-slate-50 rounded-control border border-black/[0.08] shadow-subtle transition-all active:scale-[0.98]"
          >
            <span>Explore automations</span>
          </button>
        </motion.div>

        {/* Hero Abstract Flow Visualization */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-16 w-full max-w-3xl mx-auto p-6 bg-white rounded-panel border border-black/[0.08] shadow-card relative overflow-hidden"
        >
          {/* Subtle grid background */}
          <div className="absolute inset-0 bg-dot-grid-fine opacity-60 pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-4 py-4 px-2">
            {/* Step 1: Trigger */}
            <div className="flex-1 w-full p-4 bg-[#F8F9FB] rounded-card border border-black/[0.06] text-left">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-600">
                  Trigger
                </span>
                <div className="w-6 h-6 rounded-md bg-blue-50 text-[#2547D0] flex items-center justify-center">
                  <Mail className="w-3.5 h-3.5" />
                </div>
              </div>
              <h4 className="text-sm font-semibold text-slate-900">Incoming Event</h4>
              <p className="text-xs text-slate-600 mt-1 leading-normal">
                High-priority email, document upload, or webhook
              </p>
            </div>

            {/* Connecting line */}
            <div className="flex items-center justify-center text-slate-300">
              <svg className="w-8 h-4 hidden md:block" viewBox="0 0 32 16" fill="none">
                <path d="M0 8h28M24 3l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="md:hidden text-xs text-slate-400">↓</span>
            </div>

            {/* Step 2: AI Intelligence */}
            <div className="flex-1 w-full p-4 bg-white rounded-card border border-indigo-200/80 shadow-xs text-left relative overflow-hidden ring-1 ring-indigo-500/10">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-indigo-600">
                  AI Intelligence
                </span>
                <div className="w-6 h-6 rounded-md bg-indigo-50 text-indigo-600 flex items-center justify-center">
                  <Sparkles className="w-3.5 h-3.5" />
                </div>
              </div>
              <h4 className="text-sm font-semibold text-slate-900">Intent Synthesis</h4>
              <p className="text-xs text-slate-600 mt-1 leading-normal">
                Semantic classification, entity extraction & decision logic
              </p>
            </div>

            {/* Connecting line */}
            <div className="flex items-center justify-center text-slate-300">
              <svg className="w-8 h-4 hidden md:block" viewBox="0 0 32 16" fill="none">
                <path d="M0 8h28M24 3l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="md:hidden text-xs text-slate-400">↓</span>
            </div>

            {/* Step 3: Action */}
            <div className="flex-1 w-full p-4 bg-[#F8F9FB] rounded-card border border-black/[0.06] text-left">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-600">
                  Action
                </span>
                <div className="w-6 h-6 rounded-md bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  <Bell className="w-3.5 h-3.5" />
                </div>
              </div>
              <h4 className="text-sm font-semibold text-slate-900">Target Output</h4>
              <p className="text-xs text-slate-600 mt-1 leading-normal">
                Multi-channel notification, database update & task dispatch
              </p>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-black/[0.05] flex items-center justify-between text-xs text-slate-600">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>Real-time autonomous execution</span>
            </div>
            <span className="font-mono text-[11px] text-slate-600">Zero Code Required</span>
          </div>
        </motion.div>

        {/* Core Principles Grid */}
        <div className="mt-20 grid grid-cols-1 sm:grid-cols-3 gap-6 text-left">
          <div className="p-5 bg-white rounded-card border border-black/[0.06] shadow-subtle">
            <div className="w-8 h-8 rounded-control bg-slate-100 flex items-center justify-center text-slate-700 mb-4">
              <Sparkles className="w-4 h-4 text-[#2547D0]" />
            </div>
            <h3 className="text-sm font-semibold text-slate-900">Natural Language Intent</h3>
            <p className="mt-2 text-xs text-slate-600 leading-relaxed">
              Describe in plain English what you need accomplished. Kairo understands context, dependencies, and parameters automatically.
            </p>
          </div>

          <div className="p-5 bg-white rounded-card border border-black/[0.06] shadow-subtle">
            <div className="w-8 h-8 rounded-control bg-slate-100 flex items-center justify-center text-slate-700 mb-4">
              <Layers className="w-4 h-4 text-[#2547D0]" />
            </div>
            <h3 className="text-sm font-semibold text-slate-900">Visual Interactive Canvas</h3>
            <p className="mt-2 text-xs text-slate-600 leading-relaxed">
              Inspect generated workflows on a modern visual canvas. Configure node rules, run step-by-step tests, and deploy with confidence.
            </p>
          </div>

          <div className="p-5 bg-white rounded-card border border-black/[0.06] shadow-subtle">
            <div className="w-8 h-8 rounded-control bg-slate-100 flex items-center justify-center text-slate-700 mb-4">
              <Shield className="w-4 h-4 text-[#2547D0]" />
            </div>
            <h3 className="text-sm font-semibold text-slate-900">Enterprise Reliability</h3>
            <p className="mt-2 text-xs text-slate-600 leading-relaxed">
              Continuous health monitoring, instant human-in-the-loop failover, and millisecond execution tracing for every event.
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-black/[0.06] bg-white py-6 text-center text-xs text-slate-600">
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-800">KAIRO</span>
            <span>—</span>
            <span>Smart India Hackathon Prototype</span>
          </div>
          <button
            onClick={() => navigateTo('overview')}
            className="text-[#2547D0] hover:underline font-medium"
          >
            Launch Interactive Prototype →
          </button>
        </div>
      </footer>
    </div>
  );
};
