import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { PostCard } from './PostCard';
import { PandaMascot } from './PandaMascot';
import { CATEGORIES } from '../data/mockData';
import { Flame, Trophy, Zap, PlusSquare, Filter, ChevronDown, Home as HomeIcon, Check, Layers } from 'lucide-react';
import { CategoryType, SortOption, ProductPost } from '../types';

export const HomeFeed: React.FC = () => {
  const { posts, filters, setFilters, setActiveView, userProfile } = useApp();
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);

  // Filter posts by category and search query
  const filteredPosts = posts.filter(post => {
    const matchesSearch =
      post.title.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
      post.tagline.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
      post.description.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
      post.category.toLowerCase().includes(filters.searchQuery.toLowerCase());

    const matchesCategory =
      filters.category === 'All' || post.category === filters.category;

    return matchesSearch && matchesCategory;
  });

  // Sort posts
  const sortedPosts = [...filteredPosts].sort((a, b) => {
    if (filters.sortBy === 'top') {
      return b.upvotes - a.upvotes;
    }
    if (filters.sortBy === 'newest') {
      const getPostTime = (p: ProductPost) => {
        if (typeof p.timestamp === 'number' && p.timestamp > 0) return p.timestamp;
        if (p.id && p.id.startsWith('post-')) {
          const parsedMs = Number(p.id.replace('post-', ''));
          if (!isNaN(parsedMs) && parsedMs > 1000000000) return parsedMs;
        }
        return 0;
      };
      const timeA = getPostTime(a);
      const timeB = getPostTime(b);
      if (timeA !== timeB) {
        return timeB - timeA;
      }
      return b.id.localeCompare(a.id);
    }
    // Default trending formula
    return (b.upvotes * 2 + b.commentCount * 3) - (a.upvotes * 2 + a.commentCount * 3);
  });

  return (
    <div className="p-4 sm:p-6 max-w-5xl mx-auto space-y-6">
      {/* Primary Top Tab Navigation Bar (Home | Top | Category Dropdown) */}
      <div className="flex items-center justify-between gap-4 p-1.5 rounded-2xl bg-white dark:bg-[#0E0E10] border border-[#E5E5E5] dark:border-[#2A2A2C] shadow-2xs relative">
        <div className="flex items-center gap-1.5">
          {/* Home Tab */}
          <button
            onClick={() => {
              setFilters(prev => ({ ...prev, category: 'All', sortBy: 'trending' }));
              setIsCategoryOpen(false);
            }}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              filters.category === 'All' && filters.sortBy === 'trending'
                ? 'bg-[#2563EB] text-white shadow-xs'
                : 'text-[#1A1A1B]/70 dark:text-[#F5F5F5]/70 hover:bg-[#F6F7F8] dark:hover:bg-[#1A1A1B]'
            }`}
          >
            <HomeIcon className="w-4 h-4" />
            <span>Home</span>
          </button>

          {/* Top Tab */}
          <button
            onClick={() => {
              setFilters(prev => ({ ...prev, category: 'All', sortBy: 'top' }));
              setIsCategoryOpen(false);
            }}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              filters.category === 'All' && filters.sortBy === 'top'
                ? 'bg-[#2563EB] text-white shadow-xs'
                : 'text-[#1A1A1B]/70 dark:text-[#F5F5F5]/70 hover:bg-[#F6F7F8] dark:hover:bg-[#1A1A1B]'
            }`}
          >
            <Trophy className="w-4 h-4" />
            <span>Top</span>
          </button>

          {/* Category Dropdown Trigger */}
          <div className="relative">
            <button
              onClick={() => setIsCategoryOpen(!isCategoryOpen)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                filters.category !== 'All'
                  ? 'bg-[#2563EB] text-white shadow-xs'
                  : 'text-[#1A1A1B]/70 dark:text-[#F5F5F5]/70 hover:bg-[#F6F7F8] dark:hover:bg-[#1A1A1B]'
              }`}
            >
              <Filter className="w-4 h-4" />
              <span>
                {filters.category === 'All' ? 'Category' : `Category: ${filters.category}`}
              </span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isCategoryOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Category Stacked Dropdown Menu */}
            {isCategoryOpen && (
              <div className="absolute top-full left-0 mt-2 w-64 max-h-80 overflow-y-auto rounded-2xl bg-white dark:bg-[#0E0E10] border border-[#E5E5E5] dark:border-[#2A2A2C] shadow-2xl z-40 p-2 space-y-1 animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="px-3 py-1.5 text-[10px] font-bold text-[#1A1A1B]/40 dark:text-[#F5F5F5]/40 uppercase tracking-wider">
                  Select Subcategory
                </div>

                <button
                  onClick={() => {
                    setFilters(prev => ({ ...prev, category: 'All' }));
                    setIsCategoryOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold text-left transition-colors ${
                    filters.category === 'All'
                      ? 'bg-[#2563EB]/10 text-[#2563EB]'
                      : 'text-[#1A1A1B] dark:text-[#F5F5F5] hover:bg-[#F6F7F8] dark:hover:bg-[#1A1A1B]'
                  }`}
                >
                  <span>All Categories</span>
                  {filters.category === 'All' && <Check className="w-3.5 h-3.5" />}
                </button>

                {CATEGORIES.map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => {
                      setFilters(prev => ({ ...prev, category: cat.id }));
                      setIsCategoryOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold text-left transition-colors ${
                      filters.category === cat.id
                        ? 'bg-[#2563EB]/10 text-[#2563EB]'
                        : 'text-[#1A1A1B] dark:text-[#F5F5F5] hover:bg-[#F6F7F8] dark:hover:bg-[#1A1A1B]'
                    }`}
                  >
                    <span>{cat.name}</span>
                    {filters.category === cat.id && <Check className="w-3.5 h-3.5 text-[#2563EB]" />}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {filters.category !== 'All' && (
          <button
            onClick={() => setFilters(prev => ({ ...prev, category: 'All' }))}
            className="text-xs text-[#2563EB] font-bold hover:underline pr-2"
          >
            Clear Filter
          </button>
        )}
      </div>
      {/* Welcome Banner - Only shown to users with 0 products launched */}
      {(!userProfile || userProfile.launchedCount === 0) && (
        <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-[#2563EB] to-[#1D4ED8] text-white shadow-md relative overflow-hidden flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1.5 z-10 max-w-xl">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/20 text-white text-[11px] font-bold">
              <span>🐼 DEVELOPER PRODUCT SHOWCASE</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black tracking-tight leading-tight">
              Launch Your Software, Get Upvotes & Dev Feedback
            </h1>
            <p className="text-xs text-white/80 leading-relaxed">
              Getrefy is the community where developers showcase their apps, tools, and side projects to thousands of makers.
            </p>
          </div>

          <button
            onClick={() => setActiveView('submit')}
            className="px-4 py-2.5 rounded-xl bg-white text-[#2563EB] font-black text-xs hover:bg-white/90 transition-colors shrink-0 shadow-sm flex items-center gap-2 self-start sm:self-center cursor-pointer"
          >
            <PlusSquare className="w-4 h-4" />
            <span>Launch Your App</span>
          </button>
        </div>
      )}

      {/* Category Pills Slider */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs font-bold text-[#1A1A1B]/50 dark:text-[#F5F5F5]/50">
          <span className="flex items-center gap-1.5">
            <Filter className="w-3.5 h-3.5 text-[#2563EB]" />
            <span>CATEGORIES</span>
          </span>
          {filters.category !== 'All' && (
            <button
              onClick={() => setFilters(prev => ({ ...prev, category: 'All' }))}
              className="text-[#2563EB] hover:underline text-[11px]"
            >
              Clear Filter
            </button>
          )}
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none text-xs">
          <button
            onClick={() => setFilters(prev => ({ ...prev, category: 'All' }))}
            className={`px-3.5 py-1.5 rounded-xl font-bold whitespace-nowrap transition-all shrink-0 ${
              filters.category === 'All'
                ? 'bg-[#2563EB] text-white shadow-xs'
                : 'bg-white dark:bg-[#0E0E10] text-[#1A1A1B] dark:text-[#F5F5F5] border border-[#E5E5E5] dark:border-[#2A2A2C] hover:border-[#2563EB]'
            }`}
          >
            All Categories
          </button>

          {CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => setFilters(prev => ({ ...prev, category: cat.id }))}
              className={`px-3.5 py-1.5 rounded-xl font-bold whitespace-nowrap transition-all shrink-0 ${
                filters.category === cat.id
                  ? 'bg-[#2563EB] text-white shadow-xs'
                  : 'bg-white dark:bg-[#0E0E10] text-[#1A1A1B] dark:text-[#F5F5F5] border border-[#E5E5E5] dark:border-[#2A2A2C] hover:border-[#2563EB]'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Sort Options Toolbar */}
      <div className="flex items-center justify-between gap-4 pt-2 border-t border-[#E5E5E5] dark:border-[#2A2A2C]">
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[#F6F7F8] dark:bg-[#1A1A1B] border border-[#E5E5E5] dark:border-[#2A2A2C] text-xs font-bold">
          <button
            onClick={() => setFilters(prev => ({ ...prev, sortBy: 'trending' }))}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
              filters.sortBy === 'trending'
                ? 'bg-white dark:bg-[#0E0E10] text-[#2563EB] shadow-2xs'
                : 'text-[#1A1A1B]/60 dark:text-[#F5F5F5]/60 hover:text-[#1A1A1B]'
            }`}
          >
            <Flame className="w-3.5 h-3.5" />
            <span>Trending</span>
          </button>

          <button
            onClick={() => setFilters(prev => ({ ...prev, sortBy: 'top' }))}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
              filters.sortBy === 'top'
                ? 'bg-white dark:bg-[#0E0E10] text-[#2563EB] shadow-2xs'
                : 'text-[#1A1A1B]/60 dark:text-[#F5F5F5]/60 hover:text-[#1A1A1B]'
            }`}
          >
            <Trophy className="w-3.5 h-3.5" />
            <span>Top Voted</span>
          </button>

          <button
            onClick={() => setFilters(prev => ({ ...prev, sortBy: 'newest' }))}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
              filters.sortBy === 'newest'
                ? 'bg-white dark:bg-[#0E0E10] text-[#2563EB] shadow-2xs'
                : 'text-[#1A1A1B]/60 dark:text-[#F5F5F5]/60 hover:text-[#1A1A1B]'
            }`}
          >
            <Zap className="w-3.5 h-3.5" />
            <span>Newest</span>
          </button>
        </div>

        <span className="text-xs text-[#1A1A1B]/50 dark:text-[#F5F5F5]/50 font-semibold hidden sm:inline">
          Showing {sortedPosts.length} products
        </span>
      </div>

      {/* Main Post Feed */}
      {sortedPosts.length === 0 ? (
        <div className="p-8 sm:p-12 text-center rounded-2xl bg-white dark:bg-[#0E0E10] border border-[#E5E5E5] dark:border-[#2A2A2C]">
          <PandaMascot
            mood="search"
            size="lg"
            title="No Products Match Your Filter"
            subtitle="Try clearing your search term or choosing a different category from above."
            actionLabel="Reset All Filters"
            onAction={() => setFilters({ searchQuery: '', category: 'All', sortBy: 'trending' })}
          />
        </div>
      ) : (
        <div className="space-y-4">
          {sortedPosts.map(post => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
};
