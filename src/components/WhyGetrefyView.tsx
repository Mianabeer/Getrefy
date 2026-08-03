import React from 'react';
import { useApp } from '../context/AppContext';
import { ShieldCheck, Award, Rocket, Globe, CheckCircle2, ArrowRight, Lock, Check } from 'lucide-react';

export const WhyGetrefyView: React.FC = () => {
  const { setActiveView } = useApp();

  const pillars = [
    {
      icon: ShieldCheck,
      title: "We Don't Ban or Remove Posts Unfairly",
      badge: "Transparent Moderation",
      color: "from-blue-500/10 to-indigo-500/10 border-blue-500/30 text-blue-600 dark:text-blue-400",
      description: "Unlike legacy launch directories with opaque moderation bots and arbitrary shadowbans, Getrefy operates with complete community transparency. Unless a submission contains malicious spam, malware, or harmful content, your product stays live and accessible permanently."
    },
    {
      icon: Award,
      title: "Zero Paid Ranking — Pure Meritocracy",
      badge: "100% Organic Upvotes",
      color: "from-amber-500/10 to-orange-500/10 border-amber-500/30 text-amber-600 dark:text-amber-400",
      description: "We never take money or sell sponsored slots to boost products to the top of the feed. Authentic upvotes from verified developer accounts are the only metric that determines trending placement and weekly leaderboard rankings."
    },
    {
      icon: Rocket,
      title: "Equal Instant Visibility for All Builders",
      badge: "No Karma Gates",
      color: "from-purple-500/10 to-pink-500/10 border-purple-500/30 text-purple-600 dark:text-purple-400",
      description: "First-time founders and brand new accounts receive the exact same feed placement as established makers. No account age restrictions, no waiting periods, and no algorithmic penalty on your debut project."
    },
    {
      icon: Globe,
      title: "One Unified Home for Every Tech Niche",
      badge: "SaaS • Mobile • Web • E-Com",
      color: "from-emerald-500/10 to-teal-500/10 border-emerald-500/30 text-emerald-600 dark:text-emerald-400",
      description: "Whether you are launching a B2B SaaS, a SwiftUI iOS app, an open-source CLI tool, a Shopify dropshipping utility, or documenting Day 12 of your founder journey, Getrefy connects all builders in one supportive ecosystem."
    }
  ];

  return (
    <div className="p-4 sm:p-6 max-w-4xl mx-auto space-y-8">
      {/* Hero Banner */}
      <div className="p-6 sm:p-10 rounded-3xl bg-gradient-to-br from-white via-white to-[#2563EB]/5 dark:from-[#0E0E10] dark:via-[#0E0E10] dark:to-[#2563EB]/10 border border-[#E5E5E5] dark:border-[#2A2A2C] text-center space-y-4 relative overflow-hidden shadow-sm">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#2563EB]/5 rounded-full blur-3xl pointer-events-none" />

        <div className="w-16 h-16 rounded-2xl bg-[#2563EB]/10 border border-[#2563EB]/30 text-[#2563EB] flex items-center justify-center mx-auto shadow-sm">
          <ShieldCheck className="w-8 h-8" />
        </div>

        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#2563EB]/10 text-[#2563EB] text-xs font-black tracking-wide">
          <Lock className="w-3.5 h-3.5" />
          <span>OUR COMMITMENT TO BUILDERS</span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-black text-[#1A1A1B] dark:text-[#F5F5F5] tracking-tight leading-tight max-w-2xl mx-auto">
          Why Getrefy is Built Different From Other Launch Sites
        </h1>

        <p className="text-xs sm:text-sm text-[#1A1A1B]/70 dark:text-[#F5F5F5]/70 max-w-xl mx-auto leading-relaxed">
          We created Getrefy because developer creators deserved an honest, transparent, and encouraging home to launch products, gather real feedback, and build in public.
        </p>
      </div>

      {/* 4 Core Pillars Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {pillars.map((pillar, i) => {
          const Icon = pillar.icon;

          return (
            <div
              key={i}
              className="p-6 rounded-2xl bg-white dark:bg-[#0E0E10] border border-[#E5E5E5] dark:border-[#2A2A2C] hover:border-[#2563EB]/40 transition-all space-y-3.5 group relative overflow-hidden"
            >
              <div className="flex items-center justify-between">
                <div className={`p-3 rounded-xl bg-gradient-to-br ${pillar.color} border shadow-2xs`}>
                  <Icon className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-md bg-[#F6F7F8] dark:bg-[#1A1A1B] text-[#1A1A1B]/60 dark:text-[#F5F5F5]/60 border border-[#E5E5E5] dark:border-[#2A2A2C]">
                  {pillar.badge}
                </span>
              </div>

              <h3 className="text-base sm:text-lg font-bold text-[#1A1A1B] dark:text-[#F5F5F5] leading-snug group-hover:text-[#2563EB] transition-colors">
                {pillar.title}
              </h3>

              <p className="text-xs sm:text-sm text-[#1A1A1B]/70 dark:text-[#F5F5F5]/70 leading-relaxed">
                {pillar.description}
              </p>

              <div className="pt-2 flex items-center gap-1.5 text-xs font-semibold text-[#2563EB]">
                <CheckCircle2 className="w-4 h-4" />
                <span>Verified Getrefy Promise</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Comparison Callout */}
      <div className="p-6 sm:p-8 rounded-2xl bg-[#F6F7F8] dark:bg-[#1A1A1B] border border-[#E5E5E5] dark:border-[#2A2A2C] space-y-4">
        <h3 className="text-base font-bold text-[#1A1A1B] dark:text-[#F5F5F5] flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-[#2563EB]" />
          <span>How Getrefy Compares</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-red-500/5 border border-red-500/20 space-y-2">
            <h4 className="font-bold text-red-600 dark:text-red-400">❌ Other Launch Platforms</h4>
            <ul className="space-y-1.5 text-[#1A1A1B]/70 dark:text-[#F5F5F5]/70 list-disc list-inside">
              <li>Arbitrary post bans and unexplained removals</li>
              <li>Featured slots sold to highest bidders</li>
              <li>New accounts buried under karma thresholds</li>
              <li>Heavy algorithmic bias toward big brands</li>
            </ul>
          </div>

          <div className="p-4 rounded-xl bg-[#2563EB]/5 border border-[#2563EB]/20 space-y-2">
            <h4 className="font-bold text-[#2563EB] dark:text-[#60A5FA]">✅ The Getrefy Standard</h4>
            <ul className="space-y-1.5 text-[#1A1A1B]/70 dark:text-[#F5F5F5]/70 list-disc list-inside">
              <li>100% transparent guidelines & zero arbitrary bans</li>
              <li>No paid placement — pure community upvotes</li>
              <li>Equal instant visibility for all first-time makers</li>
              <li>Supportive environment for every software niche</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom CTA Banner */}
      <div className="p-8 rounded-3xl bg-gradient-to-r from-[#2563EB] to-purple-600 text-white text-center space-y-4 shadow-lg">
        <h2 className="text-xl sm:text-2xl font-black tracking-tight">
          Ready to Share What You Are Building?
        </h2>
        <p className="text-xs sm:text-sm text-white/80 max-w-md mx-auto leading-relaxed">
          Submit your app to Getrefy today, earn Panda Points, gather maker feedback, and climb the weekly launch leaderboard.
        </p>

        <div className="flex items-center justify-center gap-3 pt-2 flex-wrap">
          <button
            onClick={() => setActiveView('submit')}
            className="px-5 py-2.5 rounded-xl bg-white text-[#2563EB] font-bold text-xs hover:bg-white/90 transition-all flex items-center gap-2 cursor-pointer shadow-md"
          >
            <span>Create Post (+3 pts)</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => setActiveView('home')}
            className="px-5 py-2.5 rounded-xl bg-white/10 text-white font-bold text-xs hover:bg-white/20 transition-all cursor-pointer border border-white/20"
          >
            <span>Explore Home Feed</span>
          </button>
        </div>
      </div>
    </div>
  );
};

