import React from 'react';
import { useAutomation } from '../../context/AutomationContext';
import { Check, Boxes, LayoutDashboard } from 'lucide-react';
import { motion } from 'framer-motion';

export const ActivationModal: React.FC = () => {
  const { showActivationModal, closeActivationModal, navigateTo } = useAutomation();

  if (!showActivationModal) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/20 backdrop-blur-xs flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 8 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-md bg-white rounded-2xl border border-black/[0.08] shadow-[0_20px_60px_rgba(0,0,0,0.12)] p-7 text-center relative overflow-hidden"
      >
        {/* Checkmark badge */}
        <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-4 border border-emerald-100">
          <Check className="w-6 h-6 stroke-[2.5]" />
        </div>

        {/* Headlines */}
        <h3 className="text-xl font-semibold tracking-tight text-[#18181B]">
          Workflow activated
        </h3>
        <p className="text-sm text-[#52525B] mt-1 font-medium">
          Kairo is now working for you.
        </p>

        <p className="text-xs text-[#71717A] mt-2 max-w-xs mx-auto leading-relaxed">
          Triggers are connected and listening live. Any incoming event will be processed through your synthesized neural logic automatically.
        </p>

        {/* Status telemetry box */}
        <div className="mt-5 p-3.5 bg-[#FAF9F7] rounded-xl border border-black/[0.05] text-left text-xs space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="font-medium text-[#18181B]">Smart email triage</span>
            <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-emerald-700">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Listening live
            </span>
          </div>
          <div className="text-[11px] text-[#71717A]">
            Pipeline: Google Workspace → Kairo AI → Slack #exec-updates
          </div>
        </div>

        {/* Actions */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-2">
          <button
            onClick={() => {
              closeActivationModal();
              navigateTo('overview');
            }}
            className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 text-xs font-medium text-white bg-[#18181B] hover:bg-[#27272A] rounded-lg shadow-sm transition-all active:scale-[0.98]"
          >
            <LayoutDashboard className="w-3.5 h-3.5" />
            <span>Return to overview</span>
          </button>

          <button
            onClick={() => {
              closeActivationModal();
              navigateTo('automations');
            }}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2 text-xs font-medium text-[#52525B] hover:text-[#18181B] bg-white hover:bg-black/[0.03] rounded-lg border border-black/[0.08] transition-colors"
          >
            <Boxes className="w-3.5 h-3.5" />
            <span>View automations</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
};
