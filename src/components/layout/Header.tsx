import React, { useState } from 'react';
import { useAutomation } from '../../context/AutomationContext';
import {
  Bell,
  Search,
  Plus,
  CheckCircle2,
  AlertTriangle,
  ExternalLink,
  ShieldCheck,
} from 'lucide-react';

export const Header: React.FC = () => {
  const { currentTab, navigateTo, activities, showToast } = useAutomation();
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);

  const getPageMeta = () => {
    switch (currentTab) {
      case 'overview':
        return { title: 'Command Workspace', jp: '統制空間' };
      case 'create':
        return { title: 'Task Composer', jp: '作成器' };
      case 'builder':
        return { title: 'Workflow Canvas', jp: '設計図' };
      case 'library':
        return { title: 'Blueprint Library', jp: '文庫' };
      case 'automations':
        return { title: 'Automations Directory', jp: '自動化目録' };
      case 'analytics':
        return { title: 'Operational Telemetry', jp: '運用分析' };
      case 'activity':
        return { title: 'Audit Trail & Reasoning', jp: '監査証跡' };
      case 'settings':
        return { title: 'Cluster Configuration', jp: '設定' };
      default:
        return { title: 'Workspace', jp: '空間' };
    }
  };

  const pageMeta = getPageMeta();

  return (
    <>
      <header className="h-14 border-b border-black/[0.06] bg-[#FAF9F7]/90 backdrop-blur-md px-4 sm:px-6 flex items-center justify-between sticky top-0 z-10 select-none">
        {/* Left Breadcrumb / Node Identifier */}
        <div className="flex items-center gap-2 min-w-0">
          <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider hidden sm:inline">
            ARASAKA // NODE-01
          </span>
          <span className="text-slate-300 text-xs hidden sm:inline">/</span>
          <div className="flex items-baseline gap-2">
            <h1 className="text-[13.5px] font-semibold text-[#121316] tracking-tight">
              {pageMeta.title}
            </h1>
          </div>

          {currentTab === 'builder' && (
            <span className="ml-2 inline-flex items-center gap-1 px-2 py-0.5 rounded-control text-[10px] font-mono font-medium bg-emerald-50 text-emerald-700 border border-emerald-200/70">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              LIVE CANVAS
            </span>
          )}
        </div>

        {/* Right System Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Sovereign Security Badge */}
          {/* <div className="hidden lg:flex items-center gap-1.5 px-2 py-1 rounded-control bg-black/[0.03] border border-black/[0.06] text-[10.5px] font-mono text-slate-600">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>CONFIDENTIAL // AIR-GAPPED</span>
          </div> */}

          {/* Command Search Trigger */}
          <button
            onClick={() => setSearchModalOpen(true)}
            className="flex items-center gap-2 px-2.5 py-1 text-xs text-slate-500 bg-white hover:bg-slate-50 hover:text-slate-900 rounded-control border border-black/[0.07] shadow-2xs transition-colors pressable"
            title="Search or execute system command (⌘K)"
          >
            <Search className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-[12px] hidden md:inline">Command...</span>
          </button>

          {/* Quick Create Mission CTA */}
          {currentTab !== 'create' && currentTab !== 'builder' && (
            <button
              onClick={() => navigateTo('create')}
              className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium text-white bg-[#121316] hover:bg-[#1D4ED8] rounded-control shadow-2xs transition-all pressable"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Compose Task</span>
            </button>
          )}

          {/* Notification Button & Origin-Aware Popover */}
          <div className="relative">
            <button
              onClick={() => setNotificationsOpen(!notificationsOpen)}
              className="w-7 h-7 flex items-center justify-center rounded-control text-slate-500 hover:text-[#121316] hover:bg-black/[0.04] transition-colors relative pressable"
              title="Audit telemetry notifications"
              aria-label="Audit notifications"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-[#1D4ED8]" />
            </button>

            {/* Notification Popover Dropdown (origin-aware top-right) */}
            {notificationsOpen && (
              <div
                className="absolute right-0 mt-2 w-80 bg-white rounded-card shadow-float border border-black/[0.08] p-3 z-30 transition-all duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] origin-top-right"
                style={{ transformOrigin: 'top right' }}
              >
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-black/[0.05]">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[12px] font-semibold text-[#121316]">
                      System Audit Trail
                    </span>
                    <span className="text-[9px] font-mono text-slate-400">LIVE</span>
                  </div>
                  <button
                    onClick={() => {
                      showToast('Audit notifications acknowledged', 'info');
                      setNotificationsOpen(false);
                    }}
                    className="text-[11px] text-[#1D4ED8] hover:underline font-medium"
                  >
                    Clear
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
                      className="p-2 rounded-control hover:bg-slate-50 cursor-pointer transition-colors text-left group"
                    >
                      <div className="flex items-start gap-2">
                        {act.status === 'success' ? (
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 mt-0.5 shrink-0" />
                        ) : (
                          <AlertTriangle className="w-3.5 h-3.5 text-amber-600 mt-0.5 shrink-0" />
                        )}
                        <div className="min-w-0 flex-1">
                          <p className="text-xs font-medium text-slate-800 line-clamp-1 group-hover:text-[#1D4ED8] transition-colors">
                            {act.title}
                          </p>
                          <div className="flex items-center gap-2 text-[10px] text-slate-400 mt-0.5 font-mono">
                            <span>{act.timestamp}</span>
                            <span>·</span>
                            <span>{act.duration}</span>
                          </div>
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
                    className="text-[11px] text-slate-600 hover:text-[#121316] font-medium"
                  >
                    View complete execution audit →
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Landing page link */}
          {/* <button
            onClick={() => navigateTo('landing')}
            className="text-[11px] font-mono text-slate-500 hover:text-[#121316] px-2 py-1 rounded hover:bg-black/[0.04] transition-colors hidden sm:inline-flex items-center gap-1 pressable"
            title="Return to Sovereign Intro"
          >
            <span>Landing</span>
            <ExternalLink className="w-3 h-3 text-slate-400" />
          </button> */}
        </div>
      </header>

      {/* Global Quick Search / Command Palette Modal */}
      {searchModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/20 backdrop-blur-xs flex items-start justify-center pt-20 px-4"
          onClick={() => setSearchModalOpen(false)}
        >
          <div
            className="w-full max-w-lg bg-white rounded-command shadow-float border border-black/[0.08] overflow-hidden"
            onClick={e => e.stopPropagation()}
          >
            <div className="p-3 border-b border-black/[0.06] flex items-center gap-2.5">
              <Search className="w-4 h-4 text-slate-400 shrink-0" />
              <input
                type="text"
                autoFocus
                placeholder="Type command, search blueprints, or jump to route..."
                className="w-full text-xs bg-transparent border-none outline-none text-[#121316] placeholder:text-slate-400 font-mono"
              />
              <kbd
                onClick={() => setSearchModalOpen(false)}
                className="cursor-pointer text-[10px] font-mono px-1.5 py-0.5 bg-slate-100 text-slate-500 rounded border border-black/[0.06]"
              >
                ESC
              </kbd>
            </div>
            <div className="p-2 max-h-72 overflow-y-auto space-y-0.5 text-left">
              <div className="px-2.5 py-1 text-[10px] font-mono font-medium text-slate-400 uppercase tracking-wider">
                Sovereign Navigation
              </div>
              <button
                onClick={() => {
                  navigateTo('overview');
                  setSearchModalOpen(false);
                }}
                className="w-full text-left px-2.5 py-1.5 rounded-control text-xs hover:bg-slate-100 flex items-center justify-between text-slate-800 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <span className="font-medium">Command Workspace</span>
                  <span className="text-[10px] text-slate-400">Overview & Live Signals</span>
                </div>
                <span className="text-[10px] text-slate-400 font-mono">⌘1</span>
              </button>
              <button
                onClick={() => {
                  navigateTo('create');
                  setSearchModalOpen(false);
                }}
                className="w-full text-left px-2.5 py-1.5 rounded-control text-xs hover:bg-slate-100 flex items-center justify-between text-slate-800 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <span className="font-medium">Compose Task</span>
                  <span className="text-[10px] text-slate-400">Natural Language Mission</span>
                </div>
                <span className="text-[10px] text-slate-400 font-mono">⌘3</span>
              </button>
              <button
                onClick={() => {
                  navigateTo('builder');
                  setSearchModalOpen(false);
                }}
                className="w-full text-left px-2.5 py-1.5 rounded-control text-xs hover:bg-slate-100 flex items-center justify-between text-slate-800 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <span className="font-medium">Workflow Canvas</span>
                  <span className="text-[10px] text-slate-400">Visual Node Architecture</span>
                </div>
                <span className="text-[10px] text-slate-400 font-mono">⌘4</span>
              </button>
              <button
                onClick={() => {
                  navigateTo('library');
                  setSearchModalOpen(false);
                }}
                className="w-full text-left px-2.5 py-1.5 rounded-control text-xs hover:bg-slate-100 flex items-center justify-between text-slate-800 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <span className="font-medium">Blueprint Library</span>
                  <span className="text-[10px] text-slate-400">Curated Industrial Blueprints</span>
                </div>
                <span className="text-[10px] text-slate-400 font-mono">⌘5</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
