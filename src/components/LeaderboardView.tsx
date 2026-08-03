import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { TOP_MAKERS } from '../data/mockData';
import { Trophy, Flame, Award, ArrowUp, ShieldCheck, Sparkles, Clock, Globe, Crown, Gem, Star, Users } from 'lucide-react';
import { UserAvatar, getBadgeTier } from './UserAvatar';

type TierFilter = 'All' | 'Legendary' | 'Diamond' | 'Platinum' | 'Gold';

export const LeaderboardView: React.FC = () => {
  const { posts, setSelectedPost, userProfile } = useApp();
  const [timeframe, setTimeframe] = useState<'weekly' | 'alltime'>('weekly');
  const [selectedTier, setSelectedTier] = useState<TierFilter>('All');

  // Dynamically include current user and sort top makers by points
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

  // Filter makers by tier tab:
  // - "All" tab shows Gold+ tier makers only (points >= 800 or rank #1), limited to Top 10
  // - Tier tabs (Legendary, Diamond, Platinum, Gold) show makers in that exact tier, limited to Top 10
  const filteredMakers = sortedMakers
    .filter((maker) => {
      const overallIndex = sortedMakers.findIndex(m => m.handle === maker.handle);
      const isRank1 = overallIndex === 0;
      const makerTier = getBadgeTier(maker.points, isRank1);

      if (selectedTier === 'All') {
        // Only Gold, Platinum, Diamond, or Legendary (points >= 800 or rank #1)
        return maker.points >= 800 || isRank1;
      }
      return makerTier.name === selectedTier;
    })
    .slice(0, 10);

  // Calculate count per tier for badges
  const getTierCount = (tierName: TierFilter) => {
    if (tierName === 'All') {
      return sortedMakers.filter((m, idx) => m.points >= 800 || idx === 0).length;
    }
    return sortedMakers.filter((m) => {
      const idx = sortedMakers.findIndex(x => x.handle === m.handle);
      return getBadgeTier(m.points, idx === 0).name === tierName;
    }).length;
  };

  // Top products sorted by upvotes (weekly) or points (alltime)
  const topProducts = [...posts]
    .sort((a, b) => (timeframe === 'weekly' ? b.upvotes - a.upvotes : b.points - a.points))
    .slice(0, 5);

  // Calculate top upvoted product all-time
  const mostUpvotedProduct = [...posts]
    .sort((a, b) => b.upvotes - a.upvotes)[0];

  // Calculate top upvoted post overall (including comments or discussion posts)
  const mostUpvotedPostOverall = [...posts]
    .sort((a, b) => (b.upvotes + b.commentCount) - (a.upvotes + a.commentCount))[0];

  const TIER_TABS: { id: TierFilter; label: string; minPoints: string; color: string; activeClass: string; icon: any }[] = [
    { id: 'All', label: 'All (Gold+ Top 10)', minPoints: '800+ pts', color: 'text-[#2563EB]', activeClass: 'bg-[#2563EB] text-white shadow-xs font-bold', icon: Users },
    { id: 'Legendary', label: 'Legendary', minPoints: '4000+ pts', color: 'text-red-500', activeClass: 'bg-gradient-to-r from-red-600 via-rose-600 to-amber-500 text-white shadow-xs animate-pulse font-black', icon: Crown },
    { id: 'Diamond', label: 'Diamond', minPoints: '2500–3999 pts', color: 'text-sky-400', activeClass: 'bg-gradient-to-r from-sky-400 via-indigo-400 to-cyan-300 text-white shadow-xs font-bold', icon: Gem },
    { id: 'Platinum', label: 'Platinum', minPoints: '1500–2499 pts', color: 'text-purple-500', activeClass: 'bg-gradient-to-r from-purple-600 to-cyan-500 text-white shadow-xs font-bold', icon: ShieldCheck },
    { id: 'Gold', label: 'Gold', minPoints: '800–1499 pts', color: 'text-amber-500', activeClass: 'bg-[#FFD700] text-black font-extrabold shadow-xs', icon: Trophy }
  ];

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

      {/* Featured Callout Banners: Most Upvoted Product & Post Overall */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {mostUpvotedProduct && (
          <div
            onClick={() => setSelectedPost(mostUpvotedProduct)}
            className="p-5 rounded-2xl bg-gradient-to-br from-[#2563EB]/10 via-[#2563EB]/5 to-transparent border border-[#2563EB]/30 hover:border-[#2563EB] cursor-pointer transition-all space-y-3 group shadow-xs"
          >
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-1 rounded-lg bg-[#2563EB]/15 text-[#2563EB] text-[10px] font-black uppercase tracking-wider flex items-center gap-1">
                <Crown className="w-3 h-3 fill-[#2563EB] text-[#2563EB]" />
                <span>Most Upvoted Product All-Time</span>
              </span>
              <div className="flex items-center gap-1 text-xs font-black text-[#2563EB]">
                <ArrowUp className="w-3.5 h-3.5" />
                <span>{mostUpvotedProduct.upvotes} Upvotes</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <img
                src={mostUpvotedProduct.logoUrl}
                alt={mostUpvotedProduct.title}
                className="w-10 h-10 rounded-xl object-cover border border-[#2563EB]/30"
              />
              <div className="min-w-0 flex-1">
                <h3 className="text-xs font-extrabold text-[#1A1A1B] dark:text-[#F5F5F5] group-hover:text-[#2563EB] transition-colors truncate">
                  {mostUpvotedProduct.title}
                </h3>
                <p className="text-[11px] text-[#1A1A1B]/60 dark:text-[#F5F5F5]/60 truncate">
                  {mostUpvotedProduct.tagline}
                </p>
              </div>
            </div>
          </div>
        )}

        {mostUpvotedPostOverall && (
          <div
            onClick={() => setSelectedPost(mostUpvotedPostOverall)}
            className="p-5 rounded-2xl bg-gradient-to-br from-[#2563EB]/10 via-[#2563EB]/5 to-transparent border border-[#2563EB]/30 hover:border-[#2563EB] cursor-pointer transition-all space-y-3 group shadow-xs"
          >
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-1 rounded-lg bg-[#2563EB]/20 text-[#2563EB] text-[10px] font-black uppercase tracking-wider flex items-center gap-1">
                <Flame className="w-3 h-3 text-[#2563EB]" />
                <span>Most Upvoted Post Overall</span>
              </span>
              <div className="flex items-center gap-1 text-xs font-black text-[#2563EB]">
                <ArrowUp className="w-3.5 h-3.5" />
                <span>{mostUpvotedPostOverall.upvotes} Upvotes</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <img
                src={mostUpvotedPostOverall.maker.avatar}
                alt={mostUpvotedPostOverall.maker.name}
                className="w-10 h-10 rounded-full object-cover border border-[#2563EB]/30"
              />
              <div className="min-w-0 flex-1">
                <h3 className="text-xs font-extrabold text-[#1A1A1B] dark:text-[#F5F5F5] group-hover:text-[#2563EB] transition-colors truncate">
                  {mostUpvotedPostOverall.title}
                </h3>
                <p className="text-[11px] text-[#1A1A1B]/60 dark:text-[#F5F5F5]/60 truncate">
                  by {mostUpvotedPostOverall.maker.name} • {mostUpvotedPostOverall.commentCount} comments
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Tier Filter Tabs Bar (All -> Legendary -> Diamond -> Platinum -> Gold -> Silver -> Bronze) */}
      <div className="bg-white dark:bg-[#0E0E10] border border-[#E5E5E5] dark:border-[#2A2A2C] rounded-2xl p-3 sm:p-4 space-y-2 shadow-xs">
        <div className="flex items-center justify-between px-1">
          <span className="text-xs font-bold text-[#1A1A1B]/60 dark:text-[#F5F5F5]/60 uppercase tracking-wider">
            Filter Leaderboard By Tier
          </span>
          <span className="text-[11px] font-semibold text-[#2563EB]">
            {selectedTier === 'All' ? `Showing All ${sortedMakers.length} Makers` : `Showing ${filteredMakers.length} ${selectedTier} Tier Maker${filteredMakers.length !== 1 ? 's' : ''}`}
          </span>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {TIER_TABS.map((tab) => {
            const Icon = tab.icon;
            const isSelected = selectedTier === tab.id;
            const count = getTierCount(tab.id);

            return (
              <button
                key={tab.id}
                onClick={() => setSelectedTier(tab.id)}
                className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs transition-all shrink-0 cursor-pointer ${
                  isSelected
                    ? tab.activeClass
                    : 'bg-[#F6F7F8] dark:bg-[#1A1A1B] text-[#1A1A1B]/70 dark:text-[#F5F5F5]/70 hover:bg-[#E5E5E5]/60 dark:hover:bg-[#2A2A2C]'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-current' : tab.color}`} />
                <span className="font-bold">{tab.label}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-extrabold ${
                  isSelected ? 'bg-black/20 text-white' : 'bg-black/5 dark:bg-white/10 text-[#1A1A1B]/60 dark:text-[#F5F5F5]/60'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
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
                        ? 'bg-red-500 text-white shadow-xs ring-2 ring-red-500/50'
                        : index === 1
                        ? 'bg-slate-300 text-black ring-2 ring-slate-300/50'
                        : index === 2
                        ? 'bg-amber-600 text-white ring-2 ring-amber-600/50'
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

        {/* Top Community Makers Column with Distinct Top 3 Highlights & Tier Filter */}
        <div className="space-y-4">
          <div className="bg-white dark:bg-[#0E0E10] border border-[#E5E5E5] dark:border-[#2A2A2C] rounded-2xl p-6 space-y-4">
            <h3 className="text-sm font-bold text-[#1A1A1B] dark:text-[#F5F5F5] flex items-center justify-between">
              <span className="flex items-center gap-2">
                <Award className="w-4 h-4 text-[#2563EB]" />
                <span>Top Community Makers</span>
              </span>
              {selectedTier !== 'All' && (
                <button
                  onClick={() => setSelectedTier('All')}
                  className="text-[10px] text-[#2563EB] font-bold hover:underline"
                >
                  Reset Filter
                </button>
              )}
            </h3>

            <div className="space-y-3">
              {filteredMakers.length === 0 ? (
                <div className="p-6 text-center text-xs text-[#1A1A1B]/50 dark:text-[#F5F5F5]/50 space-y-1 bg-[#F6F7F8] dark:bg-[#1A1A1B] rounded-xl border border-dashed border-[#E5E5E5] dark:border-[#2A2A2C]">
                  <Trophy className="w-6 h-6 mx-auto opacity-30 text-[#2563EB]" />
                  <p className="font-bold">No makers in {selectedTier} Tier yet</p>
                  <p className="text-[10px]">Earn more Panda Points by launching & commenting to rank up!</p>
                </div>
              ) : (
                filteredMakers.map((maker) => {
                  const overallRankIndex = sortedMakers.findIndex(m => m.handle === maker.handle);
                  const isRank1 = overallRankIndex === 0;
                  const isRank2 = overallRankIndex === 1;
                  const isRank3 = overallRankIndex === 2;
                  const tier = getBadgeTier(maker.points, isRank1);

                  let highlightStyle = 'bg-[#F6F7F8] dark:bg-[#1A1A1B] border border-[#E5E5E5] dark:border-[#2A2A2C]';
                  if (isRank1) {
                    highlightStyle = 'bg-gradient-to-r from-red-500/20 via-rose-500/15 to-amber-500/10 border-2 border-red-500 shadow-md ring-2 ring-red-500/40';
                  } else if (isRank2) {
                    highlightStyle = 'bg-gradient-to-r from-slate-400/25 via-slate-300/20 to-slate-200/15 border-2 border-slate-400 dark:border-slate-300 shadow-md ring-2 ring-slate-400/40';
                  } else if (isRank3) {
                    highlightStyle = 'bg-gradient-to-r from-amber-600/20 via-amber-500/15 to-yellow-600/10 border-2 border-amber-600 shadow-md ring-2 ring-amber-600/40';
                  }

                  return (
                    <div
                      key={maker.handle}
                      className={`p-3 rounded-xl flex items-center justify-between gap-3 transition-all ${highlightStyle}`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <span className={`text-xs font-black w-5 text-center shrink-0 ${
                          isRank1
                            ? 'text-red-500 font-black'
                            : isRank2
                            ? 'text-slate-400 font-black'
                            : isRank3
                            ? 'text-amber-600 font-black'
                            : 'text-[#1A1A1B]/40 dark:text-[#F5F5F5]/40'
                        }`}>
                          #{overallRankIndex + 1}
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
                                <span title="Rank #1 Legendary">
                                  <Crown className="w-3.5 h-3.5 text-red-500 fill-red-500 shrink-0" />
                                </span>
                              )}
                              {isRank2 && (
                                <span title="Rank #2 Silver Podium">
                                  <Trophy className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                                </span>
                              )}
                              {isRank3 && (
                                <span title="Rank #3 Bronze Podium">
                                  <Award className="w-3.5 h-3.5 text-amber-600 shrink-0" />
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
                })
              )}
            </div>
          </div>

          {/* Points Rules & Tier Ladder Box */}
          <div className="p-4 rounded-2xl bg-[#2563EB]/10 border border-[#2563EB]/20 text-[#1A1A1B] dark:text-[#F5F5F5] space-y-3">
            <div>
              <h4 className="text-xs font-bold text-[#2563EB] flex items-center gap-1.5 mb-1.5">
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

            <div className="pt-2 border-t border-[#2563EB]/20 space-y-1.5">
              <h5 className="text-[11px] font-bold text-[#1A1A1B] dark:text-[#F5F5F5]">
                6-Tier Creator Ladder
              </h5>
              <div className="grid grid-cols-2 gap-1 text-[10px] text-[#1A1A1B]/80 dark:text-[#F5F5F5]/80">
                <div>• <strong className="text-[#A97142]">Bronze:</strong> 0–299 pts</div>
                <div>• <strong className="text-slate-400">Silver:</strong> 300–799 pts</div>
                <div>• <strong className="text-amber-500">Gold:</strong> 800–1499 pts</div>
                <div>• <strong className="text-purple-500">Platinum:</strong> 1500–2499 pts</div>
                <div>• <strong className="text-sky-400">Diamond:</strong> 2500–3999 pts</div>
                <div>• <strong className="text-red-500">Legendary:</strong> 4000+ pts 👑</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
