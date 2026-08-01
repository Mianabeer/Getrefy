import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  ProductPost,
  CategoryType,
  FilterState,
  UserProfile,
  ToastMessage,
  Comment
} from '../types';
import { INITIAL_POSTS, BADGES } from '../data/mockData';
import { useAuth } from './AuthContext';

export type ActiveView = 'home' | 'submit' | 'leaderboard' | 'profile' | 'settings';

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
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, profile: authProfile, openAuthModal, updateProfileInSupabase } = useAuth();

  const [posts, setPosts] = useState<ProductPost[]>(() => {
    const saved = localStorage.getItem('getrefy_posts');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
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

  const [darkMode, setDarkMode] = useState<boolean>(true);

  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const [userProfile, setUserProfile] = useState<UserProfile>({
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

  // Sync auth profile from Supabase Auth into AppContext
  useEffect(() => {
    if (authProfile) {
      setUserProfile(authProfile);
    } else {
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
    }
  }, [authProfile]);

  const setActiveView = (view: ActiveView) => {
    if ((view === 'submit' || view === 'settings' || view === 'profile') && !user) {
      openAuthModal();
      showToast('Sign In Required', `Please log in to access ${view === 'submit' ? 'Submit App' : view === 'settings' ? 'Settings' : 'Profile'}.`, 'info');
      return;
    }
    setActiveViewRaw(view);
  };

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
    }, 4000);
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

    setPosts(prev =>
      prev.map(post => {
        if (post.id === postId) {
          const newUpvoted = !post.userUpvoted;
          const upvotesDelta = newUpvoted ? 1 : -1;
          const pointsDelta = newUpvoted ? 2 : -2;

          if (newUpvoted) {
            showToast('Upvoted Product!', `+2 Panda Points earned for supporting ${post.title}`, 'panda');
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
      })
    );
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
      upvotes: 1,
      userUpvoted: true,
      commentCount: 0,
      createdAt: 'Just now',
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
          const updatedComments = (post.comments || []).map(c => {
            if (c.id === commentId) {
              const userUpvoted = !c.userUpvoted;
              return {
                ...c,
                upvotes: Math.max(0, c.upvotes + (userUpvoted ? 1 : -1)),
                userUpvoted
              };
            }
            return c;
          });

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
        deletePost
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

