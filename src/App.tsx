import React from 'react';
import { AutomationProvider, useAutomation } from './context/AutomationContext';
import { Sidebar } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';
import { LandingPage } from './components/landing/LandingPage';
import { OverviewPage } from './components/overview/OverviewPage';
import { CreateAutomationPage } from './components/create/CreateAutomationPage';
import { WorkflowBuilderPage } from './components/builder/WorkflowBuilderPage';
import { AutomationLibraryPage } from './components/library/AutomationLibraryPage';
import { MyAutomationsPage } from './components/automations/MyAutomationsPage';
import { AnalyticsPage } from './components/analytics/AnalyticsPage';
import { ActivityPage } from './components/activity/ActivityPage';
import { SettingsPage } from './components/settings/SettingsPage';
import { ActivationModal } from './components/common/ActivationModal';
import { ToastContainer } from './components/common/ToastContainer';

const MainWorkspace: React.FC = () => {
  const { currentTab } = useAutomation();

  if (currentTab === 'landing') {
    return (
      <>
        <LandingPage />
        <ToastContainer />
      </>
    );
  }

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#F8F9FA]">
      {/* Sidebar Navigation */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
        <Header />

        <main className="flex-1 overflow-y-auto relative">
          {currentTab === 'overview' && <OverviewPage />}
          {currentTab === 'create' && <CreateAutomationPage />}
          {currentTab === 'builder' && <WorkflowBuilderPage />}
          {currentTab === 'library' && <AutomationLibraryPage />}
          {currentTab === 'automations' && <MyAutomationsPage />}
          {currentTab === 'analytics' && <AnalyticsPage />}
          {currentTab === 'activity' && <ActivityPage />}
          {currentTab === 'settings' && <SettingsPage />}
        </main>
      </div>

      {/* Global Modals & Notifications */}
      <ActivationModal />
      <ToastContainer />
    </div>
  );
};

export function App() {
  return (
    <AutomationProvider>
      <MainWorkspace />
    </AutomationProvider>
  );
}

export default App;
