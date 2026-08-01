import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { TOP_MAKERS } from '../data/mockData';
import { Trophy, Flame, Award, ArrowUp, ShieldCheck, Sparkles, Clock, Globe, Crown } from 'lucide-react';
import { UserAvatar, getBadgeTier } from './UserAvatar';

export const LeaderboardView: React.FC = () => {
  const { posts, setSelectedPost, userProfile } = useApp();
  const [timeframe, setTimeframe] = useState<'weekly' | 'alltime'>('weekly');

  // Dynamically include user and sort top makers by points
  const sortedMakers = [...TOP_MAKERS];
  if (userProfile && !sortedMakers.some(m => m.handle === userProfile.handle)) {
    sortedMakers.push({
      name: userProfile.name,
      handle: userProfile.handle,
      avatar: userProfile.avatar,
      launches: userProfile.launchedCount,
      upvotes: userProfile.totalUpvotesReceived,
      points: userProfile.points,
      badge: 'Community Builder 🐼'
    });
  }
  sortedMakers.sort((a, b) => b.points - a.points);

  // Top products sorted by upvotes (weekly) or points (alltime)
  const topProducts = [...posts]
    .sort((a, b) => (timeframe === 'weekly' ? b.upvotes - a.upvotes : b.points - a.points))
    .slice(0, 5);

  return (
    <div className="p-4 sm:p-6 max-w-5xl mx-auto space-y-6">
      {/* Header Banner with Timeframe Toggle */}
      <div className="p-6 rounded-2xl bg-[#F6F7F8] dark:bg-[#1A1A1B] border border-[#E5E5E5] dark:border-[#2A2A2C] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#2563EB]/10 text-[#2563EB] text-xs font-bold">
            <Trophy className="w-3.5 h-3.5" />
            <span>GETREFY LEADERBOARD</span>
          </div>
          <h1 className="text-2xl font-black text-[#1A1A1B] dark:text-[#F5F5F5] tracking-tight">
            Top Developer Launches & Makers
          </h1>
          <p className="text-xs text-[#1A1A1B]/70 dark:text-[#F5F5F5]/70 max-w-xl">
            Recognizing the highest-voted developer tools, software products, and top community builders.
          </p>
        </div>

        {/* Weekly / All-time Switcher Toggle */}
        <div className="flex items-center p-1 rounded-xl bg-white dark:bg-[#0E0E10] border border-[#E5E5E5] dark:border-[#2A2A2C] shrink-0 self-start sm:self-center shadow-xs">
          <button
            onClick={() => setTimeframe('weekly')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
              timeframe === 'weekly'
                ? 'bg-[#2563EB] text-white shadow-xs'
                : 'text-[#1A1A1B]/60 dark:text-[#F5F5F5]/60 hover:text-[#1A1A1B] dark:hover:text-[#F5F5F5]'
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            <span>Weekly Top</span>
          </button>

          <button
            onClick={() => setTimeframe('alltime')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
              timeframe === 'alltime'
                ? 'bg-[#2563EB] text-white shadow-xs'
                : 'text-[#1A1A1B]/60 dark:text-[#F5F5F5]/60 hover:text-[#1A1A1B] dark:hover:text-[#F5F5F5]'
            }`}
          >
            <Globe className="w-3.5 h-3.5" />
            <span>All-time</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Top Product Launches Column */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white dark:bg-[#0E0E10] border border-[#E5E5E5] dark:border-[#2A2A2C] rounded-2xl p-6 space-y-4">
            <h3 className="text-sm font-bold text-[#1A1A1B] dark:text-[#F5F5F5] flex items-center justify-between">
              <span className="flex items-center gap-2">
                <Flame className="w-4 h-4 text-amber-500" />
                <span>
                  {timeframe === 'weekly' ? 'Top Voted Launches This Week' : 'Top Voted Launches All-time'}
                </span>
              </span>
              <span className="text-xs text-[#2563EB] font-bold">
                {timeframe === 'weekly' ? 'Weekly Ranking' : 'Hall of Fame'}
              </span>
            </h3>

            <div className="space-y-3">
              {topProducts.map((post, index) => (
                <div
                  key={post.id}
                  onClick={() => setSelectedPost(post)}
                  className="p-4 rounded-xl bg-[#F6F7F8] dark:bg-[#1A1A1B] border border-[#E5E5E5] dark:border-[#2A2A2C] hover:border-[#2563EB] transition-all cursor-pointer flex items-center justify-between gap-4 group"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className={`w-7 h-7 rounded-lg flex items-center justify-center font-black text-xs shrink-0 ${
                      index === 0
                        ? 'bg-amber-400 text-black shadow-xs'
                        : index === 1
                        ? 'bg-slate-300 text-black'
                        : index === 2
                        ? 'bg-amber-700 text-white'
                        : 'bg-white dark:bg-[#0E0E10] text-[#1A1A1B]/60 dark:text-[#F5F5F5]/60'
                    }`}>
                      #{index + 1}
                    </span>

                    <div className="min-w-0">
                      <h4 className="font-bold text-xs sm:text-sm text-[#1A1A1B] dark:text-[#F5F5F5] group-hover:text-[#2563EB] transition-colors truncate">
                        {post.title}
                      </h4>
                      <p className="text-[11px] text-[#1A1A1B]/60 dark:text-[#F5F5F5]/60 truncate">
                        by {post.maker.name} • <span className="text-[#2563EB] font-semibold">{post.category}</span>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white dark:bg-[#0E0E10] border border-[#E5E5E5] dark:border-[#2A2A2C] text-xs font-black text-[#2563EB] shrink-0">
                    <ArrowUp className="w-3.5 h-3.5" />
                    <span>{post.upvotes}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Top Makers Column */}
        <div className="space-y-4">
          <div className="bg-white dark:bg-[#0E0E10] border border-[#E5E5E5] dark:border-[#2A2A2C] rounded-2xl p-6 space-y-4">
            <h3 className="text-sm font-bold text-[#1A1A1B] dark:text-[#F5F5F5] flex items-center gap-2">
              <Award className="w-4 h-4 text-[#2563EB]" />
              <span>Top Community Makers</span>
            </h3>

            <div className="space-y-3">
              {sortedMakers.map((maker, idx) => {
                const isRank1 = idx === 0;
                const tier = getBadgeTier(maker.points, isRank1);

                return (
                  <div
                    key={idx}
                    className={`p-3 rounded-xl border flex items-center justify-between gap-3 transition-all ${
                      isRank1
                        ? 'bg-gradient-to-r from-red-500/10 via-rose-500/5 to-amber-500/10 border-red-500/30 shadow-xs'
                        : 'bg-[#F6F7F8] dark:bg-[#1A1A1B] border-[#E5E5E5] dark:border-[#2A2A2C]'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span className="text-xs font-black text-[#1A1A1B]/40 dark:text-[#F5F5F5]/40 w-4 text-center shrink-0">
                        #{idx + 1}
                      </span>
                      <UserAvatar
                        src={maker.avatar}
                        alt={maker.name}
                        points={maker.points}
                        isRank1={isRank1}
                        size="sm"
                      />
                      <div className="min-w-0">
                        <div className="flex items-center gap-1">
                          <span className="font-bold text-xs text-[#1A1A1B] dark:text-[#F5F5F5] truncate flex items-center gap-1">
                            {maker.name}
                            {isRank1 && (
                              <span title="Rank #1 Legend">
                                <Crown className="w-3.5 h-3.5 text-amber-500 fill-amber-500 shrink-0" />
                              </span>
                            )}
                          </span>
                          <ShieldCheck className="w-3 h-3 text-[#2563EB] shrink-0" />
                        </div>
                        <span className="text-[10px] text-[#1A1A1B]/50 dark:text-[#F5F5F5]/50 block">
                          {maker.launches} launches • {maker.upvotes} upvotes
                        </span>
                      </div>
                    </div>

                    <div className="text-right shrink-0 space-y-0.5">
                      <span className="text-xs font-black text-[#2563EB] block">
                        {maker.points} pts
                      </span>
                      <span className={`text-[9px] px-1.5 py-0.5 rounded uppercase tracking-wide font-black block ${tier.badgeClass}`}>
                        {tier.label}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Points Rules Box */}
          <div className="p-4 rounded-2xl bg-[#2563EB]/10 border border-[#2563EB]/20 text-[#1A1A1B] dark:text-[#F5F5F5] space-y-2">
            <h4 className="text-xs font-bold text-[#2563EB] flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>How Panda Points Work</span>
            </h4>
            <ul className="text-[11px] text-[#1A1A1B]/80 dark:text-[#F5F5F5]/80 space-y-1">
              <li>• <strong>Launch Product:</strong> +3 Points</li>
              <li>• <strong>Constructive Comment:</strong> +4 Points</li>
              <li>• <strong>Upvote Product:</strong> +2 Points</li>
              <li>• <strong>Daily Streak Bonus:</strong> +2 Points/Day</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
