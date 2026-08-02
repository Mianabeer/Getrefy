import React from 'react';
import { ProductPost } from '../types';
import { useApp } from '../context/AppContext';
import { ArrowUp, MessageSquare, Share2, Bookmark, ExternalLink, ShieldCheck, Crown } from 'lucide-react';
import { UserAvatar } from './UserAvatar';

interface PostCardProps {
  post: ProductPost;
}

export const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const { upvotePost, setSelectedPost, toggleBookmark, bookmarks, showToast, userProfile } = useApp();
  const isBookmarked = bookmarks.includes(post.id);

  const handleShare = async (e: React.MouseEvent) => {
    e.stopPropagation();
    const shareUrl = `${window.location.origin}/?post=${post.id}`;
    const shareText = `Check out ${post.title} on Getrefy 🐼`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: post.title,
          text: shareText,
          url: shareUrl
        });
        return;
      } catch (err) {
        // Native share dismissed or unsupported, proceed to clipboard
      }
    }

    try {
      await navigator.clipboard.writeText(shareUrl);
      showToast('Link Copied!', `Getrefy link for "${post.title}" copied to clipboard!`, 'success');
    } catch (err) {
      showToast('Copy Failed', 'Please copy URL from browser address bar.', 'error');
    }
  };

  const isFeatured = post.isPandaChoice || post.isFeatured;
  const isCurrentUser = post.maker.handle === userProfile?.handle;
  const streakDays = (isCurrentUser && userProfile?.streakDays !== undefined)
    ? userProfile.streakDays
    : (post.maker.streakDays || 0);

  const isLegendMaker = post.maker.handle === '@mthorne';

  return (
    <article
      onClick={() => setSelectedPost(post)}
      className={`p-5 rounded-2xl transition-all cursor-pointer group shadow-2xs space-y-3.5 relative overflow-hidden ${
        isFeatured
          ? 'bg-gradient-to-br from-white via-white to-[#2563EB]/5 dark:from-[#0E0E10] dark:via-[#0E0E10] dark:to-[#2563EB]/10 border-2 border-[#2563EB]/50 shadow-md'
          : 'bg-white dark:bg-[#0E0E10] border border-[#E5E5E5] dark:border-[#2A2A2C] hover:border-[#2563EB]/40'
      }`}
    >
      {/* Top Header Row: Category Badge + Maker Meta */}
      <div className="flex items-center justify-between gap-2 text-xs">
        <div className="flex items-center gap-2 flex-wrap">
          {isFeatured && (
            <span className="px-2.5 py-0.5 rounded-full bg-gradient-to-r from-[#2563EB] to-purple-600 text-white font-black text-[10px] tracking-wide flex items-center gap-1 shadow-xs">
              <span>🐼 PANDA CHOICE</span>
            </span>
          )}

          <span className="px-2.5 py-0.5 rounded-md bg-[#2563EB]/10 text-[#2563EB] dark:text-[#60A5FA] font-bold text-[11px]">
            {post.category}
          </span>

          <span className="text-[#1A1A1B]/40 dark:text-[#F5F5F5]/40">•</span>

          <div className="flex items-center gap-1.5 text-[#1A1A1B]/70 dark:text-[#F5F5F5]/70 text-[11px]">
            <UserAvatar
              src={post.maker.avatar}
              alt={post.maker.name}
              points={post.points}
              isRank1={isLegendMaker}
              size="xs"
            />
            <span className="font-semibold text-[#1A1A1B] dark:text-[#F5F5F5] flex items-center gap-1">
              {post.maker.name}
              {isLegendMaker && (
                <span title="Rank #1 Legend">
                  <Crown className="w-3 h-3 text-amber-500 fill-amber-500 inline shrink-0" />
                </span>
              )}
            </span>
            {post.maker.isVerifiedMaker && (
              <span title="Verified Maker">
                <ShieldCheck className="w-3 h-3 text-[#2563EB]" />
              </span>
            )}
            {streakDays > 0 && (
              <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-md bg-amber-500/10 text-amber-600 dark:text-amber-400 font-bold text-[10px]" title={`${streakDays} Day Streak`}>
                🔥 {streakDays}d
              </span>
            )}
            <span className="text-[#1A1A1B]/40 dark:text-[#F5F5F5]/40">{post.createdAt}</span>
          </div>
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleBookmark(post.id);
          }}
          className={`p-1.5 rounded-lg text-[#1A1A1B]/40 dark:text-[#F5F5F5]/40 hover:text-[#2563EB] transition-colors ${
            isBookmarked ? 'text-[#2563EB] fill-[#2563EB]' : ''
          }`}
          title="Bookmark Post"
        >
          <Bookmark className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* 1. Title at top (bold, larger text) */}
      <div className="space-y-1">
        <h2 className="text-base sm:text-lg font-bold text-[#1A1A1B] dark:text-[#F5F5F5] leading-snug group-hover:text-[#2563EB] transition-colors">
          {post.title}
        </h2>

        {/* 2. Body/preview text below the title (regular weight, gray, 1-2 lines) */}
        <p className="text-xs sm:text-sm text-[#1A1A1B]/70 dark:text-[#F5F5F5]/70 line-clamp-2 leading-relaxed">
          {post.tagline} — {post.description}
        </p>
      </div>

      {/* Optional image preview if available */}
      {(post.imageUrl || (post.screenshots && post.screenshots[0])) && (
        <div className="rounded-xl overflow-hidden bg-[#F6F7F8] dark:bg-[#1A1A1B] border border-[#E5E5E5] dark:border-[#2A2A2C] max-h-56 sm:max-h-64 aspect-[16/9] w-full">
          <img
            src={post.imageUrl || post.screenshots![0]}
            alt={post.title}
            className="w-full h-full max-h-56 sm:max-h-64 object-cover rounded-xl group-hover:scale-[1.01] transition-transform duration-300"
          />
        </div>
      )}

      {/* 3. Bottom Row: upvote arrow + count, comment icon + count, share icon in one row under post */}
      <div className="flex items-center justify-between pt-2 border-t border-[#E5E5E5]/60 dark:border-[#2A2A2C]/60 text-xs">
        <div className="flex items-center gap-3">
          {/* Upvote Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              upvotePost(post.id);
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              post.userUpvoted
                ? 'bg-[#2563EB] text-white shadow-xs'
                : 'bg-[#F6F7F8] dark:bg-[#1A1A1B] text-[#1A1A1B] dark:text-[#F5F5F5] hover:bg-[#2563EB]/10 hover:text-[#2563EB]'
            }`}
          >
            <ArrowUp className={`w-4 h-4 ${post.userUpvoted ? 'stroke-[2.5]' : ''}`} />
            <span>{post.upvotes}</span>
          </button>

          {/* Comment Count */}
          <button
            onClick={() => setSelectedPost(post)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#F6F7F8] dark:bg-[#1A1A1B] text-[#1A1A1B]/70 dark:text-[#F5F5F5]/70 hover:text-[#1A1A1B] dark:hover:text-[#F5F5F5] text-xs font-semibold transition-colors"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>{post.commentCount} {post.commentCount === 1 ? 'comment' : 'comments'}</span>
          </button>

          {/* Share Button */}
          <button
            onClick={handleShare}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#F6F7F8] dark:bg-[#1A1A1B] text-[#1A1A1B]/70 dark:text-[#F5F5F5]/70 hover:text-[#1A1A1B] dark:hover:text-[#F5F5F5] text-xs font-semibold transition-colors"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Share</span>
          </button>
        </div>

        {/* Direct Link to App */}
        <a
          href={post.productUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="flex items-center gap-1 text-[11px] font-bold text-[#2563EB] hover:underline"
        >
          <span>Visit Website</span>
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>
    </article>
  );
};
