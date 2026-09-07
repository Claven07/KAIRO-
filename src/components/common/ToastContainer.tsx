import React from 'react';
import { useAutomation } from '../../context/AutomationContext';
import { CheckCircle2, Info, AlertTriangle } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts } = useAutomation();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 pointer-events-none select-none">
      {toasts.map(toast => {
        return (
          <div
            key={toast.id}
            className="pointer-events-auto flex items-center gap-2.5 px-3.5 py-2 bg-[#18181B] text-white rounded-xl border border-white/10 shadow-[0_8px_24px_rgba(0,0,0,0.15)] text-xs font-medium animate-in fade-in slide-in-from-bottom-2 duration-150"
          >
            {toast.type === 'success' && (
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            )}
            {toast.type === 'info' && (
              <Info className="w-3.5 h-3.5 text-blue-400 shrink-0" />
            )}
            {toast.type === 'warning' && (
              <AlertTriangle className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            )}
            <span className="text-xs text-[#FAFAFA]">{toast.message}</span>
          </div>
        );
      })}
    </div>
  );
};
