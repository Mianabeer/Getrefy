import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { useAuth } from '../context/AuthContext';
import { PandaLogo } from './PandaLogo';
import { Search, Plus, Sparkles, Moon, Sun, LogIn, LogOut, User, Settings as SettingsIcon, Bell } from 'lucide-react';
import { UserAvatar } from './UserAvatar';
import { NotificationDropdown } from './NotificationDropdown';

export const Header: React.FC<{ onOpenAiAdvisor?: () => void }> = ({ onOpenAiAdvisor }) => {
  const { filters, setFilters, setActiveView, darkMode, setDarkMode, userProfile, showToast, unreadNotificationCount } = useApp();
  const { user, openAuthModal, signOut } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-[#FFFFFF]/90 dark:bg-[#0E0E10]/90 backdrop-blur-md border-b border-[#E5E5E5] dark:border-[#2A2A2C] px-4 sm:px-6 py-3.5 flex items-center justify-between gap-4">
      {/* Left: Mobile Logo & Search Bar */}
      <div className="flex items-center gap-4 flex-1 max-w-xl">
        <div className="md:hidden shrink-0 cursor-pointer" onClick={() => setActiveView('home')}>
          <PandaLogo size="sm" />
        </div>

        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#1A1A1B]/40 dark:text-[#F5F5F5]/40" />
          <input
            type="text"
            placeholder="Search products, developer tools, AI apps..."
            value={filters.searchQuery}
            onChange={(e) => {
              setFilters(prev => ({ ...prev, searchQuery: e.target.value }));
              setActiveView('home');
            }}
            className="w-full pl-9 pr-4 py-2 text-xs rounded-xl bg-[#F6F7F8] dark:bg-[#1A1A1B] border border-[#E5E5E5] dark:border-[#2A2A2C] text-[#1A1A1B] dark:text-[#F5F5F5] placeholder-[#1A1A1B]/40 dark:placeholder-[#F5F5F5]/40 focus:outline-none focus:border-[#2563EB] transition-colors"
          />
        </div>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-2.5 shrink-0">
        {/* AI Launch Advisor Button */}
        <button
          onClick={onOpenAiAdvisor}
          className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-xl bg-gradient-to-r from-[#2563EB]/10 via-purple-500/10 to-[#2563EB]/10 text-[#2563EB] dark:text-[#60A5FA] border border-[#2563EB]/20 text-xs font-bold hover:border-[#2563EB]/50 transition-colors"
          title="AI Launch Pitch Coach"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#2563EB]" />
          <span>Panda Pitch Advisor</span>
        </button>

        {/* Notifications Bell Button */}
        <div className="relative">
          <button
            onClick={() => {
              setIsNotifOpen(!isNotifOpen);
              setIsDropdownOpen(false);
            }}
            className="relative p-2 rounded-xl bg-[#F6F7F8] dark:bg-[#1A1A1B] border border-[#E5E5E5] dark:border-[#2A2A2C] text-[#1A1A1B] dark:text-[#F5F5F5] hover:text-[#2563EB] transition-colors cursor-pointer"
            title="Notifications"
          >
            <Bell className="w-4 h-4" />
            {unreadNotificationCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#2563EB] text-[9px] font-black text-white ring-2 ring-white dark:ring-[#0E0E10] animate-pulse">
                {unreadNotificationCount}
              </span>
            )}
          </button>

          <NotificationDropdown isOpen={isNotifOpen} onClose={() => setIsNotifOpen(false)} />
        </div>

        {/* Dark Mode Toggle */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="p-2 rounded-xl bg-[#F6F7F8] dark:bg-[#1A1A1B] border border-[#E5E5E5] dark:border-[#2A2A2C] text-[#1A1A1B] dark:text-[#F5F5F5] hover:text-[#2563EB] transition-colors cursor-pointer"
          title="Toggle Theme"
        >
          {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
        </button>


        {/* Submit Product CTA */}
        <button
          onClick={() => setActiveView('submit')}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#2563EB] text-white text-xs font-bold hover:bg-[#2563EB]/90 transition-colors shadow-xs"
        >
          <Plus className="w-4 h-4" />
          <span className="hidden sm:inline">Submit App</span>
        </button>

        {/* Auth Button or User Profile Avatar */}
        {user ? (
          <div className="relative ml-1">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="cursor-pointer hover:opacity-90 transition-opacity focus:outline-none"
              title={userProfile.name}
            >
              <UserAvatar
                src={userProfile.avatar}
                alt={userProfile.name}
                points={userProfile.points}
                size="sm"
              />
            </button>

            {/* User Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-[#0E0E10] border border-[#E5E5E5] dark:border-[#2A2A2C] rounded-2xl shadow-xl py-1.5 z-30 animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="px-3.5 py-2 border-b border-[#E5E5E5] dark:border-[#2A2A2C]">
                  <p className="text-xs font-bold text-[#1A1A1B] dark:text-[#F5F5F5] truncate">
                    {userProfile.name}
                  </p>
                  <p className="text-[10px] text-[#2563EB] font-semibold truncate">
                    {userProfile.handle} • {userProfile.points} pts
                  </p>
                </div>

                <button
                  onClick={() => { setActiveView('profile'); setIsDropdownOpen(false); }}
                  className="w-full px-3.5 py-2 text-left text-xs text-[#1A1A1B]/80 dark:text-[#F5F5F5]/80 hover:bg-[#F6F7F8] dark:hover:bg-[#1A1A1B] hover:text-[#2563EB] flex items-center gap-2 font-medium"
                >
                  <User className="w-3.5 h-3.5" />
                  <span>My Profile</span>
                </button>

                <button
                  onClick={() => { setActiveView('settings'); setIsDropdownOpen(false); }}
                  className="w-full px-3.5 py-2 text-left text-xs text-[#1A1A1B]/80 dark:text-[#F5F5F5]/80 hover:bg-[#F6F7F8] dark:hover:bg-[#1A1A1B] hover:text-[#2563EB] flex items-center gap-2 font-medium"
                >
                  <SettingsIcon className="w-3.5 h-3.5" />
                  <span>Settings</span>
                </button>

                <div className="my-1 border-t border-[#E5E5E5] dark:border-[#2A2A2C]" />

                <button
                  onClick={async () => {
                    setIsDropdownOpen(false);
                    await signOut();
                    setActiveView('home');
                    showToast('Signed Out', 'You have been signed out of Getrefy.', 'info');
                  }}
                  className="w-full px-3.5 py-2 text-left text-xs text-rose-500 hover:bg-rose-500/10 flex items-center gap-2 font-bold cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Sign Out</span>
                </button>
              </div>
            )}
          </div>
        ) : (
          <button
            onClick={openAuthModal}
            className="ml-1 flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#F6F7F8] dark:bg-[#1A1A1B] border border-[#2563EB]/30 text-[#2563EB] text-xs font-extrabold hover:bg-[#2563EB]/10 transition-colors shrink-0"
          >
            <LogIn className="w-4 h-4" />
            <span>Log In</span>
          </button>
        )}
      </div>
    </header>
  );
};

