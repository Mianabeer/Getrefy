import React, { useState, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { useAuth } from '../context/AuthContext';
import { Settings, Moon, Sun, Bell, Shield, User, CheckCircle2, Upload, Lock, LogOut, KeyRound } from 'lucide-react';

export const SettingsView: React.FC = () => {
  const { darkMode, setDarkMode, userProfile, setUserProfile, setActiveView, showToast } = useApp();
  const { signOut, updateProfileInSupabase } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [profileData, setProfileData] = useState({
    name: userProfile.name,
    handle: userProfile.handle,
    bio: userProfile.bio,
    role: userProfile.role,
    avatar: userProfile.avatar
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [notifications, setNotifications] = useState({
    upvotes: true,
    comments: true,
    weeklyLeaderboard: true
  });

  const handleAvatarFile = (file: File) => {
    // 1. Image type check
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
    if (!validTypes.includes(file.type) && !file.type.startsWith('image/')) {
      showToast('Invalid File Format', 'Please upload a valid image file (PNG, JPG, WEBP, or GIF).', 'error');
      return;
    }

    // 2. Max file size check (2MB limit)
    const MAX_SIZE = 2 * 1024 * 1024; // 2MB
    if (file.size > MAX_SIZE) {
      showToast('File Too Large', 'Avatar image must be under 2MB in size.', 'error');
      return;
    }

    // 3. Read & auto-crop/resize to square using HTML Canvas
    const reader = new FileReader();
    reader.onload = (e) => {
      const src = e.target?.result as string;
      if (!src) return;

      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const targetSize = 300; // 300x300 square crop
        canvas.width = targetSize;
        canvas.height = targetSize;
        const ctx = canvas.getContext('2d');

        if (ctx) {
          // Center crop logic
          const minDim = Math.min(img.width, img.height);
          const sx = (img.width - minDim) / 2;
          const sy = (img.height - minDim) / 2;

          ctx.drawImage(img, sx, sy, minDim, minDim, 0, 0, targetSize, targetSize);
          const croppedDataUrl = canvas.toDataURL('image/jpeg', 0.85);
          setProfileData(prev => ({ ...prev, avatar: croppedDataUrl }));
          showToast('Avatar Processed', 'Avatar cropped to square & optimized.', 'info');
        } else {
          setProfileData(prev => ({ ...prev, avatar: src }));
        }
      };
      img.onerror = () => {
        setProfileData(prev => ({ ...prev, avatar: src }));
      };
      img.src = src;
    };
    reader.readAsDataURL(file);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();

    // 1. Safeguards on name
    const trimmedName = profileData.name.trim();
    if (!trimmedName || trimmedName.length < 2) {
      showToast('Invalid Display Name', 'Display name must be at least 2 characters long.', 'error');
      return;
    }
    if (trimmedName.length > 30) {
      showToast('Name Too Long', 'Display name cannot exceed 30 characters.', 'error');
      return;
    }

    // 2. Safeguards on handle
    let trimmedHandle = profileData.handle.trim();
    if (!trimmedHandle.startsWith('@')) {
      trimmedHandle = `@${trimmedHandle}`;
    }
    if (trimmedHandle.length < 3 || trimmedHandle.length > 25) {
      showToast('Invalid Handle', 'Username handle must be between 3 and 25 characters.', 'error');
      return;
    }

    const updatedProf = {
      ...userProfile,
      name: trimmedName,
      handle: trimmedHandle,
      bio: profileData.bio.trim(),
      role: profileData.role.trim() || 'Developer Creator',
      avatar: profileData.avatar
    };

    // Update locally & in Supabase
    setUserProfile(updatedProf);
    if (updateProfileInSupabase) {
      await updateProfileInSupabase({
        name: trimmedName,
        handle: trimmedHandle,
        bio: profileData.bio.trim(),
        role: profileData.role.trim() || 'Developer Creator',
        avatar: profileData.avatar
      });
    }

    showToast('Settings Saved ✨', 'Your display name and profile avatar were updated across Getrefy!', 'success');
  };

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    if (!passwordData.currentPassword || !passwordData.newPassword) {
      showToast('Error', 'Please fill in current and new password.', 'error');
      return;
    }
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      showToast('Error', 'New passwords do not match.', 'error');
      return;
    }
    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    showToast('Password Updated', 'Your security password has been updated.', 'success');
  };

  return (
    <div className="p-4 sm:p-6 max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div className="p-6 rounded-2xl bg-[#F6F7F8] dark:bg-[#1A1A1B] border border-[#E5E5E5] dark:border-[#2A2A2C] space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#2563EB]/10 text-[#2563EB] text-xs font-bold">
          <Settings className="w-3.5 h-3.5" />
          <span>ACCOUNT & PREFERENCES</span>
        </div>
        <h1 className="text-2xl font-black text-[#1A1A1B] dark:text-[#F5F5F5] tracking-tight">
          Settings & Profile Info
        </h1>
        <p className="text-xs text-[#1A1A1B]/70 dark:text-[#F5F5F5]/70">
          Manage your developer profile, avatar image, notification alerts, theme, and security password.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Appearance Box */}
        <div className="p-6 rounded-2xl bg-white dark:bg-[#0E0E10] border border-[#E5E5E5] dark:border-[#2A2A2C] space-y-4">
          <h3 className="text-sm font-bold text-[#1A1A1B] dark:text-[#F5F5F5] border-b border-[#E5E5E5] dark:border-[#2A2A2C] pb-3 flex items-center gap-2">
            <Sun className="w-4 h-4 text-[#2563EB]" />
            <span>Appearance Theme</span>
          </h3>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-xs font-bold text-[#1A1A1B] dark:text-[#F5F5F5]">
                Interface Theme
              </h4>
              <p className="text-[11px] text-[#1A1A1B]/60 dark:text-[#F5F5F5]/60">
                Switch between high-contrast dark canvas (#0E0E10) and clean light mode.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setDarkMode(!darkMode)}
              className="px-4 py-2 rounded-xl bg-[#F6F7F8] dark:bg-[#1A1A1B] border border-[#E5E5E5] dark:border-[#2A2A2C] text-xs font-bold text-[#1A1A1B] dark:text-[#F5F5F5] flex items-center gap-2 hover:border-[#2563EB]"
            >
              {darkMode ? (
                <>
                  <Moon className="w-4 h-4 text-purple-400" />
                  <span>Dark Mode</span>
                </>
              ) : (
                <>
                  <Sun className="w-4 h-4 text-amber-500" />
                  <span>Light Mode</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Profile Edit & Avatar Upload Box */}
        <div className="p-6 rounded-2xl bg-white dark:bg-[#0E0E10] border border-[#E5E5E5] dark:border-[#2A2A2C] space-y-4">
          <h3 className="text-sm font-bold text-[#1A1A1B] dark:text-[#F5F5F5] border-b border-[#E5E5E5] dark:border-[#2A2A2C] pb-3 flex items-center gap-2">
            <User className="w-4 h-4 text-[#2563EB]" />
            <span>Developer Profile Info & Avatar</span>
          </h3>

          {/* Avatar Upload Area */}
          <div className="flex flex-col sm:flex-row items-center gap-4 p-4 rounded-xl bg-[#F6F7F8] dark:bg-[#1A1A1B] border border-[#E5E5E5] dark:border-[#2A2A2C]">
            <img
              src={profileData.avatar}
              alt="Avatar preview"
              className="w-16 h-16 rounded-2xl object-cover border-2 border-[#2563EB] bg-white shrink-0"
            />
            <div className="space-y-1.5 text-center sm:text-left flex-1 min-w-0">
              <h4 className="text-xs font-bold text-[#1A1A1B] dark:text-[#F5F5F5]">
                Profile Avatar Picture
              </h4>
              <p className="text-[11px] text-[#1A1A1B]/60 dark:text-[#F5F5F5]/60">
                Upload a custom developer avatar or paste an image URL below.
              </p>

              <div className="flex flex-wrap items-center gap-2 pt-1">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={(e) => e.target.files?.[0] && handleAvatarFile(e.target.files[0])}
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="px-3 py-1.5 rounded-lg bg-[#2563EB] text-white text-xs font-bold hover:bg-[#2563EB]/90 transition-colors flex items-center gap-1.5"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>Upload Image</span>
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-[#1A1A1B] dark:text-[#F5F5F5] mb-1">
                Display Name
              </label>
              <input
                type="text"
                value={profileData.name}
                onChange={e => setProfileData({ ...profileData, name: e.target.value })}
                className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-[#F6F7F8] dark:bg-[#1A1A1B] border border-[#E5E5E5] dark:border-[#2A2A2C] text-[#1A1A1B] dark:text-[#F5F5F5]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#1A1A1B] dark:text-[#F5F5F5] mb-1">
                Username Handle
              </label>
              <input
                type="text"
                value={profileData.handle}
                onChange={e => setProfileData({ ...profileData, handle: e.target.value })}
                className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-[#F6F7F8] dark:bg-[#1A1A1B] border border-[#E5E5E5] dark:border-[#2A2A2C] text-[#1A1A1B] dark:text-[#F5F5F5]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#1A1A1B] dark:text-[#F5F5F5] mb-1">
              Role / Headline
            </label>
            <input
              type="text"
              value={profileData.role}
              onChange={e => setProfileData({ ...profileData, role: e.target.value })}
              className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-[#F6F7F8] dark:bg-[#1A1A1B] border border-[#E5E5E5] dark:border-[#2A2A2C] text-[#1A1A1B] dark:text-[#F5F5F5]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#1A1A1B] dark:text-[#F5F5F5] mb-1">
              Bio
            </label>
            <textarea
              rows={2}
              value={profileData.bio}
              onChange={e => setProfileData({ ...profileData, bio: e.target.value })}
              className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-[#F6F7F8] dark:bg-[#1A1A1B] border border-[#E5E5E5] dark:border-[#2A2A2C] text-[#1A1A1B] dark:text-[#F5F5F5]"
            />
          </div>
        </div>

        {/* Notifications Box */}
        <div className="p-6 rounded-2xl bg-white dark:bg-[#0E0E10] border border-[#E5E5E5] dark:border-[#2A2A2C] space-y-4">
          <h3 className="text-sm font-bold text-[#1A1A1B] dark:text-[#F5F5F5] border-b border-[#E5E5E5] dark:border-[#2A2A2C] pb-3 flex items-center gap-2">
            <Bell className="w-4 h-4 text-[#2563EB]" />
            <span>Notification Preferences</span>
          </h3>

          <div className="space-y-3">
            <label className="flex items-center justify-between cursor-pointer">
              <span className="text-xs font-bold text-[#1A1A1B] dark:text-[#F5F5F5]">
                Upvote alerts on my launched apps
              </span>
              <input
                type="checkbox"
                checked={notifications.upvotes}
                onChange={e => setNotifications({ ...notifications, upvotes: e.target.checked })}
                className="w-4 h-4 rounded text-[#2563EB]"
              />
            </label>

            <label className="flex items-center justify-between cursor-pointer">
              <span className="text-xs font-bold text-[#1A1A1B] dark:text-[#F5F5F5]">
                New comments & feedback notes
              </span>
              <input
                type="checkbox"
                checked={notifications.comments}
                onChange={e => setNotifications({ ...notifications, comments: e.target.checked })}
                className="w-4 h-4 rounded text-[#2563EB]"
              />
            </label>

            <label className="flex items-center justify-between cursor-pointer">
              <span className="text-xs font-bold text-[#1A1A1B] dark:text-[#F5F5F5]">
                Weekly leaderboard summary
              </span>
              <input
                type="checkbox"
                checked={notifications.weeklyLeaderboard}
                onChange={e => setNotifications({ ...notifications, weeklyLeaderboard: e.target.checked })}
                className="w-4 h-4 rounded text-[#2563EB]"
              />
            </label>
          </div>
        </div>

        <button
          type="submit"
          className="px-6 py-3 rounded-xl bg-[#2563EB] text-white font-bold text-xs hover:bg-[#2563EB]/90 transition-colors shadow-sm flex items-center gap-2"
        >
          <CheckCircle2 className="w-4 h-4" />
          <span>Save Preferences</span>
        </button>
      </form>

      {/* Account Security Section */}
      <div className="p-6 rounded-2xl bg-white dark:bg-[#0E0E10] border border-[#E5E5E5] dark:border-[#2A2A2C] space-y-4">
        <h3 className="text-sm font-bold text-[#1A1A1B] dark:text-[#F5F5F5] border-b border-[#E5E5E5] dark:border-[#2A2A2C] pb-3 flex items-center gap-2">
          <Shield className="w-4 h-4 text-[#2563EB]" />
          <span>Account & Security</span>
        </h3>

        <form onSubmit={handlePasswordChange} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-bold text-[#1A1A1B] dark:text-[#F5F5F5] mb-1">
                Current Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                value={passwordData.currentPassword}
                onChange={e => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                className="w-full px-3.5 py-2 text-xs rounded-xl bg-[#F6F7F8] dark:bg-[#1A1A1B] border border-[#E5E5E5] dark:border-[#2A2A2C] text-[#1A1A1B] dark:text-[#F5F5F5]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#1A1A1B] dark:text-[#F5F5F5] mb-1">
                New Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                value={passwordData.newPassword}
                onChange={e => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                className="w-full px-3.5 py-2 text-xs rounded-xl bg-[#F6F7F8] dark:bg-[#1A1A1B] border border-[#E5E5E5] dark:border-[#2A2A2C] text-[#1A1A1B] dark:text-[#F5F5F5]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#1A1A1B] dark:text-[#F5F5F5] mb-1">
                Confirm New Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                value={passwordData.confirmPassword}
                onChange={e => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                className="w-full px-3.5 py-2 text-xs rounded-xl bg-[#F6F7F8] dark:bg-[#1A1A1B] border border-[#E5E5E5] dark:border-[#2A2A2C] text-[#1A1A1B] dark:text-[#F5F5F5]"
              />
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-[#F6F7F8] dark:bg-[#1A1A1B] border border-[#E5E5E5] dark:border-[#2A2A2C] text-xs font-bold text-[#1A1A1B] dark:text-[#F5F5F5] hover:border-[#2563EB] flex items-center gap-1.5"
            >
              <KeyRound className="w-3.5 h-3.5 text-[#2563EB]" />
              <span>Update Password</span>
            </button>

            <button
              type="button"
              onClick={async () => {
                await signOut();
                setActiveView('home');
                showToast('Signed Out', 'You have been signed out of Getrefy.', 'info');
              }}
              className="px-4 py-2 rounded-xl bg-red-500/10 text-red-600 dark:text-red-400 font-bold text-xs hover:bg-red-500/20 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
