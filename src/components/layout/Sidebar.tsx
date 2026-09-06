import React from 'react';
import { useAutomation } from '../../context/AutomationContext';
import { NavigationTab } from '../../types';
import {
  LayoutDashboard,
  Sparkles,
  GitBranch,
  BookOpen,
  Boxes,
  BarChart3,
  History,
  Settings,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
} from 'lucide-react';

interface NavItem {
  tab: NavigationTab;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
}

export const Sidebar: React.FC = () => {
  const { currentTab, navigateTo, automations, sidebarCollapsed, toggleSidebar } = useAutomation();

  const activeCount = automations.filter(a => a.status === 'active').length;

  const mainNav: NavItem[] = [
    { tab: 'overview', label: 'Overview', icon: LayoutDashboard },
    { tab: 'automations', label: 'Automations', icon: Boxes, badge: `${activeCount}` },
    { tab: 'create', label: 'Create', icon: Sparkles },
    { tab: 'builder', label: 'Canvas', icon: GitBranch },
    { tab: 'library', label: 'Library', icon: BookOpen },
    { tab: 'analytics', label: 'Analytics', icon: BarChart3 },
    { tab: 'activity', label: 'Activity', icon: History },
  ];

  return (
    <aside
      className={`relative flex flex-col border-r border-black/[0.07] bg-[#FDFDFE] transition-all duration-300 ease-in-out z-20 select-none ${
        sidebarCollapsed ? 'w-[72px]' : 'w-[240px]'
      }`}
    >
      {/* Top Brand Logo */}
      <div className="h-16 flex items-center justify-between px-5 border-b border-black/[0.05]">
        <button
          onClick={() => navigateTo('landing')}
          className="flex items-center gap-3 text-left focus:outline-none group"
          title="Back to Landing Page"
        >
          <div className="w-8 h-8 rounded-lg bg-[#2547D0] flex items-center justify-center text-white font-semibold text-sm shadow-sm transition-transform duration-200 group-hover:scale-105">
            <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          {!sidebarCollapsed && (
            <div className="flex flex-col">
              <span className="font-semibold tracking-tight text-slate-900 text-[15px] leading-tight">
                KAIRO
              </span>
              <span className="text-[10px] text-slate-600 font-medium tracking-wide uppercase">
                Workspace
              </span>
            </div>
          )}
        </button>

        {!sidebarCollapsed && (
          <button
            onClick={toggleSidebar}
            className="w-7 h-7 flex items-center justify-center rounded-md text-slate-500 hover:text-slate-700 hover:bg-slate-100 transition-colors"
            title="Collapse Sidebar"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
        )}
      </div>

      {sidebarCollapsed && (
        <div className="py-2 flex justify-center border-b border-black/[0.05]">
          <button
            onClick={toggleSidebar}
            className="w-7 h-7 flex items-center justify-center rounded-md text-slate-500 hover:text-slate-700 hover:bg-slate-100 transition-colors"
            title="Expand Sidebar"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Navigation Links */}
      <div className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
        {!sidebarCollapsed && (
          <div className="px-3 pb-2 text-[11px] font-semibold text-slate-600 uppercase tracking-wider">
            Workspace
          </div>
        )}
        {mainNav.map(item => {
          const Icon = item.icon;
          const isActive = currentTab === item.tab;
          return (
            <button
              key={item.tab}
              onClick={() => navigateTo(item.tab)}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-control text-[13.5px] font-medium transition-all duration-150 relative group ${
                isActive
                  ? 'bg-slate-100/90 text-[#2547D0]'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
              title={sidebarCollapsed ? item.label : undefined}
            >
              {isActive && (
                <span className="absolute left-0 top-1.5 bottom-1.5 w-[3px] rounded-r-full bg-[#2547D0]" />
              )}
              <Icon
                className={`w-[18px] h-[18px] transition-colors shrink-0 ${
                  isActive ? 'text-[#2547D0]' : 'text-slate-500 group-hover:text-slate-700'
                }`}
              />
              {!sidebarCollapsed && (
                <span className="truncate flex-1 text-left">{item.label}</span>
              )}
              {!sidebarCollapsed && item.badge && (
                <span
                  className={`text-[11px] font-medium px-2 py-0.5 rounded-full ${
                    isActive
                      ? 'bg-blue-50 text-[#2547D0]'
                      : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}

        <div className="pt-4 mt-4 border-t border-black/[0.05]">
          {!sidebarCollapsed && (
            <div className="px-3 pb-2 text-[11px] font-semibold text-slate-600 uppercase tracking-wider">
              System
            </div>
          )}
          <button
            onClick={() => navigateTo('settings')}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-control text-[13.5px] font-medium transition-all duration-150 relative group ${
              currentTab === 'settings'
                ? 'bg-slate-100 text-[#2547D0]'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
            title={sidebarCollapsed ? 'Settings' : undefined}
          >
            {currentTab === 'settings' && (
              <span className="absolute left-0 top-1.5 bottom-1.5 w-[3px] rounded-r-full bg-[#2547D0]" />
            )}
            <Settings
              className={`w-[18px] h-[18px] transition-colors shrink-0 ${
                currentTab === 'settings' ? 'text-[#2547D0]' : 'text-slate-500 group-hover:text-slate-700'
              }`}
            />
            {!sidebarCollapsed && (
              <span className="truncate flex-1 text-left">Settings</span>
            )}
          </button>
        </div>
      </div>

      {/* Bottom Profile & Status */}
      <div className="p-3 border-t border-black/[0.05] bg-[#FAFBFD]">
        <div
          className={`flex items-center gap-3 p-2 rounded-control hover:bg-slate-100/80 transition-colors cursor-pointer ${
            sidebarCollapsed ? 'justify-center' : ''
          }`}
          onClick={() => navigateTo('settings')}
        >
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-slate-200 to-slate-100 border border-black/[0.08] flex items-center justify-center text-slate-700 font-semibold text-xs shrink-0">
            OB
          </div>
          {!sidebarCollapsed && (
            <div className="flex flex-col min-w-0 flex-1">
              <span className="text-[13px] font-medium text-slate-900 truncate">
                Omansh Bhatnagar
              </span>
              <span className="text-[11px] text-slate-600 truncate flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Live Studio
              </span>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};
