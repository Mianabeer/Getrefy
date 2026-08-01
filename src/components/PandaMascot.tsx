import React from 'react';
import { Watch, Search, Sparkles } from 'lucide-react';

interface PandaMascotProps {
  mood?: 'idle' | 'waiting' | 'celebrate' | 'empty' | 'search';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  title?: string;
  subtitle?: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

export const PandaMascot: React.FC<PandaMascotProps> = ({
  mood = 'idle',
  size = 'md',
  title,
  subtitle,
  actionLabel,
  onAction,
  className = ''
}) => {
  const containerSize =
    size === 'sm' ? 'w-12 h-12 text-2xl' :
    size === 'md' ? 'w-16 h-16 text-4xl' :
    size === 'lg' ? 'w-24 h-24 text-6xl' :
    'w-32 h-32 text-7xl';

  return (
    <div className={`flex flex-col items-center justify-center text-center p-4 space-y-3 ${className}`}>
      {/* Panda Visual Container */}
      <div className="relative group">
        <div className={`${containerSize} rounded-3xl bg-gradient-to-tr from-[#2563EB]/20 via-purple-500/15 to-amber-500/20 border border-[#2563EB]/30 flex items-center justify-center shadow-lg relative overflow-hidden backdrop-blur-xs transition-transform duration-300 group-hover:scale-105`}>
          {/* Animated Glow Halo */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#2563EB]/10 to-purple-500/10 rounded-3xl animate-pulse" />

          {/* Panda Icon with specific mood animations */}
          {mood === 'waiting' && (
            <div className="relative flex items-center justify-center animate-bounce">
              <span>🐼</span>
              <span className="absolute -bottom-1 -right-1 p-1 rounded-full bg-amber-500 text-white shadow-md animate-spin duration-3000">
                <Watch className="w-3 h-3" />
              </span>
            </div>
          )}

          {mood === 'celebrate' && (
            <div className="relative flex items-center justify-center animate-bounce">
              <span>🐼</span>
              <span className="absolute -top-1 -right-1 text-amber-400 animate-ping">✨</span>
            </div>
          )}

          {mood === 'search' && (
            <div className="relative flex items-center justify-center animate-pulse">
              <span>🐼</span>
              <span className="absolute -bottom-1 -right-1 p-1 rounded-full bg-[#2563EB] text-white shadow-md">
                <Search className="w-3 h-3" />
              </span>
            </div>
          )}

          {(mood === 'idle' || mood === 'empty') && (
            <div className="animate-subtle-float">
              <span>🐼</span>
            </div>
          )}
        </div>

        {/* Floating Sparkles decoration */}
        <div className="absolute -top-2 -right-2 text-amber-500 animate-pulse opacity-80">
          <Sparkles className="w-4 h-4" />
        </div>
      </div>

      {/* Optional Title & Subtitle */}
      {title && (
        <h3 className="text-sm sm:text-base font-black text-[#1A1A1B] dark:text-[#F5F5F5] tracking-tight">
          {title}
        </h3>
      )}

      {subtitle && (
        <p className="text-xs text-[#1A1A1B]/60 dark:text-[#F5F5F5]/60 max-w-sm leading-relaxed">
          {subtitle}
        </p>
      )}

      {/* Optional Action CTA */}
      {actionLabel && onAction && (
        <button
          onClick={onAction}
          className="mt-1 px-4 py-2 rounded-xl bg-[#2563EB] text-white font-bold text-xs hover:bg-[#2563EB]/90 transition-all shadow-sm flex items-center gap-1.5 cursor-pointer"
        >
          <span>{actionLabel}</span>
        </button>
      )}
    </div>
  );
};
