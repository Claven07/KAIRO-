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
} from 'lucide-react';

interface NavItem {
  tab: NavigationTab;
  label: string;
  jpLabel: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
  shortcut?: string;
}

export const Sidebar: React.FC = () => {
  const { currentTab, navigateTo, automations, sidebarCollapsed, toggleSidebar } = useAutomation();

  const activeCount = automations.filter(a => a.status === 'active').length;

  const mainNav: NavItem[] = [
    { tab: 'overview', label: 'Overview', jpLabel: '概観', icon: LayoutDashboard, shortcut: '1' },
    { tab: 'automations', label: 'Automations', jpLabel: '自動化', icon: Boxes, badge: `${activeCount}`, shortcut: '2' },
    { tab: 'create', label: 'Composer', jpLabel: '作成', icon: Sparkles, shortcut: '3' },
    { tab: 'builder', label: 'Canvas', jpLabel: '設計図', icon: GitBranch, shortcut: '4' },
    { tab: 'library', label: 'Blueprints', jpLabel: '文庫', icon: BookOpen, shortcut: '5' },
    { tab: 'analytics', label: 'Telemetry', jpLabel: '分析', icon: BarChart3, shortcut: '6' },
    { tab: 'activity', label: 'Audit Trail', jpLabel: '履歴', icon: History, shortcut: '7' },
  ];

  return (
    <aside
      className={`relative flex flex-col border-r border-black/[0.07] bg-[#FAF9F7] transition-[width] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] z-20 select-none ${
        sidebarCollapsed ? 'w-[60px]' : 'w-[230px]'
      }`}
    >
      {/* Brand Header */}
      <div className="h-14 flex items-center justify-between px-3.5 border-b border-black/[0.06] bg-[#FAF9F7]">
        <button
          onClick={() => navigateTo('landing')}
          className="flex items-center gap-2.5 text-left focus:outline-none group pressable"
          title="KAIRO (カイロ) — Landing"
        >
          <div className="w-6 h-6 rounded bg-[#121316] flex items-center justify-center text-white text-[11px] font-mono font-semibold tracking-tighter shadow-2xs group-hover:bg-[#1D4ED8] transition-colors">
            K
          </div>
          {!sidebarCollapsed && (
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="font-semibold tracking-tight text-[#121316] text-[13.5px]">
                  KAIRO
                </span>
                <span className="text-[10px] text-slate-400 font-normal tracking-wide">
                  カイロ
                </span>
              </div>
              <span className="text-[9px] text-slate-400 font-mono tracking-wider uppercase -mt-0.5">
                ARASAKA · SIH26117
              </span>
            </div>
          )}
        </button>

        {!sidebarCollapsed && (
          <button
            onClick={toggleSidebar}
            className="w-6 h-6 flex items-center justify-center rounded text-slate-400 hover:text-slate-800 hover:bg-black/[0.04] transition-colors pressable"
            title="Collapse Sidebar"
            aria-label="Collapse Sidebar"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {sidebarCollapsed && (
        <div className="py-2 flex justify-center border-b border-black/[0.05]">
          <button
            onClick={toggleSidebar}
            className="w-6 h-6 flex items-center justify-center rounded text-slate-400 hover:text-slate-800 hover:bg-black/[0.04] transition-colors pressable"
            title="Expand Sidebar"
            aria-label="Expand Sidebar"
          >
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Navigation List */}
      <div className="flex-1 py-2.5 px-2 space-y-0.5 overflow-y-auto">
        <div className="px-2 py-1 mb-0.5">
          {!sidebarCollapsed ? (
            <span className="text-[10px] font-mono tracking-wider uppercase text-slate-400 font-medium">
              Command Node
            </span>
          ) : (
            <div className="w-4 h-0.5 bg-black/[0.08] mx-auto rounded-full" />
          )}
        </div>

        {mainNav.map(item => {
          const Icon = item.icon;
          const isActive = currentTab === item.tab;
          return (
            <button
              key={item.tab}
              onClick={() => navigateTo(item.tab)}
              className={`w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-control text-[12.5px] font-medium transition-colors group pressable relative ${
                isActive
                  ? 'bg-[#121316] text-white shadow-2xs'
                  : 'text-slate-600 hover:text-[#121316] hover:bg-black/[0.035]'
              }`}
              title={sidebarCollapsed ? `${item.label} (${item.jpLabel})` : undefined}
            >
              <Icon
                className={`w-4 h-4 shrink-0 transition-colors ${
                  isActive ? 'text-white' : 'text-slate-400 group-hover:text-slate-700'
                }`}
              />
              {!sidebarCollapsed && (
                <div className="flex-1 flex items-center justify-between min-w-0">
                  <span className="truncate text-left">{item.label}</span>
                  <div className="flex items-center gap-1.5 ml-2">
                    {item.badge && (
                      <span
                        className={`text-[9.5px] font-mono px-1.5 py-0.2 rounded ${
                          isActive
                            ? 'bg-white/15 text-white'
                            : 'bg-black/[0.04] text-slate-500'
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </div>
                </div>
              )}
            </button>
          );
        })}

        {/* Separator */}
        <div className="pt-2 my-2 border-t border-black/[0.05]" />

        {/* Settings */}
        <button
          onClick={() => navigateTo('settings')}
          className={`w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-control text-[12.5px] font-medium transition-colors group pressable ${
            currentTab === 'settings'
              ? 'bg-[#121316] text-white shadow-2xs'
              : 'text-slate-600 hover:text-[#121316] hover:bg-black/[0.035]'
          }`}
          title={sidebarCollapsed ? 'Settings / Config' : undefined}
        >
          <Settings
            className={`w-4 h-4 shrink-0 transition-colors ${
              currentTab === 'settings' ? 'text-white' : 'text-slate-400 group-hover:text-slate-700'
            }`}
          />
          {!sidebarCollapsed && (
            <span className="truncate flex-1 text-left">Configuration</span>
          )}
        </button>
      </div>

      {/* Sovereign Node Telemetry Footer */}
      <div className="p-2.5 border-t border-black/[0.06] bg-[#FAF9F7]/95">
        {!sidebarCollapsed ? (
          <div className="p-2 rounded-control bg-white border border-black/[0.06] shadow-2xs space-y-1.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[10px] font-mono font-semibold tracking-tight text-slate-800">
                  AIR-GAPPED
                </span>
              </div>
              <span className="text-[9px] font-mono text-slate-400">
                0.4ms
              </span>
            </div>
            <div className="flex items-center justify-between text-[10px] text-slate-500 border-t border-black/[0.04] pt-1">
              <span className="truncate font-medium text-slate-700">Omansh // OP-01</span>
              <span className="font-mono text-[9px] text-[#1D4ED8]">SIH-PROD</span>
            </div>
          </div>
        ) : (
          <div className="flex justify-center py-1" title="Air-Gapped Sovereign Node: Online (0.4ms latency)">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
          </div>
        )}
      </div>
    </aside>
  );
};
