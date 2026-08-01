import React, { useState } from 'react';
import { useAuth, generateRandomHandle } from '../context/AuthContext';
import { useApp } from '../context/AppContext';
import { isSupabaseConfigured } from '../lib/supabase';
import { X, LogIn, UserPlus, Lock, Mail, User, AlertCircle, Loader2 } from 'lucide-react';
import { PandaLogo } from './PandaLogo';
import { PandaMascot } from './PandaMascot';

export const AuthModal: React.FC = () => {
  const { isAuthModalOpen, closeAuthModal, signInWithPassword, signUp, signInWithOAuth } = useAuth();
  const { showToast, setActiveView } = useApp();

  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isAuthModalOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!email || !password) {
      setErrorMsg('Please enter both email and password.');
      return;
    }

    if (mode === 'signup' && password.length < 8) {
      setErrorMsg('Password must be at least 8 characters long.');
      return;
    }

    setLoading(true);

    try {
      if (mode === 'signup') {
        const autoName = name.trim() || email.split('@')[0];
        const autoHandle = generateRandomHandle(autoName);

        const { error, user } = await signUp(email, password, {
          name: autoName,
          handle: autoHandle,
          role: 'Developer Creator'
        });

        if (error) {
          setErrorMsg(error.message || 'Failed to sign up. Email might already be registered.');
        } else {
          showToast('Welcome to Getrefy! 🎉', `Your account is created with handle ${autoHandle}. 0 points & Bronze tier!`, 'panda');
          setActiveView('home');
          closeAuthModal();
        }
      } else {
        const { error } = await signInWithPassword(email, password);

        if (error) {
          setErrorMsg(error.message || 'Invalid login credentials. Please check your email & password.');
        } else {
          showToast('Logged In Successfully! 👋', 'Welcome back to Getrefy.', 'success');
          setActiveView('home');
          closeAuthModal();
        }
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setErrorMsg('');
    setLoading(true);
    try {
      const { error } = await signInWithOAuth('google');
      if (error) {
        setErrorMsg(error.message || 'Google OAuth failed. Please check your Supabase OAuth setup.');
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Failed to initialize Google login.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-white dark:bg-[#0E0E10] border border-[#E5E5E5] dark:border-[#2A2A2C] rounded-2xl shadow-2xl overflow-hidden p-6 space-y-5">
        {/* Close Button */}
        <button
          onClick={closeAuthModal}
          className="absolute top-4 right-4 p-1.5 rounded-xl text-[#1A1A1B]/50 dark:text-[#F5F5F5]/50 hover:bg-[#F6F7F8] dark:hover:bg-[#1A1A1B] hover:text-[#1A1A1B] dark:hover:text-[#F5F5F5] transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header Branding */}
        <div className="text-center space-y-1 flex flex-col items-center">
          <PandaMascot
            mood={loading ? 'waiting' : mode === 'signup' ? 'celebrate' : 'idle'}
            size="md"
            title={mode === 'login' ? 'Sign In to Getrefy' : 'Create Creator Account'}
            subtitle={
              loading
                ? 'Checking credentials & syncing points...'
                : mode === 'login'
                ? 'Join developer discussions, launch apps, and earn Panda points.'
                : 'Sign up to upvote software, comment on builds, and earn badge tiers.'
            }
          />
        </div>

        {!isSupabaseConfigured && (
          <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 text-xs space-y-1">
            <p className="font-bold flex items-center gap-1.5">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              <span>Supabase Keys Pending</span>
            </p>
            <p className="text-[11px] leading-tight text-amber-700 dark:text-amber-300">
              Fill in <code className="px-1 py-0.5 bg-amber-500/20 rounded font-mono text-[10px]">VITE_SUPABASE_URL</code> and <code className="px-1 py-0.5 bg-amber-500/20 rounded font-mono text-[10px]">VITE_SUPABASE_ANON_KEY</code> in environment settings.
              You can click below to test with demo auth state!
            </p>
          </div>
        )}

        {/* Mode Selector Tabs */}
        <div className="flex p-1 rounded-xl bg-[#F6F7F8] dark:bg-[#1A1A1B] border border-[#E5E5E5] dark:border-[#2A2A2C]">
          <button
            type="button"
            onClick={() => { setMode('login'); setErrorMsg(''); }}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
              mode === 'login'
                ? 'bg-white dark:bg-[#0E0E10] text-[#1A1A1B] dark:text-[#F5F5F5] shadow-xs'
                : 'text-[#1A1A1B]/60 dark:text-[#F5F5F5]/60 hover:text-[#1A1A1B] dark:hover:text-[#F5F5F5]'
            }`}
          >
            <LogIn className="w-3.5 h-3.5 text-[#2563EB]" />
            <span>Sign In</span>
          </button>
          <button
            type="button"
            onClick={() => { setMode('signup'); setErrorMsg(''); }}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
              mode === 'signup'
                ? 'bg-white dark:bg-[#0E0E10] text-[#1A1A1B] dark:text-[#F5F5F5] shadow-xs'
                : 'text-[#1A1A1B]/60 dark:text-[#F5F5F5]/60 hover:text-[#1A1A1B] dark:hover:text-[#F5F5F5]'
            }`}
          >
            <UserPlus className="w-3.5 h-3.5 text-[#2563EB]" />
            <span>Sign Up</span>
          </button>
        </div>

        {/* Error Alert Box */}
        {errorMsg && (
          <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400 text-xs flex items-start gap-2 animate-in fade-in">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span className="leading-tight">{errorMsg}</span>
          </div>
        )}

        {/* Auth Form */}
        <form onSubmit={handleSubmit} className="space-y-3">
          {mode === 'signup' && (
            <div>
              <label className="block text-[11px] font-bold text-[#1A1A1B] dark:text-[#F5F5F5] mb-1">
                Full Name (Optional)
              </label>
              <div className="relative">
                <User className="absolute left-3 top-2.5 w-3.5 h-3.5 text-[#1A1A1B]/40 dark:text-[#F5F5F5]/40" />
                <input
                  type="text"
                  placeholder="Alex Rivera"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="w-full pl-8 pr-3 py-2 text-xs rounded-xl bg-[#F6F7F8] dark:bg-[#1A1A1B] border border-[#E5E5E5] dark:border-[#2A2A2C] text-[#1A1A1B] dark:text-[#F5F5F5] focus:outline-hidden focus:border-[#2563EB]"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-[11px] font-bold text-[#1A1A1B] dark:text-[#F5F5F5] mb-1">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-2.5 w-3.5 h-3.5 text-[#1A1A1B]/40 dark:text-[#F5F5F5]/40" />
              <input
                type="email"
                required
                placeholder="developer@getrefy.app"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full pl-8 pr-3 py-2 text-xs rounded-xl bg-[#F6F7F8] dark:bg-[#1A1A1B] border border-[#E5E5E5] dark:border-[#2A2A2C] text-[#1A1A1B] dark:text-[#F5F5F5] focus:outline-hidden focus:border-[#2563EB]"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-[#1A1A1B] dark:text-[#F5F5F5] mb-1">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-2.5 w-3.5 h-3.5 text-[#1A1A1B]/40 dark:text-[#F5F5F5]/40" />
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full pl-8 pr-3 py-2 text-xs rounded-xl bg-[#F6F7F8] dark:bg-[#1A1A1B] border border-[#E5E5E5] dark:border-[#2A2A2C] text-[#1A1A1B] dark:text-[#F5F5F5] focus:outline-hidden focus:border-[#2563EB]"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 rounded-xl bg-[#2563EB] text-white font-bold text-xs hover:bg-[#2563EB]/90 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 shadow-md shadow-blue-500/20"
          >
            {loading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : mode === 'login' ? (
              <>
                <LogIn className="w-4 h-4" />
                <span>Sign In to Getrefy</span>
              </>
            ) : (
              <>
                <UserPlus className="w-4 h-4" />
                <span>Create Creator Account</span>
              </>
            )}
          </button>
        </form>

        {/* Divider */}
        <div className="relative flex items-center justify-center">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-[#E5E5E5] dark:border-[#2A2A2C]" />
          </div>
          <span className="relative px-3 bg-white dark:bg-[#0E0E10] text-[10px] font-bold text-[#1A1A1B]/40 dark:text-[#F5F5F5]/40 uppercase tracking-wider">
            Or continue with
          </span>
        </div>

        {/* Google OAuth Button */}
        <button
          type="button"
          onClick={handleGoogleLogin}
          disabled={loading}
          className="w-full py-2.5 rounded-xl bg-[#F6F7F8] dark:bg-[#1A1A1B] border border-[#E5E5E5] dark:border-[#2A2A2C] text-[#1A1A1B] dark:text-[#F5F5F5] font-bold text-xs hover:border-[#2563EB] transition-colors flex items-center justify-center gap-2.5 shadow-xs"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
            />
          </svg>
          <span>Continue with Google</span>
        </button>
      </div>
    </div>
  );
};
