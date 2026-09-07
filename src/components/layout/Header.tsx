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
      <header className="h-14 border-b border-black/[0.05] bg-[#FAF9F7]/85 backdrop-blur-md px-5 flex items-center justify-between sticky top-0 z-10 select-none">
        {/* Left Breadcrumb */}
        <div className="flex items-center gap-2">
          <span className="text-[12px] font-medium text-slate-400">
            Workspace
          </span>
          <span className="text-slate-300 text-xs">/</span>
          <h1 className="text-[13px] font-semibold text-[#18181B] tracking-tight">
            {getPageTitle()}
          </h1>
          {currentTab === 'builder' && (
            <span className="ml-2 inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10.5px] font-medium bg-emerald-50 text-emerald-700 border border-emerald-200/60">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Live Canvas
            </span>
          )}
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2.5">
          {/* Quick Search Button */}
          <button
            onClick={() => setSearchModalOpen(true)}
            className="hidden md:flex items-center gap-2.5 px-2.5 py-1 text-xs text-slate-500 bg-white hover:bg-slate-50 hover:text-slate-700 rounded-md border border-black/[0.06] shadow-2xs transition-colors"
          >
            <Search className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-[12px]">Search or command...</span>
            <kbd className="inline-flex items-center gap-0.5 px-1 py-0.2 text-[10px] font-mono bg-[#FAF9F7] rounded border border-black/[0.06] text-slate-400">
              ⌘K
            </kbd>
          </button>

          {/* Quick Create CTA */}
          {currentTab !== 'create' && currentTab !== 'builder' && (
            <button
              onClick={() => navigateTo('create')}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-white bg-[#18181B] hover:bg-[#2D44D8] rounded-md shadow-2xs transition-all active:scale-[0.98]"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>New Automation</span>
            </button>
          )}

          {/* Notification Button */}
          <div className="relative">
            <button
              onClick={() => setNotificationsOpen(!notificationsOpen)}
              className="w-7 h-7 flex items-center justify-center rounded-md text-slate-500 hover:text-slate-900 hover:bg-black/[0.03] transition-colors relative"
              title="Notifications"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-[#2D44D8]" />
            </button>

            {/* Notification Popover Dropdown */}
            {notificationsOpen && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-card shadow-float border border-black/[0.08] p-3 z-30 animate-in fade-in slide-in-from-top-1 duration-150">
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-black/[0.04]">
                  <span className="text-[12px] font-semibold text-slate-900">Notifications</span>
                  <button
                    onClick={() => {
                      showToast('All notifications marked as read', 'info');
                      setNotificationsOpen(false);
                    }}
                    className="text-[11px] text-[#2D44D8] hover:underline"
                  >
                    Mark all read
                  </button>
                </div>
                <div className="space-y-1.5 max-h-64 overflow-y-auto">
                  {activities.slice(0, 3).map(act => (
                    <div
                      key={act.id}
                      onClick={() => {
                        navigateTo('activity');
                        setNotificationsOpen(false);
                      }}
                      className="p-2 rounded-md hover:bg-slate-50 cursor-pointer transition-colors text-left"
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
                          <p className="text-[10.5px] text-slate-400 mt-0.5">
                            {act.timestamp}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="pt-2 mt-2 border-t border-black/[0.04] text-center">
                  <button
                    onClick={() => {
                      navigateTo('activity');
                      setNotificationsOpen(false);
                    }}
                    className="text-[11px] text-slate-500 hover:text-slate-900 font-medium"
                  >
                    View activity log →
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Landing page preview link */}
          <button
            onClick={() => navigateTo('landing')}
            className="text-[11.5px] text-slate-500 hover:text-slate-900 px-2 py-1 rounded hover:bg-black/[0.03] transition-colors hidden sm:inline-flex items-center gap-1"
            title="Preview Landing Page"
          >
            <span>Landing</span>
            <ExternalLink className="w-3 h-3 text-slate-400" />
          </button>
        </div>
      </header>

      {/* Global Quick Search Modal */}
      {searchModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-slate-900/15 backdrop-blur-xs flex items-start justify-center pt-24 px-4"
          onClick={() => setSearchModalOpen(false)}
        >
          <div
            className="w-full max-w-lg bg-white rounded-card shadow-float border border-black/[0.08] overflow-hidden"
            onClick={e => e.stopPropagation()}
          >
            <div className="p-3 border-b border-black/[0.05] flex items-center gap-2.5">
              <Search className="w-4 h-4 text-slate-400 shrink-0" />
              <input
                type="text"
                autoFocus
                placeholder="Search automations, templates, docs, or run command..."
                className="w-full text-xs bg-transparent border-none outline-none text-slate-900 placeholder:text-slate-400"
              />
              <kbd
                onClick={() => setSearchModalOpen(false)}
                className="cursor-pointer text-[10px] font-mono px-1.5 py-0.5 bg-slate-100 text-slate-500 rounded border border-black/[0.06]"
              >
                ESC
              </kbd>
            </div>
            <div className="p-2 max-h-72 overflow-y-auto space-y-0.5">
              <div className="px-2.5 py-1 text-[10.5px] font-medium text-slate-400 uppercase tracking-wider">
                Quick Navigation
              </div>
              <button
                onClick={() => {
                  navigateTo('overview');
                  setSearchModalOpen(false);
                }}
                className="w-full text-left px-2.5 py-1.5 rounded-md text-xs hover:bg-slate-100 flex items-center justify-between text-slate-700"
              >
                <span>Go to Overview</span>
                <span className="text-[10.5px] text-slate-400 font-mono">Dashboard</span>
              </button>
              <button
                onClick={() => {
                  navigateTo('create');
                  setSearchModalOpen(false);
                }}
                className="w-full text-left px-2.5 py-1.5 rounded-md text-xs hover:bg-slate-100 flex items-center justify-between text-slate-700"
              >
                <span>Create New Automation</span>
                <span className="text-[10.5px] text-slate-400 font-mono">AI Prompt</span>
              </button>
              <button
                onClick={() => {
                  navigateTo('builder');
                  setSearchModalOpen(false);
                }}
                className="w-full text-left px-2.5 py-1.5 rounded-md text-xs hover:bg-slate-100 flex items-center justify-between text-slate-700"
              >
                <span>Open Workflow Canvas</span>
                <span className="text-[10.5px] text-slate-400 font-mono">Visual Builder</span>
              </button>
              <button
                onClick={() => {
                  navigateTo('library');
                  setSearchModalOpen(false);
                }}
                className="w-full text-left px-2.5 py-1.5 rounded-md text-xs hover:bg-slate-100 flex items-center justify-between text-slate-700"
              >
                <span>Browse Template Library</span>
                <span className="text-[10.5px] text-slate-400 font-mono">Curated Workflows</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
