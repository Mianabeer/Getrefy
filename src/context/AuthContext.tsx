import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { UserProfile } from '../types';
import { BADGES } from '../data/mockData';

export function generateRandomHandle(nameOrEmail?: string): string {
  const clean = (nameOrEmail || 'dev')
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '')
    .slice(0, 10) || 'maker';
  const randomNum = Math.floor(100 + Math.random() * 900);
  return `@${clean}${randomNum}`;
}

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  profile: UserProfile | null;
  isAuthModalOpen: boolean;
  openAuthModal: () => void;
  closeAuthModal: () => void;
  signUp: (email: string, password: string, metadata?: { name?: string; handle?: string; role?: string }) => Promise<{ error: any; user: User | null }>;
  signInWithPassword: (email: string, password: string) => Promise<{ error: any }>;
  signInWithOAuth: (provider: 'google' | 'github') => Promise<{ error: any }>;
  signOut: () => Promise<void>;
  updateProfileInSupabase: (updated: Partial<UserProfile>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const openAuthModal = () => setIsAuthModalOpen(true);
  const closeAuthModal = () => setIsAuthModalOpen(false);

  const fetchProfile = async (currentUser: User) => {
    const defaultName = currentUser.user_metadata?.name || currentUser.email?.split('@')[0] || 'Developer Creator';
    const defaultHandle = currentUser.user_metadata?.handle || generateRandomHandle(defaultName);

    // Read local cache backup for this user ID
    let localProf: UserProfile | null = null;
    const localSaved = localStorage.getItem(`getrefy_user_profile_${currentUser.id}`);
    if (localSaved) {
      try { localProf = JSON.parse(localSaved); } catch (e) { console.error(e); }
    }

    if (!isSupabaseConfigured) {
      // Fallback profile if Supabase environment variables aren't provided yet
      const fallback: UserProfile = localProf || {
        name: defaultName,
        handle: defaultHandle,
        avatar: currentUser.user_metadata?.avatar || currentUser.user_metadata?.avatar_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
        bio: 'Indie software creator on Getrefy',
        role: currentUser.user_metadata?.role || 'Developer Creator',
        points: 0,
        streakDays: 0,
        badges: BADGES,
        launchedCount: 0,
        totalUpvotesReceived: 0
      };
      setProfile(fallback);
      return fallback;
    }

    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', currentUser.id)
        .single();

      if (data && !error) {
        const bestPoints = Math.max(data.points ?? 0, localProf?.points ?? 0);
        const bestStreak = Math.max(data.streak_days ?? 0, localProf?.streakDays ?? 0);
        const bestLaunched = Math.max(data.launched_count ?? 0, localProf?.launchedCount ?? 0);
        const bestUpvotes = Math.max(data.total_upvotes_received ?? 0, localProf?.totalUpvotesReceived ?? 0);

        const fetchedProfile: UserProfile = {
          name: data.name || localProf?.name || defaultName,
          handle: data.handle || localProf?.handle || defaultHandle,
          avatar: data.avatar || localProf?.avatar || currentUser.user_metadata?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
          bio: data.bio || localProf?.bio || 'Indie software creator on Getrefy',
          role: data.role || localProf?.role || 'Developer Creator',
          points: bestPoints,
          streakDays: bestStreak,
          badges: BADGES,
          launchedCount: bestLaunched,
          totalUpvotesReceived: bestUpvotes
        };

        setProfile(fetchedProfile);
        localStorage.setItem(`getrefy_user_profile_${currentUser.id}`, JSON.stringify(fetchedProfile));

        // Sync back to Supabase if local points were higher
        if (bestPoints > (data.points ?? 0) || bestStreak > (data.streak_days ?? 0)) {
          await supabase.from('users').upsert({
            id: currentUser.id,
            email: currentUser.email || '',
            name: fetchedProfile.name,
            handle: fetchedProfile.handle,
            avatar: fetchedProfile.avatar,
            bio: fetchedProfile.bio,
            role: fetchedProfile.role,
            points: bestPoints,
            streak_days: bestStreak,
            launched_count: bestLaunched,
            total_upvotes_received: bestUpvotes
          });
        }

        return fetchedProfile;
      } else {
        // Construct initial profile if row doesn't exist in users table yet
        const newProfile: UserProfile = localProf || {
          name: defaultName,
          handle: defaultHandle,
          avatar: currentUser.user_metadata?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
          bio: 'Indie software creator on Getrefy',
          role: currentUser.user_metadata?.role || 'Developer Creator',
          points: 0,
          streakDays: 0,
          badges: BADGES,
          launchedCount: 0,
          totalUpvotesReceived: 0
        };
        setProfile(newProfile);
        localStorage.setItem(`getrefy_user_profile_${currentUser.id}`, JSON.stringify(newProfile));

        // Explicitly upsert profile row into Supabase users table
        await supabase.from('users').upsert({
          id: currentUser.id,
          email: currentUser.email || '',
          name: newProfile.name,
          handle: newProfile.handle,
          avatar: newProfile.avatar,
          bio: newProfile.bio,
          role: newProfile.role,
          points: newProfile.points,
          streak_days: newProfile.streakDays,
          launched_count: newProfile.launchedCount,
          total_upvotes_received: newProfile.totalUpvotesReceived
        });

        return newProfile;
      }
    } catch (err) {
      console.error('Error fetching profile from Supabase:', err);
      const fallbackProfile: UserProfile = localProf || {
        name: defaultName,
        handle: defaultHandle,
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
        bio: 'Indie software creator on Getrefy',
        role: 'Developer Creator',
        points: 0,
        streakDays: 0,
        badges: BADGES,
        launchedCount: 0,
        totalUpvotesReceived: 0
      };
      setProfile(fallbackProfile);
      return fallbackProfile;
    }
  };

  useEffect(() => {
    // Initial session check
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchProfile(session.user);
      } else {
        setProfile(null);
      }
      setLoading(false);
    });

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        await fetchProfile(session.user);
      } else {
        setProfile(null);
      }
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signUp = async (
    email: string,
    password: string,
    metadata?: { name?: string; handle?: string; role?: string }
  ) => {
    const autoName = metadata?.name?.trim() || email.split('@')[0];
    const autoHandle = metadata?.handle || generateRandomHandle(autoName);
    const userRole = metadata?.role || 'Developer Creator';

    if (!isSupabaseConfigured) {
      // Demo simulated signup if keys not configured
      const dummyUser = ({
        id: `demo-${Date.now()}`,
        email,
        user_metadata: { name: autoName, handle: autoHandle, role: userRole }
      } as unknown) as User;
      setUser(dummyUser);
      await fetchProfile(dummyUser);
      setIsAuthModalOpen(false);
      return { error: null, user: dummyUser };
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name: autoName,
          handle: autoHandle,
          role: userRole
        }
      }
    });

    if (error) {
      return { error, user: null };
    }

    if (data.user) {
      setUser(data.user);

      // Ensure explicit row creation in users table with 0 points
      try {
        await supabase.from('users').upsert({
          id: data.user.id,
          email: email,
          name: autoName,
          handle: autoHandle,
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
          bio: 'Indie software creator on Getrefy',
          role: userRole,
          points: 0,
          streak_days: 0,
          launched_count: 0,
          total_upvotes_received: 0
        });
      } catch (upsertErr) {
        console.warn('Direct users upsert error:', upsertErr);
      }

      await fetchProfile(data.user);
      setIsAuthModalOpen(false);
    }

    return { error: null, user: data.user };
  };

  const signInWithPassword = async (email: string, password: string) => {
    if (!isSupabaseConfigured) {
      // Demo login
      const dummyUser = ({ id: `demo-${Date.now()}`, email, user_metadata: { name: email.split('@')[0] } } as unknown) as User;
      setUser(dummyUser);
      await fetchProfile(dummyUser);
      setIsAuthModalOpen(false);
      return { error: null };
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (data.user && !error) {
      setUser(data.user);
      await fetchProfile(data.user);
      setIsAuthModalOpen(false);
    }

    return { error };
  };

  const signInWithOAuth = async (provider: 'google' | 'github') => {
    if (!isSupabaseConfigured) {
      const dummyUser = ({ id: `demo-oauth-${Date.now()}`, email: 'google.dev@example.com', user_metadata: { name: 'Google Developer' } } as unknown) as User;
      setUser(dummyUser);
      await fetchProfile(dummyUser);
      setIsAuthModalOpen(false);
      return { error: null };
    }

    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: window.location.origin
      }
    });

    return { error };
  };

  const signOut = async () => {
    try {
      if (isSupabaseConfigured) {
        await supabase.auth.signOut();
      }
    } catch (err) {
      console.warn('Supabase auth signOut error:', err);
    } finally {
      setUser(null);
      setSession(null);
      setProfile(null);
      console.log('User signed out successfully.');
    }
  };

  const updateProfileInSupabase = async (updated: Partial<UserProfile>) => {
    if (profile) {
      const newProf = { ...profile, ...updated };
      
      const isUnchanged =
        profile.points === newProf.points &&
        profile.streakDays === newProf.streakDays &&
        profile.launchedCount === newProf.launchedCount &&
        profile.totalUpvotesReceived === newProf.totalUpvotesReceived &&
        profile.name === newProf.name &&
        profile.bio === newProf.bio &&
        profile.role === newProf.role &&
        profile.avatar === newProf.avatar;

      if (!isUnchanged) {
        setProfile(newProf);
      }

      if (user) {
        localStorage.setItem(`getrefy_user_profile_${user.id}`, JSON.stringify(newProf));
      }

      if (user && isSupabaseConfigured) {
        try {
          await supabase.from('users').upsert({
            id: user.id,
            email: user.email || '',
            name: newProf.name,
            handle: newProf.handle,
            avatar: newProf.avatar,
            bio: newProf.bio,
            role: newProf.role,
            points: newProf.points,
            streak_days: newProf.streakDays,
            launched_count: newProf.launchedCount,
            total_upvotes_received: newProf.totalUpvotesReceived
          });
        } catch (err) {
          console.warn('Failed to update profile in Supabase:', err);
        }
      }
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        loading,
        profile,
        isAuthModalOpen,
        openAuthModal,
        closeAuthModal,
        signUp,
        signInWithPassword,
        signInWithOAuth,
        signOut,
        updateProfileInSupabase
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
