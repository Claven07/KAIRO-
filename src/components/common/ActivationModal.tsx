import React from 'react';
import { useAutomation } from '../../context/AutomationContext';
import { Check, Boxes, LayoutDashboard, ShieldCheck, Activity } from 'lucide-react';
import { motion } from 'framer-motion';

export const ActivationModal: React.FC = () => {
  const { showActivationModal, closeActivationModal, navigateTo } = useAutomation();

  if (!showActivationModal) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 8 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96 }}
        transition={{ duration: 0.18, ease: [0.23, 1, 0.32, 1] }}
        className="w-full max-w-md bg-white rounded-xl border border-black/[0.08] shadow-float p-7 text-center relative overflow-hidden"
      >
        {/* Enclave checkmark badge */}
        <div className="w-12 h-12 rounded-lg bg-emerald-50 text-status-success flex items-center justify-center mx-auto mb-4 border border-emerald-200/60 shadow-2xs">
          <Check className="w-5 h-5 stroke-[2.5]" />
        </div>

        {/* Headlines */}
        <div className="flex items-center justify-center gap-1.5 text-[10px] font-mono uppercase tracking-widest text-slate-400 mb-1">
          <ShieldCheck className="w-3 h-3 text-status-success" />
          <span>DEPLOYMENT CONFIRMED </span>
        </div>
        <h3 className="text-lg font-semibold tracking-tight text-graphite">
          Mission Activated in Enclave
        </h3>
        <p className="text-xs text-slate-500 mt-1.5 max-w-xs mx-auto leading-relaxed">
          Inbound trigger listeners are bound to local enclave ports. Continuous verification is live with zero external data egress.
        </p>

        {/* Status telemetry box */}
        <div className="mt-5 p-3 bg-[#FAF9F7] rounded-md border border-black/[0.06] text-left font-mono text-xs space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="font-medium text-graphite">Smart Email Triage & Classification</span>
            <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold text-status-success">
              <span className="w-1.5 h-1.5 rounded-full bg-status-success animate-pulse" />
              AIR-GAP LIVE
            </span>
          </div>
          <div className="text-[10.5px] text-slate-500 flex items-center gap-1">
            <Activity className="w-3 h-3 text-status-success" />
            <span>ENCLAVE: ARASAKA NODE-01 · LATENCY &lt; 42MS</span>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-2 font-mono text-xs">
          <button
            onClick={() => {
              closeActivationModal();
              navigateTo('overview');
            }}
            className="pressable w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 text-xs font-medium text-white bg-graphite hover:bg-accent rounded-md shadow-2xs transition-all"
          >
            <LayoutDashboard className="w-3.5 h-3.5" />
            <span>Return to Console</span>
          </button>

          <button
            onClick={() => {
              closeActivationModal();
              navigateTo('automations');
            }}
            className="pressable w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2 text-xs font-medium text-slate-600 hover:text-graphite bg-white hover:bg-slate-50 rounded-md border border-black/[0.08] transition-colors"
          >
            <Boxes className="w-3.5 h-3.5" />
            <span>View Missions</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
};
