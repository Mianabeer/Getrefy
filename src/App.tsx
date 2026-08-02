import React, { useState } from 'react';
import { AuthProvider } from './context/AuthContext';
import { AppProvider, useApp } from './context/AppContext';
import { ErrorBoundary } from './components/ErrorBoundary';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { HomeFeed } from './components/HomeFeed';
import { SubmitProductView } from './components/SubmitProductView';
import { LeaderboardView } from './components/LeaderboardView';
import { ProfileView } from './components/ProfileView';
import { SettingsView } from './components/SettingsView';
import { WhyGetrefyView } from './components/WhyGetrefyView';
import { NotificationsView } from './components/NotificationsView';
import { PostDetailModal } from './components/PostDetailModal';
import { AiAdvisorModal } from './components/AiAdvisorModal';
import { AuthModal } from './components/AuthModal';
import { ToastContainer } from './components/Toast';
import { MobileBottomNav } from './components/MobileBottomNav';

const MainLayout: React.FC = () => {
  const { activeView } = useApp();
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [postForAi, setPostForAi] = useState<any>(null);

  const handleOpenAiModal = (post?: any) => {
    setPostForAi(post || null);
    setIsAiModalOpen(true);
  };

  return (
    <div className="flex min-h-screen bg-[#FFFFFF] dark:bg-[#0E0E10] text-[#1A1A1B] dark:text-[#F5F5F5] font-sans antialiased selection:bg-[#2563EB]/20 selection:text-[#2563EB]">
      {/* Fixed Left Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <Header onOpenAiAdvisor={() => handleOpenAiModal()} />

        <main className="flex-1 pb-12">
          {activeView === 'home' && <HomeFeed />}
          {activeView === 'submit' && <SubmitProductView />}
          {activeView === 'leaderboard' && <LeaderboardView />}
          {activeView === 'profile' && <ProfileView />}
          {activeView === 'settings' && <SettingsView />}
          {activeView === 'why' && <WhyGetrefyView />}
          {activeView === 'notifications' && <NotificationsView />}
        </main>
      </div>

      {/* Modals & Toast Notifications */}
      <PostDetailModal onOpenAiAdvisorForPost={(post) => handleOpenAiModal(post)} />
      <AiAdvisorModal
        isOpen={isAiModalOpen}
        onClose={() => setIsAiModalOpen(false)}
        initialPost={postForAi}
      />
      <AuthModal />
      <MobileBottomNav />
      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <AppProvider>
          <MainLayout />
        </AppProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
}

