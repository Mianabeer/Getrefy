import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Bell, ArrowUp, MessageSquare, AtSign, CheckCheck, Sparkles, Filter, ExternalLink, Trash2 } from 'lucide-react';
import { UserAvatar } from './UserAvatar';

export const NotificationsView: React.FC = () => {
  const {
    notifications,
    unreadNotificationCount,
    markNotificationAsRead,
    markAllNotificationsAsRead,
    posts,
    setSelectedPost
  } = useApp();

  const [typeFilter, setTypeFilter] = useState<'all' | 'unread' | 'upvote' | 'comment' | 'mention'>('all');

  const filteredNotifications = notifications.filter((n) => {
    if (typeFilter === 'unread') return !n.isRead;
    if (typeFilter === 'upvote') return n.type === 'post_upvote' || n.type === 'comment_upvote';
    if (typeFilter === 'comment') return n.type === 'post_comment' || n.type === 'comment_reply';
    if (typeFilter === 'mention') return n.type === 'mention';
    return true;
  });

  const handleNotificationClick = (n: any) => {
    if (!n.isRead) {
      markNotificationAsRead(n.id);
    }
    if (n.relatedPostId) {
      const foundPost = posts.find((p) => p.id === n.relatedPostId);
      if (foundPost) {
        setSelectedPost(foundPost);
      }
    }
  };

  const getNotifIcon = (type: string) => {
    switch (type) {
      case 'post_upvote':
      case 'comment_upvote':
        return <ArrowUp className="w-3.5 h-3.5 text-emerald-500 fill-emerald-500" />;
      case 'post_comment':
      case 'comment_reply':
        return <MessageSquare className="w-3.5 h-3.5 text-[#2563EB] fill-[#2563EB]" />;
      case 'mention':
        return <AtSign className="w-3.5 h-3.5 text-purple-500" />;
      default:
        return <Bell className="w-3.5 h-3.5 text-[#2563EB]" />;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'post_upvote':
        return 'Product Upvote';
      case 'comment_upvote':
        return 'Comment Upvote';
      case 'post_comment':
        return 'Feedback Comment';
      case 'comment_reply':
        return 'Comment Reply';
      case 'mention':
        return 'Mention';
      default:
        return 'Notification';
    }
  };

  return (
    <div className="p-4 sm:p-6 max-w-4xl mx-auto space-y-6">
      {/* Top Header Banner */}
      <div className="p-6 rounded-2xl bg-white dark:bg-[#0E0E10] border border-[#E5E5E5] dark:border-[#2A2A2C] shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2563EB]/10 text-[#2563EB] text-xs font-bold">
            <Bell className="w-3.5 h-3.5" />
            <span>COMMUNITY ACTIVITY</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-[#1A1A1B] dark:text-[#F5F5F5] tracking-tight">
            Notifications & Feedback
          </h1>
          <p className="text-xs text-[#1A1A1B]/60 dark:text-[#F5F5F5]/60 max-w-xl">
            Track upvotes, comments, and mentions across your launched products and community discussions.
          </p>
        </div>

        {unreadNotificationCount > 0 && (
          <button
            onClick={markAllNotificationsAsRead}
            className="px-4 py-2.5 rounded-xl bg-[#2563EB] text-white text-xs font-bold hover:bg-[#1D4ED8] transition-all shadow-sm flex items-center gap-2 shrink-0 self-start sm:self-center cursor-pointer"
          >
            <CheckCheck className="w-4 h-4" />
            <span>Mark All as Read ({unreadNotificationCount})</span>
          </button>
        )}
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none border-b border-[#E5E5E5] dark:border-[#2A2A2C] px-1">
        <button
          onClick={() => setTypeFilter('all')}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
            typeFilter === 'all'
              ? 'bg-[#2563EB] text-white shadow-xs'
              : 'text-[#1A1A1B]/60 dark:text-[#F5F5F5]/60 hover:bg-[#F6F7F8] dark:hover:bg-[#1A1A1B]'
          }`}
        >
          All Notifications ({notifications.length})
        </button>

        <button
          onClick={() => setTypeFilter('unread')}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all shrink-0 flex items-center gap-1.5 cursor-pointer ${
            typeFilter === 'unread'
              ? 'bg-[#2563EB] text-white shadow-xs'
              : 'text-[#1A1A1B]/60 dark:text-[#F5F5F5]/60 hover:bg-[#F6F7F8] dark:hover:bg-[#1A1A1B]'
          }`}
        >
          <span>Unread</span>
          {unreadNotificationCount > 0 && (
            <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-red-500 text-white font-black">
              {unreadNotificationCount}
            </span>
          )}
        </button>

        <button
          onClick={() => setTypeFilter('upvote')}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
            typeFilter === 'upvote'
              ? 'bg-[#2563EB] text-white shadow-xs'
              : 'text-[#1A1A1B]/60 dark:text-[#F5F5F5]/60 hover:bg-[#F6F7F8] dark:hover:bg-[#1A1A1B]'
          }`}
        >
          Upvotes
        </button>

        <button
          onClick={() => setTypeFilter('comment')}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
            typeFilter === 'comment'
              ? 'bg-[#2563EB] text-white shadow-xs'
              : 'text-[#1A1A1B]/60 dark:text-[#F5F5F5]/60 hover:bg-[#F6F7F8] dark:hover:bg-[#1A1A1B]'
          }`}
        >
          Comments
        </button>

        <button
          onClick={() => setTypeFilter('mention')}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
            typeFilter === 'mention'
              ? 'bg-[#2563EB] text-white shadow-xs'
              : 'text-[#1A1A1B]/60 dark:text-[#F5F5F5]/60 hover:bg-[#F6F7F8] dark:hover:bg-[#1A1A1B]'
          }`}
        >
          Mentions
        </button>
      </div>

      {/* Notifications List */}
      <div className="space-y-3">
        {filteredNotifications.length === 0 ? (
          <div className="p-12 text-center bg-white dark:bg-[#0E0E10] border border-[#E5E5E5] dark:border-[#2A2A2C] rounded-2xl space-y-3">
            <div className="w-12 h-12 rounded-full bg-[#2563EB]/10 text-[#2563EB] flex items-center justify-center mx-auto">
              <Bell className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-[#1A1A1B] dark:text-[#F5F5F5]">
              No notifications found
            </h3>
            <p className="text-xs text-[#1A1A1B]/60 dark:text-[#F5F5F5]/60 max-w-sm mx-auto">
              {typeFilter === 'unread'
                ? 'You have caught up on all your notifications! High five 🐼'
                : 'There are no activity updates in this filter category yet.'}
            </p>
          </div>
        ) : (
          filteredNotifications.map((n) => {
            const relatedPost = posts.find((p) => p.id === n.relatedPostId);

            return (
              <div
                key={n.id}
                onClick={() => handleNotificationClick(n)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start gap-3.5 relative ${
                  !n.isRead
                    ? 'bg-[#2563EB]/5 border-[#2563EB]/30 dark:bg-[#2563EB]/10 dark:border-[#2563EB]/30 shadow-xs'
                    : 'bg-white dark:bg-[#0E0E10] border-[#E5E5E5] dark:border-[#2A2A2C] hover:border-[#2563EB]/50'
                }`}
              >
                {/* Unread indicator dot */}
                {!n.isRead && (
                  <span className="w-2.5 h-2.5 rounded-full bg-[#2563EB] absolute top-4 right-4 animate-pulse" />
                )}

                {/* Actor Avatar or Icon */}
                <div className="relative shrink-0">
                  <UserAvatar
                    src={n.actorAvatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80'}
                    alt={n.actorName || 'User'}
                    size="md"
                  />
                  <div className="absolute -bottom-1 -right-1 p-1 rounded-full bg-white dark:bg-[#0E0E10] border border-[#E5E5E5] dark:border-[#2A2A2C] shadow-xs">
                    {getNotifIcon(n.type)}
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0 space-y-1 pr-6">
                  <div className="flex items-center gap-2 flex-wrap text-xs">
                    <span className="font-bold text-[#1A1A1B] dark:text-[#F5F5F5]">
                      {n.actorName || 'A maker'}
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-[#F6F7F8] dark:bg-[#1A1A1B] text-[#1A1A1B]/60 dark:text-[#F5F5F5]/60 border border-[#E5E5E5] dark:border-[#2A2A2C]">
                      {getTypeLabel(n.type)}
                    </span>
                    <span className="text-[11px] text-[#1A1A1B]/40 dark:text-[#F5F5F5]/40 ml-auto">
                      {n.createdAt}
                    </span>
                  </div>

                  <p className="text-xs text-[#1A1A1B]/80 dark:text-[#F5F5F5]/80 leading-relaxed font-medium">
                    {n.message}
                  </p>

                  {/* Related Post Pill */}
                  {relatedPost && (
                    <div className="pt-1.5 flex items-center gap-1.5 text-[11px] font-semibold text-[#2563EB]">
                      <ExternalLink className="w-3 h-3" />
                      <span className="truncate">Product: {relatedPost.title}</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
