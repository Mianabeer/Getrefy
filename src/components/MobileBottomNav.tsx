import React from 'react';
import { useApp, ActiveView } from '../context/AppContext';
import { Home, PlusSquare, Trophy, User, Sparkles } from 'lucide-react';

export const MobileBottomNav: React.FC = () => {
  const { activeView, setActiveView } = useApp();

  const navItems: { id: ActiveView; label: string; icon: any }[] = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'leaderboard', label: 'Top', icon: Trophy },
    { id: 'submit', label: 'Submit', icon: PlusSquare },
    { id: 'why', label: 'Why Us', icon: Sparkles },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#FFFFFF]/95 dark:bg-[#0E0E10]/95 backdrop-blur-md border-t border-[#E5E5E5] dark:border-[#2A2A2C] px-2 py-1.5 flex items-center justify-around">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = activeView === item.id;

        return (
          <button
            key={item.id}
            onClick={() => setActiveView(item.id)}
            className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all ${
              isActive
                ? 'text-[#2563EB] font-black scale-105'
                : 'text-[#1A1A1B]/60 dark:text-[#F5F5F5]/60 hover:text-[#1A1A1B] dark:hover:text-[#F5F5F5]'
            }`}
          >
            <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5px]' : 'stroke-2'}`} />
            <span className="text-[10px] tracking-tight mt-0.5">{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
};
