import React from 'react';

export const FeedSkeleton: React.FC = () => {
  return (
    <div className="space-y-4 animate-pulse">
      {[1, 2, 3].map((i) => (
        <div key={i} className="p-4 sm:p-5 rounded-2xl bg-[#F6F7F8] dark:bg-[#1A1A1B] border border-[#E5E5E5] dark:border-[#2A2A2C] space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gray-300 dark:bg-gray-800" />
            <div className="space-y-2 flex-1">
              <div className="w-1/3 h-4 bg-gray-300 dark:bg-gray-800 rounded-md" />
              <div className="w-1/4 h-3 bg-gray-200 dark:bg-gray-800/60 rounded-md" />
            </div>
          </div>
          <div className="w-full h-12 bg-gray-200 dark:bg-gray-800/60 rounded-xl" />
          <div className="flex items-center justify-between pt-2">
            <div className="w-24 h-6 bg-gray-300 dark:bg-gray-800 rounded-lg" />
            <div className="w-16 h-6 bg-gray-200 dark:bg-gray-800 rounded-lg" />
          </div>
        </div>
      ))}
    </div>
  );
};

export const LeaderboardSkeleton: React.FC = () => {
  return (
    <div className="space-y-3 animate-pulse">
      {[1, 2, 3, 4, 5].map((i) => (
        <div key={i} className="p-3.5 rounded-xl bg-[#F6F7F8] dark:bg-[#1A1A1B] border border-[#E5E5E5] dark:border-[#2A2A2C] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 bg-gray-300 dark:bg-gray-800 rounded-md" />
            <div className="w-8 h-8 rounded-full bg-gray-300 dark:bg-gray-800" />
            <div className="space-y-1">
              <div className="w-24 h-3 bg-gray-300 dark:bg-gray-800 rounded-md" />
              <div className="w-16 h-2 bg-gray-200 dark:bg-gray-800 rounded-md" />
            </div>
          </div>
          <div className="w-16 h-6 bg-gray-300 dark:bg-gray-800 rounded-lg" />
        </div>
      ))}
    </div>
  );
};
