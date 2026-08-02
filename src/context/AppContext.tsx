import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  ProductPost,
  CategoryType,
  FilterState,
  UserProfile,
  ToastMessage,
  Comment,
  Badge,
  AppNotification
} from '../types';
import { INITIAL_POSTS, BADGES } from '../data/mockData';
import { useAuth } from './AuthContext';

export type ActiveView = 'home' | 'submit' | 'leaderboard' | 'profile' | 'settings' | 'why' | 'notifications';

const INITIAL_NOTIFICATIONS: AppNotification[] = [
  {
    id: 'notif-1',
    userId: 'user-1',
    type: 'post_upvote',
    message: 'Alex Chen upvoted your product "Getrefy — Developer Product Launch Platform"',
    relatedPostId: 'post-1',
    isRead: false,
    createdAt: '10m ago',
    timestamp: Date.now() - 10 * 60 * 1000,
    actorName: 'Alex Chen',
    actorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80'
  },
  {
    id: 'notif-2',
    userId: 'user-1',
    type: 'post_comment',
    message: 'Sarah Jenkins commented on your product: "Awesome concept! The leaderboard feature is super encouraging."',
    relatedPostId: 'post-1',
    isRead: false,
    createdAt: '1h ago',
    timestamp: Date.now() - 60 * 60 * 1000,
    actorName: 'Sarah Jenkins',
    actorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80'
  },
  {
    id: 'notif-3',
    userId: 'user-1',
    type: 'comment_upvote',
    message: 'David Kim upvoted your comment in Discussion (+1 Point earned)',
    relatedPostId: 'post-2',
    isRead: true,
    createdAt: '3h ago',
    timestamp: Date.now() - 3 * 3600 * 1000,
    actorName: 'David Kim',
    actorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80'
  },
  {
    id: 'notif-4',
    userId: 'user-1',
    type: 'mention',
    message: 'Elena Rostova mentioned you in a comment: "@maker check this out!"',
    relatedPostId: 'post-3',
    isRead: true,
    createdAt: '1d ago',
    timestamp: Date.now() - 24 * 3600 * 1000,
    actorName: 'Elena Rostova',
    actorAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80'
  }
];

interface AppContextType {
  posts: ProductPost[];
  activeView: ActiveView;
  setActiveView: (view: ActiveView) => void;
  selectedPost: ProductPost | null;
  setSelectedPost: (post: ProductPost | null) => void;
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  userProfile: UserProfile;
  setUserProfile: React.Dispatch<React.SetStateAction<UserProfile>>;
  upvotePost: (postId: string) => void;
  addPost: (newPostData: Omit<ProductPost, 'id' | 'upvotes' | 'commentCount' | 'createdAt' | 'points' | 'userUpvoted'>) => void;
  addComment: (postId: string, content: string, isPrivate?: boolean) => void;
  upvoteComment: (postId: string, commentId: string) => void;
  bookmarks: string[];
  toggleBookmark: (postId: string) => void;
  toasts: ToastMessage[];
  showToast: (title: string, message: string, type?: 'success' | 'info' | 'panda' | 'error') => void;
  dismissToast: (id: string) => void;
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
  deletePost: (postId: string) => void;
  notifications: AppNotification[];
  unreadNotificationCount: number;
  markNotificationAsRead: (id: string) => void;
  markAllNotificationsAsRead: () => void;
}


