import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { useAuth } from '../context/AuthContext';
import { TOP_MAKERS } from '../data/mockData';
import { Flame, Award, ArrowUp, Rocket, ShieldCheck, PlusSquare, MessageSquare, FileText, Edit3, Loader2, LogIn, Trophy, Star } from 'lucide-react';
import { PostCard } from './PostCard';
import { UserAvatar, getBadgeTier, getNextTierProgress } from './UserAvatar';
import { PandaMascot } from './PandaMascot';

export const ProfileView: React.FC = () => {
  const { userProfile, posts, setActiveView } = useApp();
  const { user, loading: authLoading, openAuthModal } = useAuth();
  const [activeTab, setActiveTab] = useState<'posts' | 'comments'>('posts');


  useEffect(() => {
    if (!authLoading && !user) {
      setActiveView('home');
      openAuthModal();
    }
  }, [user, authLoading, setActiveView, openAuthModal]);

  if (authLoading) {
    return (
      <div className="p-8 text-center flex flex-col items-center justify-center min-h-[300px]">
        <Loader2 className="w-8 h-8 animate-spin text-[#2563EB]" />
        <p className="text-xs text-[#1A1A1B]/60 dark:text-[#F5F5F5]/60 mt-2 font-medium">
          Loading creator profile...
        </p>
      </div>
    );
  }

  if (!user || !userProfile) {
    return (
      <div className="p-8 text-center flex flex-col items-center justify-center min-h-[300px] space-y-3">
        <LogIn className="w-10 h-10 text-[#2563EB]" />
        <h3 className="text-base font-bold text-[#1A1A1B] dark:text-[#F5F5F5]">
          Authentication Required
        </h3>
        <p className="text-xs text-[#1A1A1B]/60 dark:text-[#F5F5F5]/60 max-w-sm">
          Please sign in to view and manage your creator profile, track Panda points, and view your launched apps.
        </p>
        <button
          onClick={openAuthModal}
          className="px-4 py-2 rounded-xl bg-[#2563EB] text-white font-bold text-xs shadow-md shadow-blue-500/20"
        >
          Sign In / Sign Up
        </button>
      </div>
    );
  }

  const userPosts = posts.filter(p => (p.maker.name || '').includes('You') || p.maker.handle === userProfile.handle);

  // Safely extract all comments made by the user across all posts
  const userComments = posts.flatMap(p =>
    (p.comments || [])
      .filter(c => (c.authorName || '').includes('You') || c.authorHandle === userProfile.handle)
      .map(c => ({ ...c, postTitle: p.title, postId: p.id, post: p }))
  );

  const isRank1 = TOP_MAKERS.length > 0 && TOP_MAKERS[0].handle === userProfile.handle;
  const tier = getBadgeTier(userProfile.points, isRank1);

  return (
    <div className="p-4 sm:p-6 max-w-5xl mx-auto space-y-6">
      {/* Profile Header Box */}
      <div className="p-6 rounded-2xl bg-[#F6F7F8] dark:bg-[#1A1A1B] border border-[#E5E5E5] dark:border-[#2A2A2C] space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            {/* Badge Tier Ringed Avatar */}
            <UserAvatar
              src={userProfile.avatar}
              alt={userProfile.name}
              points={userProfile.points}
              isRank1={isRank1}
              size="xl"
            />

            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-black text-[#1A1A1B] dark:text-[#F5F5F5]">
                  {userProfile.name}
                </h1>
                <span title="Verified Developer Creator">
                  <ShieldCheck className="w-5 h-5 text-[#2563EB]" />
                </span>
              </div>
              <p className="text-xs font-semibold text-[#2563EB]">
                {userProfile.handle} • {userProfile.role} • <span className="font-bold text-[#1A1A1B] dark:text-[#F5F5F5]">{tier.label}</span>
              </p>
              <p className="text-xs text-[#1A1A1B]/70 dark:text-[#F5F5F5]/70 mt-1 max-w-md">
                {userProfile.bio}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0 self-start sm:self-center">
            {/* Edit Profile Button */}
            <button
              onClick={() => setActiveView('settings')}
              className="px-3.5 py-2.5 rounded-xl bg-white dark:bg-[#0E0E10] border border-[#E5E5E5] dark:border-[#2A2A2C] text-[#1A1A1B] dark:text-[#F5F5F5] font-bold text-xs hover:border-[#2563EB] transition-colors flex items-center gap-1.5 shadow-xs"
            >
              <Edit3 className="w-4 h-4 text-[#2563EB]" />
              <span>Edit Profile</span>
            </button>

            <button
              onClick={() => setActiveView('submit')}
              className="px-4 py-2.5 rounded-xl bg-[#2563EB] text-white font-bold text-xs hover:bg-[#2563EB]/90 transition-colors flex items-center gap-2 shadow-xs"
            >
              <PlusSquare className="w-4 h-4" />
              <span>Launch App</span>
            </button>
          </div>
        </div>

        {/* Stats Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-[#E5E5E5] dark:border-[#2A2A2C]">
          <div className="p-3 rounded-xl bg-white dark:bg-[#0E0E10] border border-[#E5E5E5] dark:border-[#2A2A2C]">
            <span className="block text-[10px] font-bold text-[#1A1A1B]/50 dark:text-[#F5F5F5]/50 uppercase">
              Panda Points
            </span>
            <span className="text-lg font-black text-[#2563EB]">
              {userProfile.points} pts
            </span>
          </div>

          <div className="p-3 rounded-xl bg-white dark:bg-[#0E0E10] border border-[#E5E5E5] dark:border-[#2A2A2C]">
            <span className="block text-[10px] font-bold text-[#1A1A1B]/50 dark:text-[#F5F5F5]/50 uppercase">
              Daily Streak
            </span>
            <span className="text-lg font-black text-amber-500 flex items-center gap-1">
              <Flame className="w-4 h-4 fill-amber-500" />
              <span>{userProfile.streakDays} Days</span>
            </span>
          </div>

          <div className="p-3 rounded-xl bg-white dark:bg-[#0E0E10] border border-[#E5E5E5] dark:border-[#2A2A2C]">
            <span className="block text-[10px] font-bold text-[#1A1A1B]/50 dark:text-[#F5F5F5]/50 uppercase">
              Products Launched
            </span>
            <span className="text-lg font-black text-[#1A1A1B] dark:text-[#F5F5F5]">
              {userProfile.launchedCount}
            </span>
          </div>

          <div className="p-3 rounded-xl bg-white dark:bg-[#0E0E10] border border-[#E5E5E5] dark:border-[#2A2A2C]">
            <span className="block text-[10px] font-bold text-[#1A1A1B]/50 dark:text-[#F5F5F5]/50 uppercase">
              Upvotes Received
            </span>
            <span className="text-lg font-black text-[#1A1A1B] dark:text-[#F5F5F5]">
              {userProfile.totalUpvotesReceived}
            </span>
          </div>
        </div>

        {/* Tier Progress Bar Card */}
        {(() => {
          const progress = getNextTierProgress(userProfile.points);
          return (
            <div className="p-4 rounded-xl bg-white dark:bg-[#0E0E10] border border-[#E5E5E5] dark:border-[#2A2A2C] space-y-2 mt-4">
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="text-[#1A1A1B] dark:text-[#F5F5F5] flex items-center gap-1.5">
                  <span>Current Status:</span>
                  <span className="px-2 py-0.5 rounded bg-[#2563EB]/10 text-[#2563EB] text-[11px] font-black">
                    {tier.label}
                  </span>
                </span>
                <span className="text-[#2563EB]">
                  {progress.pointsNeeded > 0
                    ? `${progress.pointsNeeded} pts to ${progress.nextTier}`
                    : 'Max Tier Unlocked!'}
                </span>
              </div>

              {/* Progress Track */}
              <div className="w-full bg-[#F6F7F8] dark:bg-[#1A1A1B] border border-[#E5E5E5] dark:border-[#2A2A2C] h-3 rounded-full overflow-hidden p-0.5">
                <div
                  className="bg-gradient-to-r from-[#2563EB] via-indigo-500 to-purple-500 h-full rounded-full transition-all duration-500"
                  style={{ width: `${progress.percentage}%` }}
                />
              </div>

              <div className="flex items-center justify-between text-[10px] font-semibold text-[#1A1A1B]/50 dark:text-[#F5F5F5]/50">
                <span>{userProfile.points} Panda Points</span>
                <span>{progress.percentage}% towards {progress.nextTier}</span>
              </div>
            </div>
          );
        })()}
      </div>


      {/* Earned Creator Badges Grid */}
      {(() => {
        const allBadgesList = [
          {
            id: 'b1',
            name: 'First Launch',
            description: 'Published your first product on Getrefy',
            icon: Rocket,
            unlocked: userProfile.launchedCount >= 1 || userProfile.badges.some(b => b.name === 'First Launch'),
            dateEarned: 'Aug 2026'
          },
          {
            id: 'b2',
            name: '7-Day Streak',
            description: 'Active on Getrefy for 7 consecutive days',
            icon: Flame,
            unlocked: userProfile.streakDays >= 7 || userProfile.badges.some(b => b.name === '7-Day Streak'),
            dateEarned: 'Aug 2026'
          },
          {
            id: 'b3',
            name: 'Top 10 Maker',
            description: 'Reached top 10 on the weekly launch leaderboard',
            icon: Trophy,
            unlocked: userProfile.points >= 500 || userProfile.badges.some(b => b.name === 'Top 10 Maker'),
            dateEarned: 'Aug 2026'
          },
          {
            id: 'b4',
            name: 'Community Supporter',
            description: 'Left constructive feedback comments on products',
            icon: MessageSquare,
            unlocked: userComments.length >= 2 || userProfile.badges.some(b => b.name === 'Community Supporter'),
            dateEarned: 'Aug 2026'
          },
          {
            id: 'b5',
            name: 'Panda Verified',
            description: 'Verified developer creator profile',
            icon: ShieldCheck,
            unlocked: true,
            dateEarned: 'Aug 2026'
          },
          {
            id: 'b6',
            name: 'Rising Star',
            description: 'First product to reach 50+ community upvotes',
            icon: Star,
            unlocked: userPosts.some(p => p.upvotes >= 50) || userProfile.totalUpvotesReceived >= 50,
            dateEarned: userPosts.some(p => p.upvotes >= 50) ? 'Recently' : undefined
          },
          {
            id: 'b7',
            name: 'Conversation Starter',
            description: 'Left a feedback comment that received 10+ upvotes/replies',
            icon: MessageSquare,
            unlocked: userComments.some(c => c.upvotes >= 10),
            dateEarned: userComments.some(c => c.upvotes >= 10) ? 'Recently' : undefined
          },
          {
            id: 'b8',
            name: 'Helpful Hand',
            description: 'Left feedback on 25+ different launched products',
            icon: ShieldCheck,
            unlocked: userComments.length >= 25,
            dateEarned: userComments.length >= 25 ? 'Recently' : undefined
          },
          {
            id: 'b9',
            name: 'Consistent Creator',
            description: 'Successfully launched 3+ software products',
            icon: PlusSquare,
            unlocked: userProfile.launchedCount >= 3,
            dateEarned: userProfile.launchedCount >= 3 ? 'Recently' : undefined
          },
          {
            id: 'b10',
            name: '30-Day Streak',
            description: 'Maintained active 30-day continuous daily streak',
            icon: Flame,
            unlocked: userProfile.streakDays >= 30,
            dateEarned: userProfile.streakDays >= 30 ? 'Recently' : undefined
          }
        ];

        const unlockedCount = allBadgesList.filter(b => b.unlocked).length;

        return (
          <div className="bg-white dark:bg-[#0E0E10] border border-[#E5E5E5] dark:border-[#2A2A2C] rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-[#1A1A1B] dark:text-[#F5F5F5] flex items-center gap-2">
                <Award className="w-4 h-4 text-[#2563EB]" />
                <span>Earned Creator Badges ({unlockedCount}/{allBadgesList.length})</span>
              </h3>
              <span className="text-[11px] text-[#2563EB] font-bold">
                {Math.round((unlockedCount / allBadgesList.length) * 100)}% Unlocked
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {allBadgesList.map((badge) => {
                const IconComp = badge.icon;
                return (
                  <div
                    key={badge.id}
                    className={`p-3.5 rounded-xl border flex items-center gap-3 transition-all ${
                      badge.unlocked
                        ? 'bg-[#F6F7F8] dark:bg-[#1A1A1B] border-[#2563EB]/30'
                        : 'bg-black/5 dark:bg-white/5 border-transparent opacity-50 grayscale'
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                      badge.unlocked
                        ? 'bg-[#2563EB]/10 text-[#2563EB]'
                        : 'bg-gray-200 dark:bg-gray-800 text-gray-500'
                    }`}>
                      <IconComp className="w-5 h-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-1">
                        <h4 className="font-bold text-xs text-[#1A1A1B] dark:text-[#F5F5F5] truncate">
                          {badge.name}
                        </h4>
                        {!badge.unlocked && (
                          <span className="text-[9px] px-1.5 py-0.5 rounded bg-gray-200 dark:bg-gray-800 text-gray-500 font-bold uppercase">
                            Locked
                          </span>
                        )}
                      </div>
                      <p className="text-[10px] text-[#1A1A1B]/60 dark:text-[#F5F5F5]/60 line-clamp-2 mt-0.5">
                        {badge.description}
                      </p>
                      {badge.unlocked && badge.dateEarned && (
                        <span className="text-[9px] text-[#2563EB] font-semibold mt-1 block">
                          Earned {badge.dateEarned}
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })()}

      {/* Posts & Comments Navigation Tabs */}
      <div className="space-y-4">
        <div className="flex items-center border-b border-[#E5E5E5] dark:border-[#2A2A2C]">
          <button
            onClick={() => setActiveTab('posts')}
            className={`pb-3 px-4 text-xs font-bold border-b-2 transition-all flex items-center gap-2 ${
              activeTab === 'posts'
                ? 'border-[#2563EB] text-[#2563EB]'
                : 'border-transparent text-[#1A1A1B]/60 dark:text-[#F5F5F5]/60 hover:text-[#1A1A1B] dark:hover:text-[#F5F5F5]'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Posts ({userPosts.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('comments')}
            className={`pb-3 px-4 text-xs font-bold border-b-2 transition-all flex items-center gap-2 ${
              activeTab === 'comments'
                ? 'border-[#2563EB] text-[#2563EB]'
                : 'border-transparent text-[#1A1A1B]/60 dark:text-[#F5F5F5]/60 hover:text-[#1A1A1B] dark:hover:text-[#F5F5F5]'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span>Comments ({userComments.length})</span>
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === 'posts' ? (
          userPosts.length === 0 ? (
            <div className="p-8 text-center rounded-2xl bg-white dark:bg-[#0E0E10] border border-[#E5E5E5] dark:border-[#2A2A2C]">
              <PandaMascot
                mood="empty"
                size="md"
                title="No Products Launched Yet"
                subtitle="Ready to show the world what you built? Submit your app to earn points and upvotes!"
                actionLabel="Submit Your App Now"
                onAction={() => setActiveView('submit')}
              />
            </div>
          ) : (
            <div className="space-y-4">
              {userPosts.map(post => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          )
        ) : (
          userComments.length === 0 ? (
            <div className="p-8 text-center rounded-2xl bg-white dark:bg-[#0E0E10] border border-[#E5E5E5] dark:border-[#2A2A2C]">
              <PandaMascot
                mood="idle"
                size="md"
                title="No Comments Yet"
                subtitle="Join developer discussions on launched products to earn streak bonuses and points!"
                actionLabel="Explore Home Feed"
                onAction={() => setActiveView('home')}
              />
            </div>
          ) : (
            <div className="space-y-3">
              {userComments.map(comment => (
                <div
                  key={comment.id}
                  className="p-4 rounded-xl bg-white dark:bg-[#0E0E10] border border-[#E5E5E5] dark:border-[#2A2A2C] space-y-2"
                >
                  <div className="flex items-center justify-between text-xs text-[#1A1A1B]/60 dark:text-[#F5F5F5]/60">
                    <span>Commented on <strong className="text-[#2563EB]">{comment.postTitle}</strong></span>
                    <span>{comment.createdAt || 'Recently'}</span>
                  </div>
                  <p className="text-xs text-[#1A1A1B] dark:text-[#F5F5F5] font-medium leading-relaxed">
                    "{comment.content}"
                  </p>
                  <div className="text-[10px] font-bold text-[#2563EB] flex items-center gap-1">
                    <ArrowUp className="w-3 h-3" />
                    <span>{comment.upvotes} upvotes on comment</span>
                  </div>
                </div>
              ))}
            </div>
          )
        )}
      </div>
    </div>
  );
};
