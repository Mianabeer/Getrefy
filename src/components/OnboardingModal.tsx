import React, { useState } from 'react';
import { PandaMascot } from './PandaMascot';
import { Home, PlusSquare, ArrowUp, Flame, Check, ChevronRight, X, Sparkles, Trophy } from 'lucide-react';

interface OnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onGoToCreatePost?: () => void;
}

export const OnboardingModal: React.FC<OnboardingModalProps> = ({
  isOpen,
  onClose,
  onGoToCreatePost
}) => {
  const [currentStep, setCurrentStep] = useState(0);

  if (!isOpen) return null;

  const steps = [
    {
      title: "Welcome to Getrefy!",
      subtitle: "The Transparent Developer Launch Platform",
      mascotMood: "welcome" as const,
      icon: Home,
      iconBg: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
      description: "Getrefy is built specifically for software creators, indie hackers, and developers to showcase apps, tools, and dev logs in a supportive community.",
      highlights: [
        "100% transparent feed with zero paid promotions",
        "Equal instant visibility for first-time builders",
        "Real feedback from verified software creators"
      ]
    },
    {
      title: "Share What You're Building",
      subtitle: "Create Apps, Tools, or Founder Updates",
      mascotMood: "celebrate" as const,
      icon: PlusSquare,
      iconBg: "bg-purple-500/10 text-purple-600 dark:text-purple-400",
      description: "Click the 'Create Post' button anytime to share your app launch, open-source tool, or daily building progress with the community.",
      highlights: [
        "Earn +3 Panda Points for every post created",
        "Add screenshots, demo video links, and tech tags",
        "Option to receive private founder feedback"
      ]
    },
    {
      title: "Upvote, Comment & Earn Points",
      subtitle: "Support Fellow Makers and Level Up",
      mascotMood: "helpful" as const,
      icon: ArrowUp,
      iconBg: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
      description: "Engaging with the community earns you Panda Points! Help fellow developers refine their products while growing your own maker rank.",
      highlights: [
        "+2 Points for upvoting interesting products",
        "+4 Points for leaving constructive comments",
        "Earn badges for top-tier feedback contributions"
      ]
    },
    {
      title: "Build Streaks & Climb Tiers",
      subtitle: "From Bronze to Legendary Creator",
      mascotMood: "excited" as const,
      icon: Trophy,
      iconBg: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
      description: "Stay active daily to maintain your activity streak. As your points accumulate, unlock prestige maker tiers on the global leaderboard!",
      highlights: [
        "Bronze → Silver → Gold → Platinum → Diamond → Legendary",
        "Daily activity streak multiplier",
        "Top makers featured on the weekly podium"
      ]
    }
  ];

  const step = steps[currentStep];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      onClose();
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white dark:bg-[#0E0E10] border border-[#E5E5E5] dark:border-[#2A2A2C] rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-2xl relative overflow-hidden">
        {/* Background glow gradient */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-[#2563EB]/10 rounded-full blur-3xl pointer-events-none" />

        {/* Top Header Controls */}
        <div className="flex items-center justify-between relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2563EB]/10 text-[#2563EB] text-xs font-black">
            <Sparkles className="w-3.5 h-3.5" />
            <span>GETREFY GUIDE • {currentStep + 1}/{steps.length}</span>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-[#F6F7F8] dark:hover:bg-[#1A1A1B] text-[#1A1A1B]/60 dark:text-[#F5F5F5]/60 transition-colors cursor-pointer"
            title="Close Guide"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="text-center space-y-4 relative z-10">
          <div className="flex justify-center my-2">
            <PandaMascot mood={step.mascotMood} size="lg" />
          </div>

          <div className="space-y-1">
            <h2 className="text-2xl font-black text-[#1A1A1B] dark:text-[#F5F5F5] tracking-tight">
              {step.title}
            </h2>
            <p className="text-xs font-bold text-[#2563EB] uppercase tracking-wider">
              {step.subtitle}
            </p>
          </div>

          <p className="text-xs sm:text-sm text-[#1A1A1B]/70 dark:text-[#F5F5F5]/70 leading-relaxed max-w-md mx-auto">
            {step.description}
          </p>

          {/* Key Highlights List */}
          <div className="p-4 rounded-2xl bg-[#F6F7F8] dark:bg-[#1A1A1B] border border-[#E5E5E5] dark:border-[#2A2A2C] space-y-2 text-left">
            {step.highlights.map((h, idx) => (
              <div key={idx} className="flex items-start gap-2 text-xs text-[#1A1A1B]/80 dark:text-[#F5F5F5]/80">
                <div className="p-0.5 rounded-full bg-[#2563EB]/15 text-[#2563EB] shrink-0 mt-0.5">
                  <Check className="w-3 h-3" />
                </div>
                <span className="font-semibold">{h}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Step Indicators & Actions */}
        <div className="space-y-4 pt-2 relative z-10">
          {/* Progress Dots */}
          <div className="flex items-center justify-center gap-1.5">
            {steps.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentStep(i)}
                className={`h-2 rounded-full transition-all cursor-pointer ${
                  i === currentStep
                    ? 'w-6 bg-[#2563EB]'
                    : 'w-2 bg-[#E5E5E5] dark:bg-[#2A2A2C] hover:bg-[#2563EB]/40'
                }`}
              />
            ))}
          </div>

          {/* Buttons */}
          <div className="flex items-center justify-between gap-3">
            {currentStep > 0 ? (
              <button
                onClick={handlePrev}
                className="px-4 py-2.5 rounded-xl border border-[#E5E5E5] dark:border-[#2A2A2C] text-xs font-bold text-[#1A1A1B]/70 dark:text-[#F5F5F5]/70 hover:bg-[#F6F7F8] dark:hover:bg-[#1A1A1B] transition-all cursor-pointer"
              >
                Back
              </button>
            ) : (
              <button
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl text-xs font-bold text-[#1A1A1B]/50 dark:text-[#F5F5F5]/50 hover:text-[#1A1A1B] dark:hover:text-[#F5F5F5] transition-all cursor-pointer"
              >
                Skip Walkthrough
              </button>
            )}

            <button
              onClick={() => {
                if (currentStep === steps.length - 1 && onGoToCreatePost) {
                  onClose();
                  onGoToCreatePost();
                } else {
                  handleNext();
                }
              }}
              className="px-5 py-2.5 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-extrabold transition-all shadow-md flex items-center gap-2 cursor-pointer ml-auto"
            >
              <span>{currentStep === steps.length - 1 ? "Get Started 🚀" : "Continue"}</span>
              {currentStep < steps.length - 1 && <ChevronRight className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
