import React from 'react';
import { useAutomation } from '../../context/AutomationContext';
import { CheckCircle2, AlertTriangle, ShieldCheck } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts } = useAutomation();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 pointer-events-none select-none">
      {toasts.map(toast => {
        return (
          <div
            key={toast.id}
            className="pointer-events-auto flex items-center gap-2.5 px-3.5 py-2 bg-graphite text-white rounded-md border border-white/10 shadow-float text-xs font-mono animate-in fade-in slide-in-from-bottom-2 duration-150"
          >
            {toast.type === 'success' && (
              <CheckCircle2 className="w-3.5 h-3.5 text-status-success shrink-0" />
            )}
            {toast.type === 'info' && (
              <ShieldCheck className="w-3.5 h-3.5 text-accent shrink-0" />
            )}
            {toast.type === 'warning' && (
              <AlertTriangle className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            )}
            <span className="text-xs text-slate-100">{toast.message}</span>
          </div>
        );
      })}
    </div>
  );
};
