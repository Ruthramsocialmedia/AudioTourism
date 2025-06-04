import React, { useState, useMemo, useEffect } from 'react';
import OnboardingScreen from '@/components/onboarding/OnboardingScreen';
import AuthScreen from '@/components/Auth/AuthScreen';
import DiscoverScreen from '@/components/Discover/DiscoverScreen';
import ToursScreen from '@/components/Tours/ToursScreen';
import JournalScreen from '@/components/Journal/JournalScreen';
import ProfileScreen from '@/components/Profile/ProfileScreen';
import BottomNavigation from '@/components/Layout/BottomNavigation';

type Step = 'onboarding' | 'auth' | 'main';
type TabType = 'discover' | 'tours' | 'journal' | 'profile';

const Index = () => {
  const [currentStep, setCurrentStep] = useState<Step>('onboarding');
  const [activeTab, setActiveTab] = useState<TabType>('discover');

  // Called when onboarding completes → go to auth screen
  const handleOnboardingComplete = () => {
    setCurrentStep('auth');
  };

  // Called when auth completes → go to main interface
  const handleAuthenticated = () => {
    setCurrentStep('main');
  };

  // Change bottom nav tabs
  const handleTabChange = (tabId: TabType) => {
    setActiveTab(tabId);
  };

    useEffect(() => {
    window.scrollTo(0, 0);
  }, [activeTab]);

  // Render the main tab screens based on activeTab
  const renderMainScreen = useMemo(() => {
    switch (activeTab) {
      case 'discover':
        return <DiscoverScreen />;
      case 'tours':
        return <ToursScreen />;
      case 'journal':
        return <JournalScreen />;
      case 'profile':
        return <ProfileScreen />;
      default:
        return <DiscoverScreen />;
    }
  }, [activeTab]);

  // Render onboarding or auth based on step
  if (currentStep === 'onboarding') {
    return <OnboardingScreen onComplete={handleOnboardingComplete} />;
  }

  if (currentStep === 'auth') {
    return <AuthScreen onComplete={handleAuthenticated} />;
  }

  // Main app UI with bottom nav
  return (
    <div className="min-h-screen bg-gray-50 webview-safe">
      {renderMainScreen}
      <BottomNavigation activeTab={activeTab} onTabChange={handleTabChange} />
    </div>
  );
};

export default Index;
