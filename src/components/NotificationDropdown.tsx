import React from 'react';
import { useApp } from '../context/AppContext';
import { AppNotification } from '../types';
import { Bell, ArrowUp, MessageSquare, AtSign, CheckCheck } from 'lucide-react';

export const NotificationDropdown: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  align?: 'left' | 'right';
  positionClass?: string;
}> = ({
  isOpen,
  onClose,
  align = 'right',
  positionClass
}) => {
  const {
    notifications,
    unreadNotificationCount,
    markNotificationAsRead,
    markAllNotificationsAsRead,
    posts,
    setSelectedPost,
    setActiveView
  } = useApp();

  if (!isOpen) return null;

  const handleNotificationClick = (notif: AppNotification) => {
    markNotificationAsRead(notif.id);
    if (notif.relatedPostId) {
      const targetPost = posts.find(p => p.id === notif.relatedPostId);
      if (targetPost) {
        setSelectedPost(targetPost);
        setActiveView('home');
      }
    }
    onClose();
  };

  const getNotifIcon = (type: AppNotification['type']) => {
    switch (type) {
      case 'post_upvote':
      case 'comment_upvote':
        return <ArrowUp className="w-3 h-3 text-amber-500" />;
      case 'post_comment':
      case 'comment_reply':
        return <MessageSquare className="w-3 h-3 text-[#2563EB]" />;
      case 'mention':
        return <AtSign className="w-3 h-3 text-purple-500" />;
      default:
        return <Bell className="w-3 h-3 text-[#2563EB]" />;
    }
  };

  const positioning = positionClass || (align === 'right' ? 'right-0 mt-2' : 'left-0 mt-2');

  return (
    <>
      {/* Invisible backdrop to dismiss dropdown on outside click */}
      <div className="fixed inset-0 z-50" onClick={onClose} />

      <div className={`absolute ${positioning} w-80 sm:w-96 max-w-[calc(100vw-2rem)] bg-white dark:bg-[#0E0E10] border border-[#E5E5E5] dark:border-[#2A2A2C] rounded-2xl shadow-2xl z-[60] overflow-hidden flex flex-col max-h-[80vh] sm:max-h-[30rem] animate-in fade-in slide-in-from-top-2 duration-150`}>
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-[#E5E5E5] dark:border-[#2A2A2C] bg-[#F6F7F8]/50 dark:bg-[#1A1A1B]/50 shrink-0">
          <div className="flex items-center gap-2">
            <Bell className="w-4 h-4 text-[#2563EB]" />
            <h3 className="text-xs font-bold text-[#1A1A1B] dark:text-[#F5F5F5]">
              Activity & Notifications
            </h3>
            {unreadNotificationCount > 0 && (
              <span className="px-1.5 py-0.5 rounded-full bg-[#2563EB] text-white text-[10px] font-black">
                {unreadNotificationCount}
              </span>
            )}
          </div>

          {unreadNotificationCount > 0 && (
            <button
              onClick={markAllNotificationsAsRead}
              className="text-[10px] text-[#2563EB] font-bold hover:underline flex items-center gap-1 cursor-pointer"
            >
              <CheckCheck className="w-3 h-3" />
              <span>Mark all read</span>
            </button>
          )}
        </div>

        {/* Notifications List */}
        <div className="flex-1 overflow-y-auto min-h-0 divide-y divide-[#E5E5E5]/50 dark:divide-[#2A2A2C]/50 overscroll-contain">
          {notifications.length === 0 ? (
            <div className="p-6 text-center text-xs text-[#1A1A1B]/50 dark:text-[#F5F5F5]/50 space-y-1">
              <Bell className="w-6 h-6 mx-auto opacity-30" />
              <p className="font-semibold">No notifications yet</p>
              <p className="text-[10px]">Your upvotes, comments, and mentions will appear here.</p>
            </div>
          ) : (
            notifications.map((notif) => (
              <div
                key={notif.id}
                onClick={() => handleNotificationClick(notif)}
                className={`p-3 sm:p-3.5 flex items-start gap-3 cursor-pointer hover:bg-[#F6F7F8] dark:hover:bg-[#1A1A1B] transition-colors relative ${
                  !notif.isRead ? 'bg-[#2563EB]/5 dark:bg-[#2563EB]/10' : ''
                }`}
              >
                {/* Actor avatar or icon */}
                <div className="relative shrink-0">
                  {notif.actorAvatar ? (
                    <img
                      src={notif.actorAvatar}
                      alt=""
                      className="w-8 h-8 rounded-full object-cover border border-[#E5E5E5] dark:border-[#2A2A2C]"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-[#2563EB]/10 flex items-center justify-center">
                      {getNotifIcon(notif.type)}
                    </div>
                  )}
                  <div className="absolute -bottom-1 -right-1 p-0.5 rounded-full bg-white dark:bg-[#0E0E10] border border-[#E5E5E5] dark:border-[#2A2A2C]">
                    {getNotifIcon(notif.type)}
                  </div>
                </div>

                {/* Text */}
                <div className="flex-1 min-w-0 space-y-0.5">
                  <p className={`text-xs ${!notif.isRead ? 'font-bold text-[#1A1A1B] dark:text-[#F5F5F5]' : 'font-medium text-[#1A1A1B]/80 dark:text-[#F5F5F5]/80'} leading-snug line-clamp-2`}>
                    {notif.message}
                  </p>
                  <p className="text-[10px] text-[#1A1A1B]/40 dark:text-[#F5F5F5]/40 font-semibold">
                    {notif.createdAt}
                  </p>
                </div>

                {/* Unread dot */}
                {!notif.isRead && (
                  <div className="w-2 h-2 rounded-full bg-[#2563EB] shrink-0 mt-1.5" />
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};
