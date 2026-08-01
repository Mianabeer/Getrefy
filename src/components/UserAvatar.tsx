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
  // Dynamic #1 ranked user is the LEGEND
  if (isRank1) {
    return {
      name: 'Legend',
      label: 'Legend 👑',
      emoji: '👑',
      color: '#EF4444',
      ringClass: 'p-[3px] rounded-full bg-gradient-to-r from-rose-600 via-red-500 to-amber-500 animate-pulse shadow-lg shadow-red-500/60 ring-2 ring-red-500/50',
      badgeClass: 'bg-gradient-to-r from-rose-600 via-red-500 to-amber-500 text-white font-black shadow-sm',
      borderHex: '#EF4444',
      isLegend: true
    };
  }

  if (points >= 7500) {
    return {
      name: 'Apex',
      label: 'Apex ⚡',
      emoji: '⚡',
      color: '#F97316',
      ringClass: 'p-[3px] rounded-full bg-gradient-to-r from-amber-500 via-orange-500 to-red-600 shadow-lg shadow-orange-500/50 ring-2 ring-orange-400/50',
      badgeClass: 'bg-gradient-to-r from-orange-500 to-red-600 text-white font-black',
      borderHex: '#F97316'
    };
  }
  if (points >= 5000) {
    return {
      name: 'Trendsetter',
      label: 'Trendsetter 🌿',
      emoji: '🌿',
      color: '#10B981',
      ringClass: 'p-[3px] rounded-full bg-gradient-to-r from-teal-500 via-emerald-400 to-green-300 shadow-md shadow-teal-500/40 ring-2 ring-teal-400/40',
      badgeClass: 'bg-gradient-to-r from-teal-500 to-emerald-500 text-white font-bold',
      borderHex: '#10B981'
    };
  }
  if (points >= 3000) {
    return {
      name: 'Diamond',
      label: 'Diamond 🧊',
      emoji: '🧊',
      color: '#38BDF8',
      ringClass: 'p-[3px] rounded-full bg-gradient-to-r from-sky-400 via-indigo-300 to-white shadow-md shadow-sky-400/40 ring-2 ring-sky-300/50',
      badgeClass: 'bg-gradient-to-r from-sky-400 via-indigo-400 to-blue-500 text-white font-bold',
      borderHex: '#38BDF8'
    };
  }
  if (points >= 1500) {
    return {
      name: 'Platinum',
      label: 'Platinum 💎',
      emoji: '💎',
      color: '#A855F7',
      ringClass: 'p-[3px] rounded-full bg-gradient-to-r from-purple-600 via-[#2563EB] to-cyan-400 animate-pulse shadow-md shadow-purple-500/40 ring-2 ring-purple-500/30',
      badgeClass: 'bg-gradient-to-r from-purple-600 to-[#2563EB] text-white font-bold',
      borderHex: '#A855F7'
    };
  }
  if (points >= 500) {
    return {
      name: 'Gold',
      label: 'Gold 🥇',
      emoji: '🥇',
      color: '#FFD700',
      ringClass: 'p-[3px] rounded-full bg-[#FFD700] shadow-md shadow-yellow-500/30 ring-2 ring-yellow-400/30',
      badgeClass: 'bg-[#FFD700] text-black font-black',
      borderHex: '#FFD700'
    };
  }
  if (points >= 100) {
    return {
      name: 'Silver',
      label: 'Silver 🥈',
      emoji: '🥈',
      color: '#C0C0C0',
      ringClass: 'p-[3px] rounded-full bg-gradient-to-tr from-slate-400 via-gray-300 to-slate-200 shadow-sm ring-2 ring-slate-300/40',
      badgeClass: 'bg-[#C0C0C0] text-black font-bold',
      borderHex: '#C0C0C0'
    };
  }
  return {
    name: 'Bronze',
    label: 'Bronze 🥉',
    emoji: '🥉',
    color: '#A97142',
    ringClass: 'p-[3px] rounded-full bg-[#A97142] shadow-sm ring-2 ring-[#A97142]/30',
    badgeClass: 'bg-[#A97142] text-white font-bold',
    borderHex: '#A97142'
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