const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, profile: authProfile, openAuthModal, updateProfileInSupabase } = useAuth();

  const [userProfile, setUserProfile] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('getrefy_user_profile');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed && parsed.name) return parsed;
      } catch (e) { console.error(e); }
    }
    return {
      name: 'Developer Creator',
      handle: '@maker',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
      bio: 'Indie software creator on Getrefy',
      role: 'Developer Creator',
      points: 0,
      streakDays: 0,
      badges: BADGES,
      launchedCount: 0,
      totalUpvotesReceived: 0
    };
  });

  useEffect(() => {
    try {
      localStorage.setItem('getrefy_user_profile', JSON.stringify(userProfile));
    } catch (e) {
      console.error('Failed to save user profile to localStorage:', e);
    }
  }, [userProfile]);

  const [posts, setPosts] = useState<ProductPost[]>(() => {
    const saved = localStorage.getItem('getrefy_posts');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length >= INITIAL_POSTS.length) {
          return parsed;
        }
      } catch (e) { console.error(e); }
    }
    return INITIAL_POSTS;
  });

  const [activeView, setActiveViewRaw] = useState<ActiveView>('home');
  const [selectedPost, setSelectedPost] = useState<ProductPost | null>(null);
  const [bookmarks, setBookmarks] = useState<string[]>(() => {
    const saved = localStorage.getItem('getrefy_bookmarks');
    return saved ? JSON.parse(saved) : ['post-1', 'post-2'];
  });

  const [filters, setFilters] = useState<FilterState>({
    searchQuery: '',
    category: 'All',
    sortBy: 'trending'
  });

  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('getrefy_dark_mode');
    return saved !== null ? JSON.parse(saved) : true;
  });

  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const [notifications, setNotifications] = useState<AppNotification[]>(() => {
    const saved = localStorage.getItem('getrefy_notifications');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return INITIAL_NOTIFICATIONS;
  });

  const dispatchNotification = (newNotif: AppNotification) => {
    // 1. Never notify self (where actor handle/name matches recipient)
    if (
      newNotif.actorHandle &&
      newNotif.userId &&
      newNotif.actorHandle.toLowerCase() === newNotif.userId.toLowerCase()
    ) {
      return;
    }
    if (
      newNotif.actorName &&
      newNotif.userId &&
      newNotif.actorName.toLowerCase() === newNotif.userId.toLowerCase()
    ) {
      return;
    }

    setNotifications(prev => {
      // 2. Prevent duplicate notifications for same action
      const targetUserId = (newNotif.userId || '').toLowerCase();
      const existsIndex = prev.findIndex(n =>
        n.type === newNotif.type &&
        (n.userId || '').toLowerCase() === targetUserId &&
        n.relatedPostId === newNotif.relatedPostId &&
        (n.relatedCommentId ? n.relatedCommentId === newNotif.relatedCommentId : true) &&
        n.actorName === newNotif.actorName
      );

      if (existsIndex !== -1) {
        // Update existing notification row instead of adding duplicate
        const updated = [...prev];
        updated[existsIndex] = {
          ...updated[existsIndex],
          message: newNotif.message,
          createdAt: 'Just now',
          timestamp: Date.now(),
          isRead: false
        };
        const [item] = updated.splice(existsIndex, 1);
        return [item, ...updated];
      }

      return [newNotif, ...prev];
    });
  };

  // Filter notifications relevant to the logged-in user
  const userNotifications = notifications.filter(n => {
    // Exclude actions initiated by the logged in user
    if (
      n.actorHandle &&
      userProfile?.handle &&
      n.actorHandle.toLowerCase() === userProfile.handle.toLowerCase()
    ) {
      return false;
    }

    const recipient = (n.userId || '').toLowerCase();
    const handle = (userProfile?.handle || '').toLowerCase();
    const name = (userProfile?.name || '').toLowerCase();
    const uid = (user?.id || '').toLowerCase();

    if (!recipient) return true;
    if (recipient === handle || recipient === name || (uid && recipient === uid)) return true;
    if (recipient === 'maker-1' || recipient === 'maker-owner' || recipient === 'user-1' || recipient === '@maker') return true;

    return false;
  });

  const unreadNotificationCount = userNotifications.filter(n => !n.isRead).length;

  const markNotificationAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(n => (n.id === id ? { ...n, isRead: true } : n))
    );
  };

  const markAllNotificationsAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
  };

  useEffect(() => {
    localStorage.setItem('getrefy_notifications', JSON.stringify(notifications));
  }, [notifications]);

  // Sync auth profile & user upvotes from storage/Supabase Auth into AppContext
  useEffect(() => {
    if (user) {
      if (authProfile) {
        setUserProfile(authProfile);
      }
      // Re-hydrate upvotes for this specific user
      const savedUpvotes = localStorage.getItem(`getrefy_upvotes_${user.email || user.id}`);
      const upvotedIds: string[] = savedUpvotes ? JSON.parse(savedUpvotes) : [];

      setPosts(prev =>
        prev.map(p => ({
          ...p,
          userUpvoted: upvotedIds.includes(p.id)
        }))
      );
    } else {
      // Logged out: reset user profile and clear upvoted state on feed
      setUserProfile({
        name: 'Developer Creator',
        handle: '@maker',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
        bio: 'Indie software creator on Getrefy',
        role: 'Developer Creator',
        points: 0,
        streakDays: 0,
        badges: BADGES,
        launchedCount: 0,
        totalUpvotesReceived: 0
      });

      setPosts(prev =>
        prev.map(p => ({
          ...p,
          userUpvoted: false
        }))
      );
    }
  }, [authProfile, user]);

  // Dynamically recalculate user points, streak, launched count, and badges based on real actions
  useEffect(() => {
    if (user && userProfile) {
      const handle = userProfile.handle || `@${user.email?.split('@')[0] || 'maker'}`;

      // Calculate user's posts
      const userPosts = posts.filter(
        p => p.userId === user.id || p.maker.handle === handle || (p.maker.name || '').toLowerCase().includes('you')
      );

      // Calculate user's comments across all posts
      const userComments = posts.flatMap(p =>
        (p.comments || []).filter(
          c => c.authorHandle === handle || (c.authorName || '').toLowerCase().includes('you')
        )
      );

      const launchedCount = userPosts.length;
      const totalUpvotesReceived = userPosts.reduce((acc, p) => acc + (p.upvotes || 0), 0);
      const commentUpvotesReceived = userComments.reduce((acc, c) => acc + (c.upvotes || 0), 0);

      // Action-based points formula: +3 per product launched, +4 per comment made, +1 per product upvote received, +1 per comment upvote received
      const calculatedActionPoints = (launchedCount * 3) + (userComments.length * 4) + totalUpvotesReceived + commentUpvotesReceived;
      const realPoints = Math.max(userProfile.points || 0, calculatedActionPoints);

      // Active streak: at least 1 day if user has active session or activity
      const activeStreak = (launchedCount > 0 || userComments.length > 0)
        ? Math.max(1, userProfile.streakDays || 1)
        : Math.max(1, userProfile.streakDays || 0);

      // Earned badges logic: ONLY unlock when underlying condition is genuinely true
      const dynamicBadges: Badge[] = [];

      // 1. First Launch (requires at least 1 launched product)
      if (launchedCount >= 1) {
        dynamicBadges.push({
          id: 'b1',
          name: 'First Launch',
          icon: '🚀',
          description: 'Published a product on Getrefy',
          dateEarned: 'Aug 2026'
        });
      }

      // 2. 7-Day Streak (requires actual 7-day streak)
      if (activeStreak >= 7) {
        dynamicBadges.push({
          id: 'b2',
          name: '7-Day Streak',
          icon: '🔥',
          description: 'Active on Getrefy for 7 consecutive days',
          dateEarned: 'Aug 2026'
        });
      }

      // 3. Top 10 Maker (requires 100+ points)
      if (realPoints >= 100) {
        dynamicBadges.push({
          id: 'b3',
          name: 'Top 10 Maker',
          icon: '🏆',
          description: 'Reached top 10 on the weekly launch leaderboard',
          dateEarned: 'Aug 2026'
        });
      }

      // 4. Community Supporter (requires 10+ constructive comments)
      if (userComments.length >= 10) {
        dynamicBadges.push({
          id: 'b4',
          name: 'Community Supporter',
          icon: '💬',
          description: 'Left 10+ constructive feedback comments',
          dateEarned: 'Aug 2026'
        });
      }

      // 5. Panda Verified (Verified developer creator profile)
      dynamicBadges.push({
        id: 'b5',
        name: 'Panda Verified',
        icon: '🐼',
        description: 'Verified developer creator profile'
      });

      setUserProfile(prev => {
        if (
          prev.points === realPoints &&
          prev.launchedCount === launchedCount &&
          prev.totalUpvotesReceived === totalUpvotesReceived &&
          prev.streakDays === activeStreak &&
          prev.badges.length === dynamicBadges.length
        ) {
          return prev;
        }
        const updatedProfile = {
          ...prev,
          points: realPoints,
          launchedCount,
          totalUpvotesReceived,
          streakDays: activeStreak,
          badges: dynamicBadges
        };
        queueMicrotask(() => {
          updateProfileInSupabase(updatedProfile);
        });
        return updatedProfile;
      });
    }
  }, [user, posts]);

  const setActiveView = (view: ActiveView) => {
    if ((view === 'submit' || view === 'settings' || view === 'profile') && !user) {
      openAuthModal();
      showToast('Sign In Required', `Please log in to access ${view === 'submit' ? 'Submit App' : view === 'settings' ? 'Settings' : 'Profile'}.`, 'info');
      return;
    }
    setActiveViewRaw(view);
  };

  // Parse deep link parameter on load
  useEffect(() => {
    if (posts.length > 0) {
      const params = new URLSearchParams(window.location.search);
      const postParam = params.get('post');
      const pathname = window.location.pathname;
      let matchedId = postParam;
      if (!matchedId && pathname.includes('/product/')) {
        matchedId = pathname.split('/product/')[1]?.split('/')[0]?.split('?')[0];
      }
      if (matchedId) {
        const found = posts.find(p => p.id === matchedId);
        if (found) {
          setSelectedPost(found);
        }
      }
    }
  }, [posts]);

  useEffect(() => {
    localStorage.setItem('getrefy_posts', JSON.stringify(posts));
  }, [posts]);

  useEffect(() => {
    localStorage.setItem('getrefy_bookmarks', JSON.stringify(bookmarks));
  }, [bookmarks]);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const showToast = (title: string, message: string, type: 'success' | 'info' | 'panda' | 'error' = 'info') => {
    const id = Date.now().toString();
    setToasts(prev => [...prev, { id, title, message, type }]);
    setTimeout(() => {
      dismissToast(id);
    }, 2000); // 2 seconds auto-dismiss
  };

  const dismissToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const upvotePost = (postId: string) => {
    if (!user) {
      openAuthModal();
      showToast('Sign In Required', 'Please log in or create an account to upvote apps.', 'info');
      return;
    }

    setPosts(prev => {
      const updatedList = prev.map(post => {
        if (post.id === postId) {
          const newUpvoted = !post.userUpvoted;
          const upvotesDelta = newUpvoted ? 1 : -1;
          const pointsDelta = newUpvoted ? 2 : -2;

          if (newUpvoted) {
            showToast('Upvoted Product!', `+2 Panda Points earned for supporting ${post.title}`, 'panda');
            
            const postOwnerHandle = post.maker?.handle || post.userId || 'maker-1';
            if (
              postOwnerHandle.toLowerCase() !== userProfile.handle.toLowerCase() &&
              post.userId !== user.id
            ) {
              dispatchNotification({
                id: `notif-${Date.now()}`,
                userId: postOwnerHandle,
                type: 'post_upvote',
                message: `${userProfile.name} upvoted your product "${post.title}"`,
                relatedPostId: post.id,
                isRead: false,
                createdAt: 'Just now',
                timestamp: Date.now(),
                actorName: userProfile.name,
                actorAvatar: userProfile.avatar,
                actorHandle: userProfile.handle
              });
            }
          }

          const newPoints = Math.max(0, userProfile.points + pointsDelta);
          setUserProfile(p => ({ ...p, points: newPoints }));
          updateProfileInSupabase({ points: newPoints });

          const updated = {
            ...post,
            upvotes: Math.max(0, post.upvotes + upvotesDelta),
            userUpvoted: newUpvoted,
            points: Math.max(0, post.points + pointsDelta)
          };

          if (selectedPost && selectedPost.id === postId) {
            setSelectedPost(updated);
          }

          return updated;
        }
        return post;
      });

      // Persist user's upvoted IDs array
      const userUpvotedIds = updatedList.filter(p => p.userUpvoted).map(p => p.id);
      localStorage.setItem(`getrefy_upvotes_${user.email || user.id}`, JSON.stringify(userUpvotedIds));

      return updatedList;
    });
  };

  const addPost = (newPostData: Omit<ProductPost, 'id' | 'upvotes' | 'commentCount' | 'createdAt' | 'points' | 'userUpvoted'>) => {
    if (!user) {
      openAuthModal();
      showToast('Sign In Required', 'Please log in to launch a product.', 'info');
      return;
    }

    const newPost: ProductPost = {
      ...newPostData,
      id: `post-${Date.now()}`,
      userId: user.id,
      upvotes: 1,
      userUpvoted: true,
      commentCount: 0,
      createdAt: 'Just now',
      timestamp: Date.now(),
      points: 3,
      comments: []
    };

    setPosts(prev => [newPost, ...prev]);

    const newPoints = userProfile.points + 3;
    const newLaunched = userProfile.launchedCount + 1;
    setUserProfile(p => ({
      ...p,
      points: newPoints,
      launchedCount: newLaunched,
      totalUpvotesReceived: p.totalUpvotesReceived + 1
    }));
    updateProfileInSupabase({ points: newPoints, launchedCount: newLaunched });

    showToast('Product Launched! 🚀', `"${newPost.title}" published live to Getrefy feed! +3 Points!`, 'panda');
    setActiveViewRaw('home');
  };

  const addComment = (postId: string, content: string, isPrivate: boolean = false) => {
    if (!user) {
      openAuthModal();
      showToast('Sign In Required', 'Please log in to post feedback.', 'info');
      return;
    }

    if (!content.trim()) return;

    const newComment: Comment = {
      id: `comment-${Date.now()}`,
      authorName: userProfile.name,
      authorHandle: userProfile.handle,
      authorAvatar: userProfile.avatar,
      authorRole: userProfile.role,
      content,
      createdAt: 'Just now',
      isPrivate,
      upvotes: 0
    };

    const currentPost = posts.find(p => p.id === postId);
    const targetPostTitle = currentPost?.title || 'your product';
    const postOwnerHandle = currentPost?.maker.handle || currentPost?.userId || 'maker-owner';

    setPosts(prev =>
      prev.map(post => {
        if (post.id === postId) {
          const updatedComments = [...(post.comments || []), newComment];
          const updated = {
            ...post,
            commentCount: post.commentCount + 1,
            comments: updatedComments
          };

          if (selectedPost && selectedPost.id === postId) {
            setSelectedPost(updated);
          }

          return updated;
        }
        return post;
      })
    );

    // 1. Post comment notification for post owner (if not self)
    if (
      postOwnerHandle.toLowerCase() !== userProfile.handle.toLowerCase() &&
      currentPost?.userId !== user.id
    ) {
      dispatchNotification({
        id: `notif-${Date.now()}-postcmt`,
        userId: postOwnerHandle,
        type: 'post_comment',
        message: `${userProfile.name} ${isPrivate ? 'sent private feedback on' : 'commented on'} "${targetPostTitle}"`,
        relatedPostId: postId,
        relatedCommentId: newComment.id,
        isRead: false,
        createdAt: 'Just now',
        timestamp: Date.now(),
        actorName: userProfile.name,
        actorAvatar: userProfile.avatar,
        actorHandle: userProfile.handle
      });
    }

    // 2. Check for @mentions anywhere in comment content
    const rawMentions = content.match(/@([\w_.-]+)/g);
    if (rawMentions && rawMentions.length > 0) {
      const uniqueHandles = Array.from(new Set(rawMentions.map(m => m.replace('@', ''))));
      uniqueHandles.forEach((handleName, idx) => {
        const targetHandle = handleName.startsWith('@') ? handleName : `@${handleName}`;
        if (targetHandle.toLowerCase() !== userProfile.handle.toLowerCase()) {
          dispatchNotification({
            id: `notif-${Date.now()}-mention-${idx}`,
            userId: targetHandle,
            type: 'mention',
            message: `${userProfile.name} mentioned you in a comment on "${targetPostTitle}": "${content.slice(0, 50)}${content.length > 50 ? '...' : ''}"`,
            relatedPostId: postId,
            relatedCommentId: newComment.id,
            isRead: false,
            createdAt: 'Just now',
            timestamp: Date.now(),
            actorName: userProfile.name,
            actorAvatar: userProfile.avatar,
            actorHandle: userProfile.handle
          });
        }
      });
    }

    // 3. Check if replying to an existing commenter in this post thread
    if (currentPost?.comments && currentPost.comments.length > 0) {
      const matchedCommenter = currentPost.comments.find(c => {
        const cleanName = c.authorName.replace(/\s+/g, '').toLowerCase();
        const cleanHandle = c.authorHandle.toLowerCase().replace('@', '');
        return (
          content.toLowerCase().includes(`@${cleanName}`) ||
          content.toLowerCase().includes(`@${cleanHandle}`)
        );
      });

      if (matchedCommenter && matchedCommenter.authorHandle.toLowerCase() !== userProfile.handle.toLowerCase()) {
        dispatchNotification({
          id: `notif-${Date.now()}-reply`,
          userId: matchedCommenter.authorHandle,
          type: 'comment_reply',
          message: `${userProfile.name} replied directly to your comment on "${targetPostTitle}"`,
          relatedPostId: postId,
          relatedCommentId: newComment.id,
          isRead: false,
          createdAt: 'Just now',
          timestamp: Date.now(),
          actorName: userProfile.name,
          actorAvatar: userProfile.avatar,
          actorHandle: userProfile.handle
        });
      }
    }

    const newPoints = userProfile.points + 4;
    setUserProfile(p => ({ ...p, points: newPoints }));
    updateProfileInSupabase({ points: newPoints });

    showToast('Feedback Posted! 💬', isPrivate ? 'Private feedback sent to Maker.' : '+4 Points earned for constructive comment!', 'panda');
  };

  const upvoteComment = (postId: string, commentId: string) => {
    if (!user) {
      openAuthModal();
      showToast('Sign In Required', 'Please log in to upvote comments.', 'info');
      return;
    }

    setPosts(prev =>
      prev.map(post => {
        if (post.id === postId) {
          let updatedAuthorHandle = '';
          let updatedAuthorName = '';
          let isNowUpvoted = false;

          const updatedComments = (post.comments || []).map(c => {
            if (c.id === commentId) {
              const userUpvoted = !c.userUpvoted;
              isNowUpvoted = userUpvoted;
              updatedAuthorHandle = c.authorHandle;
              updatedAuthorName = c.authorName;
              return {
                ...c,
                upvotes: Math.max(0, c.upvotes + (userUpvoted ? 1 : -1)),
                userUpvoted
              };
            }
            return c;
          });

          // If the upvoted comment was written by the current logged-in user, award them +1 point
          const isOwnComment = updatedAuthorHandle === userProfile.handle || updatedAuthorName.includes('You');
          if (isNowUpvoted) {
            if (isOwnComment) {
              const newPts = userProfile.points + 1;
              setUserProfile(p => ({ ...p, points: newPts }));
              updateProfileInSupabase({ points: newPts });
            }

            showToast('Comment Upvoted! ⬆️', '+1 Point awarded to comment author!', 'panda');

            // Dispatch notification if not self
            if (
              updatedAuthorHandle.toLowerCase() !== userProfile.handle.toLowerCase() &&
              !updatedAuthorName.includes('You')
            ) {
              dispatchNotification({
                id: `notif-${Date.now()}`,
                userId: updatedAuthorHandle,
                type: 'comment_upvote',
                message: `${userProfile.name} upvoted your comment in "${post.title}" (+1 Point earned)`,
                relatedPostId: postId,
                relatedCommentId: commentId,
                isRead: false,
                createdAt: 'Just now',
                timestamp: Date.now(),
                actorName: userProfile.name,
                actorAvatar: userProfile.avatar,
                actorHandle: userProfile.handle
              });
            }
          }

          const updated = { ...post, comments: updatedComments };
          if (selectedPost && selectedPost.id === postId) {
            setSelectedPost(updated);
          }
          return updated;
        }
        return post;
      })
    );
  };

  const toggleBookmark = (postId: string) => {
    setBookmarks(prev => {
      const isBookmarked = prev.includes(postId);
      const next = isBookmarked ? prev.filter(id => id !== postId) : [...prev, postId];
      showToast(isBookmarked ? 'Removed from Bookmarks' : 'Saved to Bookmarks', '', 'info');
      return next;
    });
  };

  const deletePost = (postId: string) => {
    setPosts(prev => prev.filter(p => p.id !== postId));
    if (selectedPost && selectedPost.id === postId) {
      setSelectedPost(null);
    }
    showToast('Post Deleted', 'Product post removed from feed.', 'info');
  };

  return (
    <AppContext.Provider
      value={{
        posts,
        activeView,
        setActiveView,
        selectedPost,
        setSelectedPost,
        filters,
        setFilters,
        userProfile,
        setUserProfile,
        upvotePost,
        addPost,
        addComment,
        upvoteComment,
        bookmarks,
        toggleBookmark,
        toasts,
        showToast,
        dismissToast,
        darkMode,
        setDarkMode,
        deletePost,
        notifications: userNotifications,
        unreadNotificationCount,
        markNotificationAsRead,
        markAllNotificationsAsRead
      }}
    >
      {children}
    </AppContext.Provider>
  );

};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

