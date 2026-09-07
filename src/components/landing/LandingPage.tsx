import React from 'react';
import { useAutomation } from '../../context/AutomationContext';
import {
  ArrowRight,
  Sparkles,
  Zap,
  Mail,
  Bell,
  Shield,
  Layers,
} from 'lucide-react';
import { motion } from 'framer-motion';

export const LandingPage: React.FC = () => {
  const { navigateTo } = useAutomation();

  return (
    <div className="min-h-screen bg-[#FAF9F7] text-[#18181B] flex flex-col selection:bg-black/[0.08]">
      {/* Header */}
      <header className="w-full max-w-6xl mx-auto px-6 h-16 flex items-center justify-between border-b border-black/[0.05]">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-[#18181B] flex items-center justify-center text-white font-semibold text-xs tracking-tight">
            K
          </div>
          <span className="font-semibold tracking-tight text-[#18181B] text-sm">
            Kairo
          </span>
        </div>

        <nav className="hidden md:flex items-center gap-6 text-xs font-medium text-[#71717A]">
          <button
            onClick={() => navigateTo('library')}
            className="hover:text-[#18181B] transition-colors"
          >
            Templates
          </button>
          <button
            onClick={() => navigateTo('analytics')}
            className="hover:text-[#18181B] transition-colors"
          >
            Performance
          </button>
          <button
            onClick={() => navigateTo('builder')}
            className="hover:text-[#18181B] transition-colors"
          >
            Canvas
          </button>
        </nav>

        <div className="flex items-center gap-3">
          <button
            onClick={() => navigateTo('overview')}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium text-white bg-[#18181B] hover:bg-[#27272A] rounded-lg shadow-sm transition-all active:scale-[0.98]"
          >
            <span>Open workspace</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col justify-center max-w-4xl mx-auto px-6 pt-16 pb-24 text-center">
        {/* Subtle pill tag */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="inline-flex items-center gap-2 px-3 py-1 mx-auto mb-6 rounded-full text-xs font-medium bg-white text-[#52525B] border border-black/[0.08] shadow-sm"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#2D44D8]" />
          <span>Autonomous workflow synthesis</span>
        </motion.div>

        {/* Hero Title */}
        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.08 }}
          className="text-4xl sm:text-6xl font-semibold tracking-tight text-[#18181B] max-w-2xl mx-auto leading-[1.12]"
        >
          Intelligence that automates.
        </motion.h1>

        {/* Supporting Statement */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.16 }}
          className="mt-5 text-base sm:text-lg text-[#71717A] max-w-xl mx-auto font-normal leading-relaxed"
        >
          State your objective in natural language. Kairo understands the intent, resolves schemas, and builds resilient automations.
        </motion.p>

        {/* Primary Call to Actions */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.24 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-3"
        >
          <button
            onClick={() => navigateTo('overview')}
            className="inline-flex items-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-medium text-white bg-[#18181B] hover:bg-[#27272A] rounded-lg shadow-sm transition-all active:scale-[0.98]"
          >
            <span>Open workspace</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => navigateTo('library')}
            className="inline-flex items-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-medium text-[#52525B] hover:text-[#18181B] bg-white hover:bg-black/[0.03] rounded-lg border border-black/[0.08] shadow-2xs transition-all active:scale-[0.98]"
          >
            <span>Explore templates</span>
          </button>
        </motion.div>

        {/* Hero Abstract Flow Visualization */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-14 w-full max-w-2xl mx-auto p-5 sm:p-6 bg-white rounded-2xl border border-black/[0.08] shadow-md relative overflow-hidden"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-3 py-2">
            {/* Step 1: Trigger */}
            <div className="flex-1 w-full p-4 bg-[#FAF9F7] rounded-xl border border-black/[0.05] text-left">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[10px] font-medium text-[#71717A]">
                  Trigger
                </span>
                <Mail className="w-3.5 h-3.5 text-[#52525B]" />
              </div>
              <h4 className="text-xs font-semibold text-[#18181B]">Incoming email</h4>
              <p className="text-[11px] text-[#71717A] mt-0.5 leading-normal">
                Subject & VIP sender detection
              </p>
            </div>

            {/* Step 2: AI Intelligence */}
            <div className="flex-1 w-full p-4 bg-[#FAF9F7] rounded-xl border border-[#2D44D8]/20 shadow-xs text-left relative">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[10px] font-medium text-[#2D44D8]">
                  Intelligence
                </span>
                <Sparkles className="w-3.5 h-3.5 text-[#2D44D8]" />
              </div>
              <h4 className="text-xs font-semibold text-[#18181B]">Intent synthesis</h4>
              <p className="text-[11px] text-[#71717A] mt-0.5 leading-normal">
                Entity extraction & routing
              </p>
            </div>

            {/* Step 3: Action */}
            <div className="flex-1 w-full p-4 bg-[#FAF9F7] rounded-xl border border-black/[0.05] text-left">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[10px] font-medium text-[#71717A]">
                  Action
                </span>
                <Bell className="w-3.5 h-3.5 text-[#52525B]" />
              </div>
              <h4 className="text-xs font-semibold text-[#18181B]">Target dispatch</h4>
              <p className="text-[11px] text-[#71717A] mt-0.5 leading-normal">
                Post alert to Slack channel
              </p>
            </div>
          </div>

          <div className="mt-3 pt-3 border-t border-black/[0.04] flex items-center justify-between text-xs text-[#71717A]">
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <span className="text-[11px]">Real-time autonomous execution</span>
            </div>
            <span className="font-mono text-[11px]">Zero code required</span>
          </div>
        </motion.div>

        {/* Principles Grid */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
          <div className="p-4 sm:p-5 bg-white rounded-xl border border-black/[0.06] shadow-sm">
            <Sparkles className="w-4 h-4 text-[#2D44D8] mb-3" />
            <h3 className="text-xs font-semibold text-[#18181B]">Natural language intent</h3>
            <p className="mt-1 text-xs text-[#71717A] leading-relaxed">
              Describe in plain English what you need done. Kairo resolves dependencies, variables, and API contracts.
            </p>
          </div>

          <div className="p-4 sm:p-5 bg-white rounded-xl border border-black/[0.06] shadow-sm">
            <Layers className="w-4 h-4 text-[#2D44D8] mb-3" />
            <h3 className="text-xs font-semibold text-[#18181B]">Visual canvas</h3>
            <p className="mt-1 text-xs text-[#71717A] leading-relaxed">
              Inspect and edit workflows visually. Test execution paths step-by-step with real-time feedback.
            </p>
          </div>

          <div className="p-4 sm:p-5 bg-white rounded-xl border border-black/[0.06] shadow-sm">
            <Shield className="w-4 h-4 text-[#2D44D8] mb-3" />
            <h3 className="text-xs font-semibold text-[#18181B]">Auditable reliability</h3>
            <p className="mt-1 text-xs text-[#71717A] leading-relaxed">
              Complete neural decision traces, checksum guarantees, and instant human fallback when confidence is low.
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-black/[0.05] bg-white py-5 text-center text-xs text-[#71717A]">
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="font-medium text-[#18181B]">Kairo</span>
            <span>—</span>
            <span>Intelligence that automates</span>
          </div>
          <button
            onClick={() => navigateTo('overview')}
            className="text-[#2D44D8] hover:underline font-medium"
          >
            Launch workspace →
          </button>
        </div>
      </footer>
    </div>
  );
};
