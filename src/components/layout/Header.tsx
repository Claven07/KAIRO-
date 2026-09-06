import React, { useState } from 'react';
import { useAutomation } from '../../context/AutomationContext';
import {
  Bell,
  Search,
  Plus,
  CheckCircle2,
  AlertTriangle,
  ExternalLink,
  Command,
  Sparkles,
} from 'lucide-react';

export const Header: React.FC = () => {
  const { currentTab, navigateTo, activities, showToast } = useAutomation();
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);

  const getPageTitle = () => {
    switch (currentTab) {
      case 'overview':
        return 'Overview';
      case 'create':
        return 'Create Automation';
      case 'builder':
        return 'Workflow Canvas';
      case 'library':
        return 'Automation Library';
      case 'automations':
        return 'My Automations';
      case 'analytics':
        return 'Performance & Analytics';
      case 'activity':
        return 'Live Activity Timeline';
      case 'settings':
        return 'Settings';
      default:
        return 'Workspace';
    }
  };

  return (
    <>
      <header className="h-16 border-b border-black/[0.07] bg-white/80 backdrop-blur-md px-6 flex items-center justify-between sticky top-0 z-10 select-none">
        {/* Left Breadcrumb */}
        <div className="flex items-center gap-2.5">
          <span className="text-xs font-semibold text-slate-600 uppercase tracking-wider">
            Workspace
          </span>
          <span className="text-slate-300">/</span>
          <h1 className="text-sm font-semibold text-slate-900 tracking-tight">
            {getPageTitle()}
          </h1>
          {currentTab === 'builder' && (
            <span className="ml-2 inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-emerald-50 text-emerald-700 border border-emerald-200/60">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Live Canvas
            </span>
          )}
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          {/* Quick Search Button */}
          <button
            onClick={() => setSearchModalOpen(true)}
            className="hidden md:flex items-center gap-3 px-3 py-1.5 text-xs text-slate-500 bg-slate-100/80 hover:bg-slate-100 hover:text-slate-700 rounded-control border border-black/[0.04] transition-colors"
          >
            <Search className="w-3.5 h-3.5 text-slate-400" />
            <span>Search or command...</span>
            <kbd className="inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[10px] font-medium bg-white rounded border border-black/[0.08] text-slate-500 shadow-2xs">
              <Command className="w-2.5 h-2.5" /> K
            </kbd>
          </button>

          {/* Quick Create CTA */}
          {currentTab !== 'create' && currentTab !== 'builder' && (
            <button
              onClick={() => navigateTo('create')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-[#2547D0] hover:bg-[#1D3BB5] rounded-control shadow-xs transition-all active:scale-[0.98]"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>New Automation</span>
            </button>
          )}

          {/* Notification Button */}
          <div className="relative">
            <button
              onClick={() => setNotificationsOpen(!notificationsOpen)}
              className="w-8 h-8 flex items-center justify-center rounded-control text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors relative"
              title="Notifications"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#2547D0] ring-2 ring-white" />
            </button>

            {/* Notification Popover Dropdown */}
            {notificationsOpen && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-card shadow-float border border-black/[0.08] p-3 z-30 animate-in fade-in slide-in-from-top-1 duration-150">
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-black/[0.05]">
                  <span className="text-xs font-semibold text-slate-900">Notifications</span>
                  <button
                    onClick={() => {
                      showToast('All notifications marked as read', 'info');
                      setNotificationsOpen(false);
                    }}
                    className="text-[11px] text-[#2547D0] hover:underline"
                  >
                    Mark all read
                  </button>
                </div>
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {activities.slice(0, 3).map(act => (
                    <div
                      key={act.id}
                      onClick={() => {
                        navigateTo('activity');
                        setNotificationsOpen(false);
                      }}
                      className="p-2 rounded-control hover:bg-slate-50 cursor-pointer transition-colors text-left"
                    >
                      <div className="flex items-start gap-2">
                        {act.status === 'success' ? (
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 mt-0.5 shrink-0" />
                        ) : (
                          <AlertTriangle className="w-3.5 h-3.5 text-amber-600 mt-0.5 shrink-0" />
                        )}
                        <div className="min-w-0 flex-1">
                          <p className="text-xs font-medium text-slate-800 line-clamp-1">
                            {act.title}
                          </p>
                          <p className="text-[11px] text-slate-600 mt-0.5">
                            {act.timestamp}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="pt-2 mt-2 border-t border-black/[0.05] text-center">
                  <button
                    onClick={() => {
                      navigateTo('activity');
                      setNotificationsOpen(false);
                    }}
                    className="text-xs text-slate-600 hover:text-slate-900 font-medium"
                  >
                    View all activity
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Landing page link */}
          <button
            onClick={() => navigateTo('landing')}
            className="text-xs text-slate-600 hover:text-slate-900 px-2 py-1 rounded hover:bg-slate-100 transition-colors hidden sm:inline-flex items-center gap-1"
            title="Preview Landing Page"
          >
            <span>Landing</span>
            <ExternalLink className="w-3 h-3 text-slate-600" />
          </button>
        </div>
      </header>

      {/* Global Quick Search Modal */}
      {searchModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/20 backdrop-blur-xs flex items-start justify-center pt-24 px-4 animate-in fade-in duration-100">
          <div
            className="w-full max-w-lg bg-white rounded-panel shadow-float border border-black/[0.1] overflow-hidden"
            onClick={e => e.stopPropagation()}
          >
            <div className="p-3 border-b border-black/[0.06] flex items-center gap-3">
              <Search className="w-4 h-4 text-slate-400 shrink-0" />
              <input
                type="text"
                autoFocus
                placeholder="Search automations, templates, docs, or run command..."
                className="w-full text-sm bg-transparent border-none outline-none text-slate-900 placeholder:text-slate-400"
              />
              <kbd
                onClick={() => setSearchModalOpen(false)}
                className="cursor-pointer text-[10px] font-mono px-2 py-1 bg-slate-100 text-slate-500 rounded border border-black/[0.08]"
              >
                ESC
              </kbd>
            </div>
            <div className="p-2 max-h-72 overflow-y-auto space-y-1">
              <div className="px-3 py-1.5 text-[11px] font-semibold text-slate-600 uppercase tracking-wider">
                Quick Navigation
              </div>
              <button
                onClick={() => {
                  navigateTo('overview');
                  setSearchModalOpen(false);
                }}
                className="w-full text-left px-3 py-2 rounded-control text-xs hover:bg-slate-100 flex items-center justify-between text-slate-700"
              >
                <span>Go to Overview</span>
                <span className="text-[11px] text-slate-600">Dashboard</span>
              </button>
              <button
                onClick={() => {
                  navigateTo('create');
                  setSearchModalOpen(false);
                }}
                className="w-full text-left px-3 py-2 rounded-control text-xs hover:bg-slate-100 flex items-center justify-between text-slate-700"
              >
                <span>Create New Automation</span>
                <span className="text-[11px] text-slate-600">AI Prompt</span>
              </button>
              <button
                onClick={() => {
                  navigateTo('builder');
                  setSearchModalOpen(false);
                }}
                className="w-full text-left px-3 py-2 rounded-control text-xs hover:bg-slate-100 flex items-center justify-between text-slate-700"
              >
                <span>Open Workflow Canvas</span>
                <span className="text-[11px] text-slate-600">Visual Builder</span>
              </button>
              <button
                onClick={() => {
                  navigateTo('library');
                  setSearchModalOpen(false);
                }}
                className="w-full text-left px-3 py-2 rounded-control text-xs hover:bg-slate-100 flex items-center justify-between text-slate-700"
              >
                <span>Browse Template Library</span>
                <span className="text-[11px] text-slate-600">Pre-built Workflows</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
