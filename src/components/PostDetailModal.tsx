import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { UserAvatar, getBadgeTier } from './UserAvatar';
import { PandaMascot } from './PandaMascot';
import {
  X,
  ExternalLink,
  ArrowUp,
  MessageSquare,
  Share2,
  Lock,
  Globe,
  Send,
  ShieldCheck,
  Sparkles,
  Award,
  Crown
} from 'lucide-react';

export const PostDetailModal: React.FC<{ onOpenAiAdvisorForPost?: (post: any) => void }> = ({
  onOpenAiAdvisorForPost
}) => {
  const { selectedPost, setSelectedPost, upvotePost, addComment, upvoteComment, showToast, userProfile } = useApp();

  const [commentText, setCommentText] = useState('');
  const [isPrivateFeedback, setIsPrivateFeedback] = useState(false);

  if (!selectedPost) return null;

  const mainImage = selectedPost.imageUrl || (selectedPost.screenshots && selectedPost.screenshots[0]);
  const galleryScreenshots = selectedPost.screenshots
    ? selectedPost.screenshots.filter((img) => img !== mainImage)
    : [];

  const handleSendComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    addComment(selectedPost.id, commentText, isPrivateFeedback);
    showToast('Comment Posted! 💬', 'Thank you for giving maker feedback (+5 points earned).', 'panda');
    setCommentText('');
  };

  const handleShare = () => {
    navigator.clipboard.writeText(selectedPost.productUrl);
    showToast('Link Copied!', 'Product URL copied to clipboard.', 'success');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl max-h-[90vh] flex flex-col rounded-2xl bg-white dark:bg-[#0E0E10] border border-[#E5E5E5] dark:border-[#2A2A2C] shadow-2xl overflow-hidden">
        {/* Top Header Bar */}
        <div className="flex items-center justify-between p-4 px-6 border-b border-[#E5E5E5] dark:border-[#2A2A2C] bg-[#F6F7F8]/50 dark:bg-[#1A1A1B]/50 shrink-0">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-md bg-[#2563EB]/10 text-[#2563EB] font-bold text-xs">
              {selectedPost.category}
            </span>
            <span className="text-xs text-[#1A1A1B]/50 dark:text-[#F5F5F5]/50">•</span>
            <span className="text-xs text-[#1A1A1B]/70 dark:text-[#F5F5F5]/70">
              Launched {selectedPost.createdAt}
            </span>
          </div>

          <button
            onClick={() => setSelectedPost(null)}
            className="p-1.5 rounded-xl text-[#1A1A1B]/50 hover:text-[#1A1A1B] dark:text-[#F5F5F5]/50 dark:hover:text-[#F5F5F5] hover:bg-[#E5E5E5] dark:hover:bg-[#2A2A2C] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Title & Maker Row */}
          <div className="space-y-3">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h1 className="text-xl sm:text-2xl font-black text-[#1A1A1B] dark:text-[#F5F5F5] leading-tight">
                  {selectedPost.title}
                </h1>
                <p className="text-xs sm:text-sm font-semibold text-[#2563EB] mt-1">
                  {selectedPost.tagline}
                </p>
              </div>

              <a
                href={selectedPost.productUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 rounded-xl bg-[#2563EB] text-white font-bold text-xs flex items-center gap-2 shrink-0 hover:bg-[#2563EB]/90 transition-colors shadow-sm"
              >
                <span>Visit Product</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Maker Card */}
            {(() => {
              const isCurrentUser = selectedPost.maker.handle === userProfile?.handle;
              const makerStreak = isCurrentUser ? userProfile.streakDays : (selectedPost.maker.streakDays || 0);
              const isLegendMaker = selectedPost.maker.badge?.includes('Legend') || selectedPost.maker.badge?.includes('Top Maker') || false;

              return (
                <div className="flex items-center justify-between p-3 rounded-xl bg-[#F6F7F8] dark:bg-[#1A1A1B] border border-[#E5E5E5] dark:border-[#2A2A2C]">
                  <div className="flex items-center gap-3">
                    <UserAvatar
                      src={selectedPost.maker.avatar}
                      alt={selectedPost.maker.name}
                      points={selectedPost.points}
                      isRank1={isLegendMaker}
                      size="md"
                    />
                    <div>
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="text-xs font-bold text-[#1A1A1B] dark:text-[#F5F5F5] flex items-center gap-1">
                          {selectedPost.maker.name}
                          {isLegendMaker && (
                            <span title="Rank #1 Legend">
                              <Crown className="w-3.5 h-3.5 text-amber-500 fill-amber-500 inline shrink-0" />
                            </span>
                          )}
                        </span>
                        {selectedPost.maker.isVerifiedMaker && (
                          <ShieldCheck className="w-3.5 h-3.5 text-[#2563EB]" />
                        )}
                        {makerStreak > 0 && (
                          <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-md bg-amber-500/10 text-amber-600 dark:text-amber-400 font-bold text-[10px]" title={`${makerStreak} Day Streak`}>
                            🔥 {makerStreak}d
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] text-[#1A1A1B]/60 dark:text-[#F5F5F5]/60">
                        {selectedPost.maker.handle}
                      </span>
                    </div>
                  </div>

                  {selectedPost.maker.badge && (
                    <span className="px-2.5 py-1 rounded-full bg-[#2563EB]/10 text-[#2563EB] text-[10px] font-bold">
                      {selectedPost.maker.badge}
                    </span>
                  )}
                </div>
              );
            })()}
          </div>

          {/* Main Product Screenshot / Banner */}
          {mainImage && (
            <div className="rounded-2xl overflow-hidden border border-[#E5E5E5] dark:border-[#2A2A2C] bg-[#F6F7F8] dark:bg-[#1A1A1B] max-h-[360px] sm:max-h-[400px] aspect-[16/9] w-full shadow-2xs">
              <img
                src={mainImage}
                alt={selectedPost.title}
                className="w-full h-full max-h-[360px] sm:max-h-[400px] object-cover rounded-2xl"
              />
            </div>
          )}

          {/* Description */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#1A1A1B]/50 dark:text-[#F5F5F5]/50">
              About Product
            </h3>
            <p className="text-xs sm:text-sm text-[#1A1A1B]/80 dark:text-[#F5F5F5]/80 leading-relaxed whitespace-pre-line">
              {selectedPost.description}
            </p>
          </div>

          {/* Screenshots Gallery */}
          {galleryScreenshots.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#1A1A1B]/50 dark:text-[#F5F5F5]/50">
                Additional Screenshots
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {galleryScreenshots.map((img, i) => (
                  <div key={i} className="rounded-xl overflow-hidden border border-[#E5E5E5] dark:border-[#2A2A2C] bg-[#F6F7F8] dark:bg-[#1A1A1B] max-h-52 aspect-[16/9]">
                    <img src={img} alt="" className="w-full h-full max-h-52 object-cover rounded-xl" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Upvote & Share Action Bar */}
          <div className="flex items-center justify-between p-4 rounded-xl bg-[#F6F7F8] dark:bg-[#1A1A1B] border border-[#E5E5E5] dark:border-[#2A2A2C]">
            <div className="flex items-center gap-3">
              <button
                onClick={() => upvotePost(selectedPost.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  selectedPost.userUpvoted
                    ? 'bg-[#2563EB] text-white'
                    : 'bg-white dark:bg-[#0E0E10] text-[#1A1A1B] dark:text-[#F5F5F5] border border-[#E5E5E5] dark:border-[#2A2A2C] hover:border-[#2563EB]'
                }`}
              >
                <ArrowUp className="w-4 h-4" />
                <span>{selectedPost.upvotes} Upvotes</span>
              </button>

              <button
                onClick={handleShare}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white dark:bg-[#0E0E10] border border-[#E5E5E5] dark:border-[#2A2A2C] text-xs font-semibold text-[#1A1A1B] dark:text-[#F5F5F5]"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>Share</span>
              </button>
            </div>

            {onOpenAiAdvisorForPost && (
              <button
                onClick={() => onOpenAiAdvisorForPost(selectedPost)}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#2563EB]/10 text-[#2563EB] text-xs font-bold hover:bg-[#2563EB]/20 transition-colors"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Get AI Pitch Roast</span>
              </button>
            )}
          </div>

          {/* Comments Section */}
          <div className="space-y-4 pt-4 border-t border-[#E5E5E5] dark:border-[#2A2A2C]">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-[#1A1A1B] dark:text-[#F5F5F5] flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-[#2563EB]" />
                <span>Developer Comments & Feedback ({selectedPost.commentCount})</span>
              </h3>
            </div>

            {/* Comment Form with Public/Private Toggle */}
            <form onSubmit={handleSendComment} className="p-4 rounded-xl bg-[#F6F7F8] dark:bg-[#1A1A1B] border border-[#E5E5E5] dark:border-[#2A2A2C] space-y-3">
              <textarea
                rows={2}
                placeholder="Leave feedback, ask technical questions, or give launch advice..."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                className="w-full p-3 text-xs rounded-xl bg-white dark:bg-[#0E0E10] border border-[#E5E5E5] dark:border-[#2A2A2C] text-[#1A1A1B] dark:text-[#F5F5F5] placeholder-[#1A1A1B]/40 dark:placeholder-[#F5F5F5]/40 focus:outline-none focus:border-[#2563EB]"
              />

              <div className="flex items-center justify-between gap-2">
                {/* Public vs Private Feedback Toggle */}
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setIsPrivateFeedback(false)}
                    className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-bold ${
                      !isPrivateFeedback
                        ? 'bg-[#2563EB] text-white'
                        : 'bg-white dark:bg-[#0E0E10] text-[#1A1A1B]/60 dark:text-[#F5F5F5]/60'
                    }`}
                  >
                    <Globe className="w-3 h-3" />
                    <span>Public</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setIsPrivateFeedback(true)}
                    className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-bold ${
                      isPrivateFeedback
                        ? 'bg-[#2563EB] text-white'
                        : 'bg-white dark:bg-[#0E0E10] text-[#1A1A1B]/60 dark:text-[#F5F5F5]/60'
                    }`}
                  >
                    <Lock className="w-3 h-3" />
                    <span>Private to Maker</span>
                  </button>
                </div>

                <button
                  type="submit"
                  disabled={!commentText.trim()}
                  className="px-4 py-1.5 rounded-xl bg-[#2563EB] text-white font-bold text-xs flex items-center gap-1.5 disabled:opacity-50 hover:bg-[#2563EB]/90 transition-colors"
                >
                  <span>Post Feedback</span>
                  <Send className="w-3 h-3" />
                </button>
              </div>
            </form>

            {/* List of Comments */}
            <div className="space-y-3 pt-2">
              {(!selectedPost.comments || selectedPost.comments.length === 0) ? (
                <div className="py-6 text-center">
                  <PandaMascot
                    mood="idle"
                    size="md"
                    title="No Comments Yet"
                    subtitle="Be the first developer to leave feedback, ask technical questions, or give launch advice!"
                  />
                </div>
              ) : (
                (() => {
                  const maxUpvotes = Math.max(...selectedPost.comments.map(c => c.upvotes || 0));

                  return selectedPost.comments.map((comment) => {
                    const isTopComment = maxUpvotes > 0 && comment.upvotes === maxUpvotes;
                    const isCurrentUser = comment.authorName?.includes('You') || comment.authorName === userProfile?.name;
                    const authorPoints = isCurrentUser ? userProfile.points : 120;
                    const authorStreak = isCurrentUser ? userProfile.streakDays : 4;
                    const authorTier = getBadgeTier(authorPoints);

                    return (
                      <div
                        key={comment.id}
                        className={`p-3.5 rounded-xl border relative transition-all ${
                          comment.isPrivate
                            ? 'bg-purple-500/5 dark:bg-purple-900/10 border-purple-500/20'
                            : isTopComment
                            ? 'bg-amber-500/5 dark:bg-amber-500/10 border-amber-500/30 shadow-2xs'
                            : 'bg-white dark:bg-[#0E0E10] border-[#E5E5E5] dark:border-[#2A2A2C]'
                        } space-y-2`}
                      >
                        <div className="flex items-center justify-between text-xs flex-wrap gap-2">
                          <div className="flex items-center gap-2 flex-wrap">
                            <UserAvatar
                              src={comment.authorAvatar}
                              alt={comment.authorName}
                              points={authorPoints}
                              size="xs"
                            />
                            <span className="font-bold text-[#1A1A1B] dark:text-[#F5F5F5]">
                              {comment.authorName}
                            </span>
                            {comment.authorRole && (
                              <span className="text-[10px] text-[#2563EB] font-semibold">
                                ({comment.authorRole})
                              </span>
                            )}

                            {/* Active Commenter Tier & Streak */}
                            <span className={`text-[9px] px-1.5 py-0.5 rounded uppercase tracking-wide font-black ${authorTier.badgeClass}`}>
                              {authorTier.label}
                            </span>

                            {authorStreak > 0 && (
                              <span className="inline-flex items-center gap-0.5 text-[9px] font-bold text-amber-500 bg-amber-500/10 px-1.5 py-0.5 rounded-md">
                                🔥 {authorStreak}d streak
                              </span>
                            )}

                            <span className="text-[10px] text-[#1A1A1B]/40 dark:text-[#F5F5F5]/40">
                              {comment.createdAt}
                            </span>
                          </div>

                          <div className="flex items-center gap-2">
                            {isTopComment && (
                              <span className="flex items-center gap-1 text-[9px] font-black text-amber-600 dark:text-amber-400 bg-amber-500/15 px-2 py-0.5 rounded-md">
                                <Award className="w-3 h-3 text-amber-500" />
                                <span>Top Comment</span>
                              </span>
                            )}

                            {comment.isPrivate && (
                              <span className="flex items-center gap-1 text-[10px] font-bold text-purple-600 dark:text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded-md">
                                <Lock className="w-3 h-3" />
                                <span>Private Note</span>
                              </span>
                            )}
                          </div>
                        </div>

                        <p className="text-xs text-[#1A1A1B]/80 dark:text-[#F5F5F5]/80 leading-relaxed">
                          {comment.content}
                        </p>

                        <div className="flex items-center justify-between pt-1">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => upvoteComment(selectedPost.id, comment.id)}
                              className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all ${
                                comment.userUpvoted
                                  ? 'bg-[#2563EB] text-white shadow-xs'
                                  : 'bg-[#F6F7F8] dark:bg-[#1A1A1B] text-[#1A1A1B]/70 dark:text-[#F5F5F5]/70 hover:bg-[#2563EB]/10 hover:text-[#2563EB]'
                              }`}
                            >
                              <ArrowUp className="w-3 h-3" />
                              <span>{comment.upvotes} Upvotes</span>
                            </button>

                            {/* Reply Button with @Mention tagging */}
                            <button
                              type="button"
                              onClick={() => {
                                const mention = `@${comment.authorName.replace(/\s+/g, '')} `;
                                setCommentText(prev => prev.includes(mention) ? prev : mention + prev);
                              }}
                              className="px-2.5 py-1 rounded-lg bg-[#F6F7F8] dark:bg-[#1A1A1B] text-[#1A1A1B]/60 dark:text-[#F5F5F5]/60 hover:text-[#2563EB] text-[10px] font-bold transition-colors"
                            >
                              Reply (@)
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  });
                })()
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
