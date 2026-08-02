import React, { useState } from 'react';
import { useApp, ActiveView } from '../context/AppContext';
import { useAuth } from '../context/AuthContext';
import { PandaLogo } from './PandaLogo';
import {
  Home,
  PlusSquare,
  Trophy,
  User,
  Settings,
  Flame,
  LogIn,
  LogOut,
  Sparkles,
  ChevronUp,
  Bell
} from 'lucide-react';
import { UserAvatar, getBadgeTier } from './UserAvatar';

export const Sidebar: React.FC = () => {
  const { activeView, setActiveView, userProfile, showToast, unreadNotificationCount } = useApp();
  const { user, openAuthModal, signOut } = useAuth();
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const tier = getBadgeTier(userProfile.points);

  const navItems: { id: ActiveView; label: string; icon: any; badge?: string }[] = [
    { id: 'home', label: 'Home Feed', icon: Home },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'submit', label: 'Submit Product', icon: PlusSquare, badge: '+3pts' },
    { id: 'leaderboard', label: 'Leaderboard', icon: Trophy },
    { id: 'profile', label: 'My Profile', icon: User },
    { id: 'settings', label: 'Settings', icon: Settings },
    { id: 'why', label: 'Why Getrefy', icon: Sparkles },
  ];

  return (
    <aside className="w-64 shrink-0 hidden md:flex flex-col justify-between border-r border-[#E5E5E5] dark:border-[#2A2A2C] bg-[#FFFFFF] dark:bg-[#0E0E10] p-4 h-screen sticky top-0 z-30">
      <div className="space-y-6">
        {/* Brand Header */}
        <div className="px-2 pt-2 cursor-pointer" onClick={() => setActiveView('home')}>
          <PandaLogo />
        </div>

        {/* Navigation Menu */}
        <nav className="space-y-1 relative">
          <div className="px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-[#1A1A1B]/40 dark:text-[#F5F5F5]/40">
            Community
          </div>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isNotif = item.id === 'notifications';
            const isActive = activeView === item.id;

            return (
              <div key={item.id} className="relative">
                <button
                  onClick={() => {
                    setActiveView(item.id);
                  }}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-bold text-xs transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#2563EB] text-white shadow-sm'
                      : 'text-[#1A1A1B]/70 dark:text-[#F5F5F5]/70 hover:bg-[#F6F7F8] dark:hover:bg-[#1A1A1B] hover:text-[#1A1A1B] dark:hover:text-[#F5F5F5]'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <Icon className="w-4 h-4 shrink-0" />
                    <span className="truncate">{item.label}</span>
                  </div>

                  {isNotif && unreadNotificationCount > 0 && (
                    <span className="px-1.5 py-0.5 rounded-full text-[10px] font-black bg-red-500 text-white shadow-xs animate-pulse">
                      {unreadNotificationCount}
                    </span>
                  )}

                  {!isNotif && item.badge && (
                    <span
                      className={`text-[9px] font-black px-1.5 py-0.5 rounded-md ${
                        isActive
                          ? 'bg-white/20 text-white'
                          : 'bg-[#2563EB]/10 text-[#2563EB]'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              </div>
            );
          })}
        </nav>
      </div>

      {/* User Stats Card or Sign In Callout */}
      <div className="space-y-3 relative">
        {user ? (
          <div className="relative">
            {/* Popover Dropdown Menu above user card */}
            {isUserMenuOpen && (
              <div className="absolute bottom-full left-0 right-0 mb-2 bg-white dark:bg-[#0E0E10] border border-[#E5E5E5] dark:border-[#2A2A2C] rounded-2xl shadow-2xl p-1.5 z-40 animate-in fade-in slide-in-from-bottom-2 duration-150">
                <div className="px-3 py-2 border-b border-[#E5E5E5] dark:border-[#2A2A2C]">
                  <p className="text-xs font-bold text-[#1A1A1B] dark:text-[#F5F5F5] truncate">
                    {userProfile.name}
                  </p>
                  <p className="text-[10px] text-[#2563EB] font-semibold truncate">
                    {userProfile.handle} • {userProfile.points} pts
                  </p>
                </div>

                <button
                  onClick={() => {
                    setActiveView('profile');
                    setIsUserMenuOpen(false);
                  }}
                  className="w-full px-3 py-2 text-left text-xs text-[#1A1A1B]/80 dark:text-[#F5F5F5]/80 hover:bg-[#F6F7F8] dark:hover:bg-[#1A1A1B] hover:text-[#2563EB] rounded-xl flex items-center gap-2 font-medium transition-colors"
                >
                  <User className="w-3.5 h-3.5" />
                  <span>My Profile</span>
                </button>

                <button
                  onClick={() => {
                    setActiveView('settings');
                    setIsUserMenuOpen(false);
                  }}
                  className="w-full px-3 py-2 text-left text-xs text-[#1A1A1B]/80 dark:text-[#F5F5F5]/80 hover:bg-[#F6F7F8] dark:hover:bg-[#1A1A1B] hover:text-[#2563EB] rounded-xl flex items-center gap-2 font-medium transition-colors"
                >
                  <Settings className="w-3.5 h-3.5" />
                  <span>Settings</span>
                </button>

                <div className="my-1 border-t border-[#E5E5E5] dark:border-[#2A2A2C]" />

                <button
                  onClick={async () => {
                    setIsUserMenuOpen(false);
                    await signOut();
                    setActiveView('home');
                    showToast('Signed Out', 'You have been signed out of Getrefy.', 'info');
                  }}
                  className="w-full px-3 py-2 text-left text-xs text-rose-500 hover:bg-rose-500/10 rounded-xl flex items-center gap-2 font-bold transition-colors cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Sign Out</span>
                </button>
              </div>
            )}

            <div
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              className="p-3.5 rounded-2xl bg-[#F6F7F8] dark:bg-[#1A1A1B] border border-[#E5E5E5] dark:border-[#2A2A2C] space-y-3 cursor-pointer hover:border-[#2563EB] transition-colors relative"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5 min-w-0">
                  <UserAvatar
                    src={userProfile.avatar}
                    alt={userProfile.name}
                    points={userProfile.points}
                    size="sm"
                  />
                  <div className="min-w-0">
                    <h4 className="text-xs font-black text-[#1A1A1B] dark:text-[#F5F5F5] leading-tight truncate">
                      {userProfile.points} Points
                    </h4>
                    <p className="text-[10px] text-[#2563EB] font-bold mt-0.5 truncate">
                      {tier.label}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <div className="flex items-center gap-1 px-2 py-1 rounded-lg bg-amber-500/10 text-amber-500 text-xs font-bold">
                    <Flame className="w-3.5 h-3.5 fill-amber-500" />
                    <span>{userProfile.streakDays}d</span>
                  </div>
                  <ChevronUp className={`w-3.5 h-3.5 text-[#1A1A1B]/40 dark:text-[#F5F5F5]/40 transition-transform ${isUserMenuOpen ? 'rotate-180' : ''}`} />
                </div>
              </div>

              <div className="pt-2 border-t border-[#E5E5E5] dark:border-[#2A2A2C] flex items-center justify-between text-[11px] text-[#1A1A1B]/60 dark:text-[#F5F5F5]/60">
                <span>Account Options</span>
                <span className="font-bold text-[#2563EB]">Click for Menu ▲</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="p-3.5 rounded-2xl bg-[#2563EB]/5 border border-[#2563EB]/20 space-y-2.5 text-center">
            <h4 className="text-xs font-black text-[#1A1A1B] dark:text-[#F5F5F5]">
              Join Getrefy Community
            </h4>
            <p className="text-[11px] text-[#1A1A1B]/60 dark:text-[#F5F5F5]/60 leading-snug">
              Sign in to upvote software, comment on launches, and earn developer badge tiers.
            </p>
            <button
              onClick={openAuthModal}
              className="w-full py-2 rounded-xl bg-[#2563EB] text-white font-bold text-xs hover:bg-[#2563EB]/90 transition-colors flex items-center justify-center gap-1.5 shadow-xs"
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>Log In / Sign Up</span>
            </button>
          </div>
        )}

        <div className="px-2 text-[10px] text-[#1A1A1B]/40 dark:text-[#F5F5F5]/40 text-center font-medium">
          Getrefy Dev Community © 2026
        </div>
      </div>
    </aside>
  );
};

