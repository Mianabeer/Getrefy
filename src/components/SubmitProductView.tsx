import React, { useState, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { CategoryType } from '../types';
import { CATEGORIES } from '../data/mockData';
import { PlusSquare, Rocket, Image as ImageIcon, ArrowUp, MessageSquare, Share2, ShieldCheck, Upload, X, Link } from 'lucide-react';

export const SubmitProductView: React.FC = () => {
  const { addPost, setActiveView, userProfile, showToast } = useApp();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    title: '',
    tagline: '',
    productUrl: '',
    category: 'SaaS' as CategoryType,
    description: '',
    logoUrl: '',
    imageUrl: ''
  });

  const [isDragging, setIsDragging] = useState(false);
  const [useUrlInput, setUseUrlInput] = useState(false);

  const handleFileProcess = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file (PNG, JPG, WEBP, GIF)');
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      if (result) {
        setFormData(prev => ({ ...prev, imageUrl: result }));
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileProcess(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileProcess(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title || !formData.tagline) {
      alert('Please fill in required fields: Product Name and Tagline.');
      return;
    }

    const defaultLogo = formData.logoUrl || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=120&auto=format&fit=crop&q=80';

    addPost({
      title: formData.title,
      tagline: formData.tagline,
      productUrl: formData.productUrl,
      category: formData.category,
      description: formData.description || formData.tagline,
      logoUrl: defaultLogo,
      imageUrl: formData.imageUrl || undefined,
      maker: {
        name: userProfile.name,
        handle: userProfile.handle,
        avatar: userProfile.avatar,
        badge: 'Maker 🐼',
        isVerifiedMaker: true
      },
      screenshots: formData.imageUrl ? [formData.imageUrl] : []
    });

    showToast('Product Launched! 🚀', `${formData.title} was published to Getrefy (+3 points earned)!`, 'panda');
    setActiveView('home');
  };

  return (
    <div className="p-4 sm:p-6 max-w-5xl mx-auto space-y-6">
      {/* Header Banner */}
      <div className="p-6 rounded-2xl bg-[#F6F7F8] dark:bg-[#1A1A1B] border border-[#E5E5E5] dark:border-[#2A2A2C] space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#2563EB]/10 text-[#2563EB] text-xs font-bold">
          <Rocket className="w-3.5 h-3.5" />
          <span>LAUNCH YOUR PRODUCT (+3 PANDA POINTS)</span>
        </div>
        <h1 className="text-2xl font-black text-[#1A1A1B] dark:text-[#F5F5F5] tracking-tight">
          Showcase Your App or Project to Developers
        </h1>
        <p className="text-xs text-[#1A1A1B]/70 dark:text-[#F5F5F5]/70 max-w-xl">
          Publish your software, web tool, iOS app, open source repo, or indie product to Getrefy. Get real upvotes, constructive developer feedback, and early users.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Form Column */}
        <form onSubmit={handleSubmit} className="lg:col-span-2 space-y-5 bg-white dark:bg-[#0E0E10] p-6 rounded-2xl border border-[#E5E5E5] dark:border-[#2A2A2C] shadow-2xs">
          <h3 className="text-sm font-bold text-[#1A1A1B] dark:text-[#F5F5F5] border-b border-[#E5E5E5] dark:border-[#2A2A2C] pb-3">
            Product Launch Details
          </h3>

          <div className="space-y-4">
            {/* Title & Tagline Visual Unit Group */}
            <div className="p-4 rounded-xl bg-[#F6F7F8] dark:bg-[#1A1A1B] border border-[#E5E5E5] dark:border-[#2A2A2C] space-y-3">
              <div>
                <label className="block text-xs font-black uppercase text-[#2563EB] mb-1 tracking-wider">
                  Product Name / Headline Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. DevPulse — Real-time API Latency Inspector"
                  value={formData.title}
                  onChange={e => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3.5 py-3 text-sm font-bold rounded-xl bg-white dark:bg-[#0E0E10] border border-[#E5E5E5] dark:border-[#2A2A2C] text-[#1A1A1B] dark:text-[#F5F5F5] focus:outline-none focus:border-[#2563EB]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1A1A1B] dark:text-[#F5F5F5] mb-1">
                  Tagline / Short Pitch *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Lightweight latency monitor that pings endpoints & alerts Slack in 200ms"
                  value={formData.tagline}
                  onChange={e => setFormData({ ...formData, tagline: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-white dark:bg-[#0E0E10] border border-[#E5E5E5] dark:border-[#2A2A2C] text-[#1A1A1B] dark:text-[#F5F5F5] focus:outline-none focus:border-[#2563EB]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#1A1A1B] dark:text-[#F5F5F5] mb-1">
                  Product Website / GitHub URL (optional)
                </label>
                <input
                  type="url"
                  placeholder="https://yourproduct.com (optional)"
                  value={formData.productUrl}
                  onChange={e => setFormData({ ...formData, productUrl: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-[#F6F7F8] dark:bg-[#1A1A1B] border border-[#E5E5E5] dark:border-[#2A2A2C] text-[#1A1A1B] dark:text-[#F5F5F5] focus:outline-none focus:border-[#2563EB]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1A1A1B] dark:text-[#F5F5F5] mb-1">
                  Category *
                </label>
                <select
                  value={formData.category}
                  onChange={e => setFormData({ ...formData, category: e.target.value as CategoryType })}
                  className="w-full px-3.5 py-2.5 text-xs font-bold rounded-xl bg-[#F6F7F8] dark:bg-[#1A1A1B] border border-[#E5E5E5] dark:border-[#2A2A2C] text-[#1A1A1B] dark:text-[#F5F5F5] focus:outline-none focus:border-[#2563EB]"
                >
                  {CATEGORIES.map(c => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Drag & Drop Screenshot Upload Area */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-bold text-[#1A1A1B] dark:text-[#F5F5F5]">
                  Product Screenshot / Showcase Image
                </label>
                <button
                  type="button"
                  onClick={() => setUseUrlInput(!useUrlInput)}
                  className="text-[11px] text-[#2563EB] font-bold hover:underline flex items-center gap-1"
                >
                  <Link className="w-3 h-3" />
                  <span>{useUrlInput ? 'Switch to File Upload' : 'Paste Image URL'}</span>
                </button>
              </div>

              {useUrlInput ? (
                <input
                  type="url"
                  placeholder="https://images.unsplash.com/photo-..."
                  value={formData.imageUrl}
                  onChange={e => setFormData({ ...formData, imageUrl: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-[#F6F7F8] dark:bg-[#1A1A1B] border border-[#E5E5E5] dark:border-[#2A2A2C] text-[#1A1A1B] dark:text-[#F5F5F5] focus:outline-none focus:border-[#2563EB]"
                />
              ) : formData.imageUrl ? (
                <div className="relative rounded-xl overflow-hidden border border-[#E5E5E5] dark:border-[#2A2A2C] aspect-[16/9] w-full bg-[#F6F7F8] dark:bg-[#1A1A1B] group">
                  <img src={formData.imageUrl} alt="Upload Preview" className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, imageUrl: '' })}
                    className="absolute top-3 right-3 p-1.5 rounded-full bg-black/70 text-white hover:bg-red-600 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div
                  onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                  onDragLeave={() => setIsDragging(false)}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all ${
                    isDragging
                      ? 'border-[#2563EB] bg-[#2563EB]/10'
                      : 'border-[#E5E5E5] dark:border-[#2A2A2C] bg-[#F6F7F8] dark:bg-[#1A1A1B] hover:border-[#2563EB]'
                  }`}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileSelect}
                    className="hidden"
                  />
                  <Upload className="w-8 h-8 text-[#2563EB] mx-auto mb-2" />
                  <p className="text-xs font-bold text-[#1A1A1B] dark:text-[#F5F5F5]">
                    Drag & drop your product screenshot here, or <span className="text-[#2563EB] underline">browse files</span>
                  </p>
                  <p className="text-[10px] text-[#1A1A1B]/50 dark:text-[#F5F5F5]/50 mt-1">
                    Supports PNG, JPG, WEBP, or GIF (max 10MB)
                  </p>
                </div>
              )}
            </div>

            <div>
              <label className="block text-xs font-bold text-[#1A1A1B] dark:text-[#F5F5F5] mb-1">
                Full Description & Maker Story
              </label>
              <textarea
                rows={4}
                placeholder="Explain what problem your product solves, how you built it, tech stack used, and what feedback you are looking for..."
                value={formData.description}
                onChange={e => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-[#F6F7F8] dark:bg-[#1A1A1B] border border-[#E5E5E5] dark:border-[#2A2A2C] text-[#1A1A1B] dark:text-[#F5F5F5] focus:outline-none focus:border-[#2563EB]"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-[#2563EB] text-white font-black text-xs sm:text-sm hover:bg-[#2563EB]/90 transition-colors shadow-sm flex items-center justify-center gap-2"
            >
              <Rocket className="w-4 h-4" />
              <span>Publish Product to Getrefy Feed (+3 Points)</span>
            </button>
          </div>
        </form>

        {/* Live Reddit-Style Preview Column */}
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-[#F6F7F8] dark:bg-[#1A1A1B] border border-[#E5E5E5] dark:border-[#2A2A2C] sticky top-20">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#2563EB] mb-3">
              Reddit-Style Live Feed Preview
            </h4>

            {/* Post Card Preview */}
            <div className="p-4 rounded-2xl bg-white dark:bg-[#0E0E10] border border-[#E5E5E5] dark:border-[#2A2A2C] space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="px-2.5 py-0.5 rounded-md bg-[#2563EB]/10 text-[#2563EB] font-bold text-[11px]">
                  {formData.category}
                </span>
                <div className="flex items-center gap-1.5 text-[#1A1A1B]/70 dark:text-[#F5F5F5]/70 text-[11px]">
                  <img src={userProfile.avatar} alt="" className="w-4 h-4 rounded-full object-cover" />
                  <span className="font-semibold text-[#1A1A1B] dark:text-[#F5F5F5]">{userProfile.name}</span>
                  <ShieldCheck className="w-3 h-3 text-[#2563EB]" />
                  <span>Just now</span>
                </div>
              </div>

              <div className="space-y-1">
                <h2 className="text-base font-bold text-[#1A1A1B] dark:text-[#F5F5F5] leading-snug">
                  {formData.title || 'Your App Title Headline'}
                </h2>
                <p className="text-xs text-[#1A1A1B]/70 dark:text-[#F5F5F5]/70 line-clamp-2">
                  {formData.tagline || 'Short tagline preview showing what your app does...'}
                </p>
              </div>

              {formData.imageUrl && (
                <div className="rounded-xl overflow-hidden bg-[#F6F7F8] dark:bg-[#1A1A1B] border border-[#E5E5E5] dark:border-[#2A2A2C] max-h-48 aspect-[16/9] w-full">
                  <img src={formData.imageUrl} alt="" className="w-full h-full max-h-48 object-cover rounded-xl" />
                </div>
              )}

              <div className="flex items-center gap-3 pt-2 border-t border-[#E5E5E5]/60 dark:border-[#2A2A2C]/60 text-xs">
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#2563EB] text-white font-bold">
                  <ArrowUp className="w-3.5 h-3.5" />
                  <span>1</span>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#F6F7F8] dark:bg-[#1A1A1B] text-[#1A1A1B]/70 dark:text-[#F5F5F5]/70 font-semibold">
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>0 comments</span>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#F6F7F8] dark:bg-[#1A1A1B] text-[#1A1A1B]/70 dark:text-[#F5F5F5]/70 font-semibold">
                  <Share2 className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
