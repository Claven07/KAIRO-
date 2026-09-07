import React from 'react';
import { useAutomation } from '../../context/AutomationContext';
import { NavigationTab } from '../../types';
import {
  LayoutDashboard,
  Boxes,
  Sparkles,
  GitBranch,
  BookOpen,
  BarChart3,
  History,
  Settings,
  ChevronLeft,
  ChevronRight,
  User,
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
      className={`relative flex flex-col border-r border-black/[0.05] bg-[#FAF9F7] transition-all duration-200 ease-out z-20 select-none ${
        sidebarCollapsed ? 'w-[64px]' : 'w-[224px]'
      }`}
    >
      {/* Brand Header */}
      <div className="h-14 flex items-center justify-between px-4 border-b border-black/[0.04]">
        <button
          onClick={() => navigateTo('landing')}
          className="flex items-center gap-2.5 text-left focus:outline-none group"
          title="Back to Landing Page"
        >
          <div className="w-6 h-6 rounded-md bg-[#18181B] flex items-center justify-center text-white text-[11px] font-semibold tracking-tight shadow-2xs group-hover:bg-[#2D44D8] transition-colors">
            K
          </div>
          {!sidebarCollapsed && (
            <div className="flex items-center gap-1.5">
              <span className="font-semibold tracking-tight text-[#18181B] text-[14px]">
                Kairo
              </span>
              <span className="text-[10px] text-slate-400 font-mono">
                v2.4
              </span>
            </div>
          )}
        </button>

        {!sidebarCollapsed && (
          <button
            onClick={toggleSidebar}
            className="w-6 h-6 flex items-center justify-center rounded text-slate-400 hover:text-slate-700 hover:bg-black/[0.04] transition-colors"
            title="Collapse Sidebar"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {sidebarCollapsed && (
        <div className="py-2 flex justify-center border-b border-black/[0.04]">
          <button
            onClick={toggleSidebar}
            className="w-6 h-6 flex items-center justify-center rounded text-slate-400 hover:text-slate-700 hover:bg-black/[0.04] transition-colors"
            title="Expand Sidebar"
          >
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Navigation List */}
      <div className="flex-1 py-3 px-2 space-y-0.5 overflow-y-auto">
        {mainNav.map(item => {
          const Icon = item.icon;
          const isActive = currentTab === item.tab;
          return (
            <button
              key={item.tab}
              onClick={() => navigateTo(item.tab)}
              className={`w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-md text-[13px] font-medium transition-colors group ${
                isActive
                  ? 'bg-black/[0.06] text-[#18181B]'
                  : 'text-[#52525B] hover:text-[#18181B] hover:bg-black/[0.03]'
              }`}
              title={sidebarCollapsed ? item.label : undefined}
            >
              <Icon
                className={`w-4 h-4 shrink-0 transition-colors ${
                  isActive ? 'text-[#18181B]' : 'text-slate-400 group-hover:text-slate-600'
                }`}
              />
              {!sidebarCollapsed && (
                <span className="truncate flex-1 text-left">{item.label}</span>
              )}
              {!sidebarCollapsed && item.badge && (
                <span
                  className={`text-[10px] font-mono px-1.5 py-0.2 rounded ${
                    isActive
                      ? 'bg-black/[0.08] text-slate-800'
                      : 'bg-black/[0.03] text-slate-500'
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}

        {/* Separator */}
        <div className="pt-2 my-2 border-t border-black/[0.04]" />

        {/* Settings */}
        <button
          onClick={() => navigateTo('settings')}
          className={`w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-md text-[13px] font-medium transition-colors group ${
            currentTab === 'settings'
              ? 'bg-black/[0.06] text-[#18181B]'
              : 'text-[#52525B] hover:text-[#18181B] hover:bg-black/[0.03]'
          }`}
          title={sidebarCollapsed ? 'Settings' : undefined}
        >
          <Settings
            className={`w-4 h-4 shrink-0 transition-colors ${
              currentTab === 'settings' ? 'text-[#18181B]' : 'text-slate-400 group-hover:text-slate-600'
            }`}
          />
          {!sidebarCollapsed && (
            <span className="truncate flex-1 text-left">Settings</span>
          )}
        </button>
      </div>

      {/* Bottom Profile / Operational Workspace Status */}
      <div className="p-2 border-t border-black/[0.04]">
        <button
          onClick={() => navigateTo('settings')}
          className={`w-full flex items-center gap-2.5 p-2 rounded-md hover:bg-black/[0.03] transition-colors text-left ${
            sidebarCollapsed ? 'justify-center' : ''
          }`}
          title="Omansh Bhatnagar (Workspace Owner)"
        >
          <div className="w-7 h-7 rounded-full bg-slate-200 border border-black/[0.06] flex items-center justify-center text-slate-700 font-semibold text-[11px] shrink-0">
            OB
          </div>
          {!sidebarCollapsed && (
            <div className="flex flex-col min-w-0 flex-1">
              <span className="text-[12.5px] font-medium text-[#18181B] truncate">
                Omansh
              </span>
              <span className="text-[10.5px] text-slate-400 truncate flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                Live Studio
              </span>
            </div>
          )}
        </button>
      </div>
    </aside>
  );
};
