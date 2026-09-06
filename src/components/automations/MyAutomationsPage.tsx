import React, { useState } from 'react';
import { useAutomation } from '../../context/AutomationContext';
import { AutomationItem } from '../../types';
import {
  Boxes,
  Search,
  Plus,
  Play,
  Pause,
  Copy,
  Trash2,
  ExternalLink,
  Mail,
  FileText,
  FileSpreadsheet,
  Calendar,
  MessageSquare,
  Activity,
  Zap,
  Filter,
  MoreVertical,
} from 'lucide-react';

export const MyAutomationsPage: React.FC = () => {
  const {
    automations,
    toggleAutomationStatus,
    deleteAutomation,
    duplicateAutomation,
    navigateTo,
  } = useAutomation();

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'paused'>('all');
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);

  const filtered = automations.filter(auto => {
    const matchesSearch =
      auto.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      auto.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === 'all' || auto.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getAutoIcon = (iconName: string) => {
    switch (iconName) {
      case 'Mail':
        return <Mail className="w-4 h-4 text-blue-600" />;
      case 'FileText':
        return <FileText className="w-4 h-4 text-indigo-600" />;
      case 'FileSpreadsheet':
        return <FileSpreadsheet className="w-4 h-4 text-purple-600" />;
      case 'Calendar':
        return <Calendar className="w-4 h-4 text-emerald-600" />;
      case 'MessageSquare':
        return <MessageSquare className="w-4 h-4 text-teal-600" />;
      case 'Activity':
        return <Activity className="w-4 h-4 text-amber-600" />;
      default:
        return <Zap className="w-4 h-4 text-slate-600" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold tracking-wider uppercase bg-emerald-50 text-emerald-700 border border-emerald-200/60">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Active
          </span>
        );
      case 'paused':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold tracking-wider uppercase bg-amber-50 text-amber-700 border border-amber-200/60">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
            Paused
          </span>
        );
      case 'attention':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold tracking-wider uppercase bg-red-50 text-red-700 border border-red-200/60">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
            Attention
          </span>
        );
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-8 space-y-8 select-none">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-blue-50 text-[#2547D0] border border-blue-100 mb-1">
            <Boxes className="w-3 h-3 text-[#2547D0]" />
            <span>Active Deployments</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
            My Automations
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Manage your deployed workflows, schedules, and active listeners.
          </p>
        </div>

        <button
          onClick={() => navigateTo('create')}
          className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-[#2547D0] hover:bg-[#1D3BB5] rounded-control shadow-xs transition-colors self-start sm:self-auto"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Create Automation</span>
        </button>
      </div>

      {/* Filter and Search controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-1.5 bg-white p-1 rounded-control border border-black/[0.08] shadow-2xs">
          <button
            onClick={() => setStatusFilter('all')}
            className={`px-3 py-1 text-xs font-medium rounded transition-colors ${
              statusFilter === 'all'
                ? 'bg-slate-900 text-white'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            All ({automations.length})
          </button>
          <button
            onClick={() => setStatusFilter('active')}
            className={`px-3 py-1 text-xs font-medium rounded transition-colors ${
              statusFilter === 'active'
                ? 'bg-slate-900 text-white'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Active ({automations.filter(a => a.status === 'active').length})
          </button>
          <button
            onClick={() => setStatusFilter('paused')}
            className={`px-3 py-1 text-xs font-medium rounded transition-colors ${
              statusFilter === 'paused'
                ? 'bg-slate-900 text-white'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Paused ({automations.filter(a => a.status === 'paused').length})
          </button>
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Filter automations..."
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-white rounded-control border border-black/[0.08] focus:outline-none focus:border-[#2547D0] text-slate-800 placeholder:text-slate-400"
          />
        </div>
      </div>

      {/* Table / List Hybrid */}
      <div className="bg-white rounded-card border border-black/[0.07] shadow-subtle overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-[#FAFBFD] border-b border-black/[0.06] text-slate-500 font-semibold uppercase tracking-wider text-[10.5px]">
                <th className="py-3 px-4">Automation</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Last Run</th>
                <th className="py-3 px-4">Executions</th>
                <th className="py-3 px-4">Success Rate</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/[0.05]">
              {filtered.map(auto => (
                <tr
                  key={auto.id}
                  className="hover:bg-slate-50/70 transition-colors group"
                >
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-control bg-slate-100 flex items-center justify-center shrink-0">
                        {getAutoIcon(auto.icon)}
                      </div>
                      <div className="min-w-0">
                        <span
                          onClick={() => navigateTo('builder')}
                          className="font-semibold text-slate-900 group-hover:text-[#2547D0] cursor-pointer block truncate"
                        >
                          {auto.title}
                        </span>
                        <span className="text-[11px] text-slate-600 block truncate">
                          {auto.trigger}
                        </span>
                      </div>
                    </div>
                  </td>

                  <td className="py-4 px-4 whitespace-nowrap">
                    {getStatusBadge(auto.status)}
                  </td>

                  <td className="py-4 px-4 whitespace-nowrap text-slate-700 font-medium">
                    {auto.lastRun}
                  </td>

                  <td className="py-4 px-4 whitespace-nowrap text-slate-700 font-mono">
                    {auto.executions.toLocaleString()}
                  </td>

                  <td className="py-4 px-4 whitespace-nowrap">
                    <span className="font-semibold text-emerald-600">
                      {auto.successRate}
                    </span>
                  </td>

                  <td className="py-4 px-4 whitespace-nowrap text-right">
                    <div className="flex items-center justify-end gap-1 text-slate-500">
                      <button
                        onClick={() => toggleAutomationStatus(auto.id)}
                        className={`p-1.5 rounded hover:bg-slate-100 transition-colors ${
                          auto.status === 'active'
                            ? 'hover:text-amber-600'
                            : 'hover:text-emerald-600'
                        }`}
                        title={auto.status === 'active' ? 'Pause' : 'Resume'}
                      >
                        {auto.status === 'active' ? (
                          <Pause className="w-3.5 h-3.5" />
                        ) : (
                          <Play className="w-3.5 h-3.5" />
                        )}
                      </button>
                      <button
                        onClick={() => duplicateAutomation(auto.id)}
                        className="p-1.5 rounded hover:bg-slate-100 hover:text-slate-800 transition-colors"
                        title="Duplicate"
                      >
                        <Copy className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => navigateTo('builder')}
                        className="p-1.5 rounded hover:bg-slate-100 hover:text-[#2547D0] transition-colors"
                        title="Open in Canvas"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => setDeleteTargetId(auto.id)}
                        className="p-1.5 rounded hover:bg-slate-100 hover:text-red-600 transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteTargetId && (
        <div className="fixed inset-0 z-50 bg-slate-900/20 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-sm bg-white rounded-panel p-6 border border-black/[0.08] shadow-float text-left space-y-4">
            <h3 className="text-base font-bold text-slate-900">
              Delete Automation?
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              This will permanently stop active listeners and remove this workflow from your cloud schedule.
            </p>
            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setDeleteTargetId(null)}
                className="px-3 py-1.5 text-xs text-slate-600 hover:bg-slate-100 rounded-control transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  deleteAutomation(deleteTargetId);
                  setDeleteTargetId(null);
                }}
                className="px-3 py-1.5 text-xs font-semibold text-white bg-red-600 hover:bg-red-700 rounded-control shadow-xs transition-colors"
              >
                Delete Workflow
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
