import React from 'react';
import { useAutomation } from '../../context/AutomationContext';
import { Check, ArrowRight, Boxes, LayoutDashboard, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const ActivationModal: React.FC = () => {
  const { showActivationModal, closeActivationModal, navigateTo } = useAutomation();

  if (!showActivationModal) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/25 backdrop-blur-xs flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        className="w-full max-w-md bg-white rounded-panel border border-black/[0.08] shadow-float p-8 text-center relative overflow-hidden"
      >
        {/* Subtle radial glow */}
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-48 h-48 bg-emerald-100/60 rounded-full blur-2xl pointer-events-none" />

        {/* Checkmark icon */}
        <div className="w-14 h-14 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-600 flex items-center justify-center mx-auto mb-5 shadow-subtle relative z-10">
          <Check className="w-7 h-7 stroke-[2.5]" />
        </div>

        {/* Headlines */}
        <h3 className="text-2xl font-bold tracking-tight text-slate-900 relative z-10">
          Automation Activated
        </h3>
        <p className="text-base text-slate-600 mt-2 font-medium relative z-10">
          Kairo is now working for you.
        </p>

        <p className="text-xs text-slate-400 mt-2 max-w-xs mx-auto leading-relaxed relative z-10">
          Triggers are connected and listening live. Any incoming event will be processed through your synthesized neural logic automatically.
        </p>

        {/* Status info box */}
        <div className="mt-6 p-3.5 bg-[#FAFBFD] rounded-card border border-black/[0.06] text-left text-xs text-slate-600 space-y-1.5 relative z-10">
          <div className="flex items-center justify-between">
            <span className="font-semibold text-slate-800">Smart Email Triage</span>
            <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200/60">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              LIVE
            </span>
          </div>
          <div className="text-[11px] text-slate-500">
            Runtime target: Google Workspace → Kairo AI → Slack #exec-updates
          </div>
        </div>

        {/* Actions */}
        <div className="mt-7 flex flex-col sm:flex-row items-center justify-center gap-2.5 relative z-10">
          <button
            onClick={() => {
              closeActivationModal();
              navigateTo('overview');
            }}
            className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-[#2547D0] hover:bg-[#1D3BB5] rounded-control shadow-xs transition-colors"
          >
            <LayoutDashboard className="w-3.5 h-3.5" />
            <span>Return to Overview</span>
          </button>

          <button
            onClick={() => {
              closeActivationModal();
              navigateTo('automations');
            }}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-medium text-slate-700 bg-white hover:bg-slate-50 rounded-control border border-black/[0.08] transition-colors"
          >
            <Boxes className="w-3.5 h-3.5 text-slate-500" />
            <span>My Automations</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
};
