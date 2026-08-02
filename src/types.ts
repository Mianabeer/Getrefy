export type CategoryType =
  | 'SaaS'
  | 'iOS Dev'
  | 'Web Dev'
  | 'Dropshipping'
  | 'Founder Journey'
  | 'Health'
  | 'Creator Tools'
  | 'AI Tools'
  | 'Developer Tools'
  | 'Open Source'
  | 'Design & Creative'
  | 'Mobile Apps'
  | 'Utilities'
  | 'Games';

export interface Comment {
  id: string;
  authorName: string;
  authorHandle: string;
  authorAvatar: string;
  authorRole?: string;
  content: string;
  createdAt: string;
  isPrivate?: boolean; // Private feedback visible only to Maker
  upvotes: number;
  userUpvoted?: boolean;
}

export interface ProductPost {
  id: string;
  title: string;
  tagline: string;
  description: string;
  productUrl: string;
  category: CategoryType;
  logoUrl: string;
  imageUrl?: string;
  maker: {
    name: string;
    handle: string;
    avatar: string;
    badge?: string;
    isVerifiedMaker?: boolean;
    streakDays?: number;
  };
  upvotes: number;
  userUpvoted?: boolean;
  commentCount: number;
  createdAt: string;
  timestamp?: number;
  points: number;
  screenshots?: string[];
  comments?: Comment[];
  isPandaChoice?: boolean;
  isFeatured?: boolean;
  userId?: string;
}

export interface Badge {
  id: string;
  name: string;
  icon: string;
  description: string;
  dateEarned?: string;
}

export interface UserProfile {
  name: string;
  handle: string;
  avatar: string;
  bio: string;
  role: string;
  points: number;
  streakDays: number;
  badges: Badge[];
  launchedCount: number;
  totalUpvotesReceived: number;
}

export type SortOption = 'trending' | 'top' | 'newest';

export interface FilterState {
  searchQuery: string;
  category: CategoryType | 'All';
  sortBy: SortOption;
}

export interface ToastMessage {
  id: string;
  title: string;
  message: string;
  type?: 'success' | 'info' | 'panda' | 'error';
}

export interface AppNotification {
  id: string;
  userId: string;
  type: 'post_upvote' | 'comment_upvote' | 'post_comment' | 'comment_reply' | 'mention';
  message: string;
  relatedPostId?: string;
  relatedCommentId?: string;
  isRead: boolean;
  createdAt: string;
  timestamp: number;
  actorName?: string;
  actorAvatar?: string;
  actorHandle?: string;
}
