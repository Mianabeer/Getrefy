import React from 'react';
import { useApp } from '../context/AppContext';
import { CheckCircle2, Info, X, AlertCircle } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, dismissToast } = useApp();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-sm pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="pointer-events-auto flex items-start gap-3 p-3.5 rounded-xl bg-[#1A1A1B] text-white shadow-xl border border-white/10 animate-in fade-in slide-in-from-bottom-3 duration-200"
        >
          <div className="shrink-0 mt-0.5">
            {toast.type === 'panda' ? (
              <span className="text-base">🐼</span>
            ) : toast.type === 'error' ? (
              <AlertCircle className="w-4 h-4 text-rose-400" />
            ) : toast.type === 'info' ? (
              <Info className="w-4 h-4 text-[#2563EB]" />
            ) : (
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            )}
          </div>

          <div className="flex-1 min-w-0">
            <h4 className="text-xs font-bold text-white leading-tight">
              {toast.title}
            </h4>
            <p className="text-[11px] text-white/70 mt-0.5 truncate">
              {toast.message}
            </p>
          </div>

          <button
            onClick={() => dismissToast(toast.id)}
            className="text-white/40 hover:text-white shrink-0 p-0.5"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      ))}
    </div>
  );
};
