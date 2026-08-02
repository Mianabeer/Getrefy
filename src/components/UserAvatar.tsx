import React from 'react';
import { Crown } from 'lucide-react';

export interface UserAvatarProps {
  src: string;
  alt?: string;
  points?: number;
  isRank1?: boolean;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  showBadgeText?: boolean;
}

export function getBadgeTier(points: number = 0, isRank1: boolean = false) {
  // Legendary: 4000+ points OR #1 ranked user fallback if nobody has hit 4000 points yet
  if (points >= 4000 || isRank1) {
    return {
      name: 'Legendary',
      label: 'Legendary Tier',
      iconName: 'Crown',
      color: '#DC2626',
      ringClass: 'p-[3px] rounded-full bg-gradient-to-r from-red-700 via-rose-600 to-amber-500 animate-pulse shadow-lg shadow-red-600/60 ring-2 ring-red-500/50',
      badgeClass: 'bg-gradient-to-r from-red-700 via-rose-600 to-amber-500 text-white font-black shadow-sm',
      borderHex: '#DC2626',
      isLegend: true
    };
  }

  if (points >= 2500) {
    return {
      name: 'Diamond',
      label: 'Diamond Tier',
      iconName: 'Gem',
      color: '#38BDF8',
      ringClass: 'p-[3px] rounded-full bg-gradient-to-r from-sky-400 via-cyan-200 to-white shadow-md shadow-sky-400/40 ring-2 ring-sky-300/50',
      badgeClass: 'bg-gradient-to-r from-sky-400 via-indigo-400 to-cyan-300 text-white font-bold',
      borderHex: '#38BDF8'
    };
  }
  if (points >= 1500) {
    return {
      name: 'Platinum',
      label: 'Platinum Tier',
      iconName: 'ShieldCheck',
      color: '#A855F7',
      ringClass: 'p-[3px] rounded-full bg-gradient-to-r from-purple-600 via-indigo-500 to-cyan-400 shadow-md shadow-purple-500/40 ring-2 ring-purple-400/30',
      badgeClass: 'bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-bold',
      borderHex: '#A855F7'
    };
  }
  if (points >= 800) {
    return {
      name: 'Gold',
      label: 'Gold Tier',
      iconName: 'Trophy',
      color: '#FFD700',
      ringClass: 'p-[3px] rounded-full bg-[#FFD700] shadow-md shadow-yellow-500/30 ring-2 ring-yellow-400/30',
      badgeClass: 'bg-[#FFD700] text-black font-black',
      borderHex: '#FFD700'
    };
  }
  if (points >= 300) {
    return {
      name: 'Silver',
      label: 'Silver Tier',
      iconName: 'Award',
      color: '#C0C0C0',
      ringClass: 'p-[3px] rounded-full bg-gradient-to-tr from-slate-400 via-gray-300 to-slate-200 shadow-sm ring-2 ring-slate-300/40',
      badgeClass: 'bg-gradient-to-r from-slate-400 via-gray-300 to-slate-300 text-black font-bold',
      borderHex: '#C0C0C0'
    };
  }
  return {
    name: 'Bronze',
    label: 'Bronze Tier',
    iconName: 'Star',
    color: '#A97142',
    ringClass: 'p-[3px] rounded-full bg-[#A97142] shadow-sm ring-2 ring-[#A97142]/30',
    badgeClass: 'bg-[#A97142] text-white font-bold',
    borderHex: '#A97142'
  };
}

export function getNextTierProgress(points: number = 0) {
  const tiers = [
    { name: 'Bronze', min: 0, max: 300, next: 'Silver Tier' },
    { name: 'Silver', min: 300, max: 800, next: 'Gold Tier' },
    { name: 'Gold', min: 800, max: 1500, next: 'Platinum Tier' },
    { name: 'Platinum', min: 1500, max: 2500, next: 'Diamond Tier' },
    { name: 'Diamond', min: 2500, max: 4000, next: 'Legendary Tier 👑' }
  ];

  for (const t of tiers) {
    if (points < t.max) {
      const needed = t.max - points;
      const range = t.max - t.min;
      const currentInTier = points - t.min;
      const percentage = Math.min(100, Math.max(0, Math.round((currentInTier / range) * 100)));
      return {
        currentTier: t.name,
        nextTier: t.next,
        nextThreshold: t.max,
        pointsNeeded: needed,
        percentage
      };
    }
  }

  return {
    currentTier: 'Legendary',
    nextTier: 'Top Ranked Legendary 👑',
    nextThreshold: points,
    pointsNeeded: 0,
    percentage: 100
  };
}


export const UserAvatar: React.FC<UserAvatarProps> = ({
  src,
  alt = 'User Avatar',
  points = 0,
  isRank1 = false,
  size = 'md',
  className = '',
  showBadgeText = false
}) => {
  const tier = getBadgeTier(points, isRank1);

  const sizeClasses = {
    xs: 'w-5 h-5',
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  };

  const imgSize = sizeClasses[size] || sizeClasses.md;

  return (
    <div className={`relative inline-flex items-center shrink-0 ${className}`}>
      <div className={tier.ringClass}>
        <img
          src={src || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80'}
          alt={alt}
          className={`${imgSize} rounded-full object-cover bg-white dark:bg-[#1A1A1B]`}
        />
      </div>

      {tier.isLegend && (
        <span
          title="Rank #1 Legend"
          className="absolute -top-1.5 -right-1.5 p-0.5 rounded-full bg-gradient-to-r from-amber-400 to-red-500 text-white shadow-xs animate-bounce"
        >
          <Crown className="w-3 h-3 text-white fill-white" />
        </span>
      )}

      {showBadgeText && (
        <span className={`ml-1.5 px-1.5 py-0.5 rounded-full text-[9px] uppercase tracking-wider ${tier.badgeClass}`}>
          {tier.name}
        </span>
      )}
    </div>
  );
};

