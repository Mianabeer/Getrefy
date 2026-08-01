import React from 'react';

export const PandaLogo: React.FC<{ size?: 'sm' | 'md' | 'lg' }> = ({ size = 'md' }) => {
  const iconSize = size === 'sm' ? 'w-6 h-6' : size === 'lg' ? 'w-10 h-10' : 'w-8 h-8';
  const textSize = size === 'sm' ? 'text-lg' : size === 'lg' ? 'text-2xl' : 'text-xl';

  return (
    <div className="flex items-center gap-2.5 group cursor-pointer select-none">
      <div className={`${iconSize} rounded-xl bg-gradient-to-br from-[#2563EB] to-[#1D4ED8] text-white flex items-center justify-center font-black shadow-md shadow-[#2563EB]/20 group-hover:scale-105 transition-transform`}>
        <span className="text-base sm:text-lg">🐼</span>
      </div>
      <div className="flex flex-col">
        <span className={`${textSize} font-black tracking-tight text-[#1A1A1B] dark:text-[#F5F5F5] leading-none`}>
          Getrefy<span className="text-[#2563EB]">.</span>
        </span>
        <span className="text-[9px] font-bold tracking-wider uppercase text-[#1A1A1B]/50 dark:text-[#F5F5F5]/50 mt-0.5">
          Dev Product Community
        </span>
      </div>
    </div>
  );
};
