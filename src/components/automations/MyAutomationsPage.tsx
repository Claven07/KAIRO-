import React, { useState } from 'react';
import { useAutomation } from '../../context/AutomationContext';
import {
  Search,
  Plus,
  Play,
  Pause,
  Copy,
  Trash2,
  ArrowUpRight,
  Mail,
  FileText,
  FileSpreadsheet,
  Calendar,
  MessageSquare,
  Activity,
  Zap,
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
        return <Mail className="w-4 h-4 text-[#2D44D8]" />;
      case 'FileText':
        return <FileText className="w-4 h-4 text-[#52525B]" />;
      case 'FileSpreadsheet':
        return <FileSpreadsheet className="w-4 h-4 text-[#52525B]" />;
      case 'Calendar':
        return <Calendar className="w-4 h-4 text-[#52525B]" />;
      case 'MessageSquare':
        return <MessageSquare className="w-4 h-4 text-[#52525B]" />;
      case 'Activity':
        return <Activity className="w-4 h-4 text-[#52525B]" />;
      default:
        return <Zap className="w-4 h-4 text-[#52525B]" />;
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-semibold tracking-tight text-[#18181B]">
            Automations
          </h1>
          <p className="text-xs sm:text-sm text-[#71717A] mt-0.5">
            Active workflows running across your tools, schedules, and triggers.
          </p>
        </div>

        <button
          onClick={() => navigateTo('create')}
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium text-white bg-[#18181B] hover:bg-[#27272A] rounded-lg shadow-sm transition-all active:scale-[0.98] self-start sm:self-auto"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>New automation</span>
        </button>
      </div>

      {/* Filter and Search controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-2">
        <div className="flex items-center gap-1 bg-black/[0.03] p-1 rounded-lg border border-black/[0.05]">
          <button
            onClick={() => setStatusFilter('all')}
            className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors ${
              statusFilter === 'all'
                ? 'bg-white text-[#18181B] shadow-2xs'
                : 'text-[#71717A] hover:text-[#18181B]'
            }`}
          >
            All <span className="text-[11px] text-[#A1A1AA] ml-1">{automations.length}</span>
          </button>
          <button
            onClick={() => setStatusFilter('active')}
            className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors ${
              statusFilter === 'active'
                ? 'bg-white text-[#18181B] shadow-2xs'
                : 'text-[#71717A] hover:text-[#18181B]'
            }`}
          >
            Active <span className="text-[11px] text-[#A1A1AA] ml-1">{automations.filter(a => a.status === 'active').length}</span>
          </button>
          <button
            onClick={() => setStatusFilter('paused')}
            className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors ${
              statusFilter === 'paused'
                ? 'bg-white text-[#18181B] shadow-2xs'
                : 'text-[#71717A] hover:text-[#18181B]'
            }`}
          >
            Paused <span className="text-[11px] text-[#A1A1AA] ml-1">{automations.filter(a => a.status === 'paused').length}</span>
          </button>
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="w-3.5 h-3.5 text-[#A1A1AA] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search workflows..."
            className="w-full pl-8 pr-3 py-1.5 text-xs bg-white rounded-lg border border-black/[0.08] focus:outline-none focus:border-black/[0.2] text-[#18181B] placeholder:text-[#A1A1AA] transition-colors"
          />
        </div>
      </div>

      {/* Directory List Table */}
      <div className="bg-white rounded-xl border border-black/[0.07] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-black/[0.05] text-[#71717A] font-medium text-[11px] bg-[#FAF9F7]/50">
                <th className="py-2.5 px-4 font-medium">Workflow</th>
                <th className="py-2.5 px-4 font-medium">Status</th>
                <th className="py-2.5 px-4 font-medium">Last run</th>
                <th className="py-2.5 px-4 font-medium">Executions</th>
                <th className="py-2.5 px-4 font-medium">Success</th>
                <th className="py-2.5 px-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/[0.04]">
              {filtered.map(auto => (
                <tr
                  key={auto.id}
                  className="hover:bg-black/[0.015] transition-colors group"
                >
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-7 h-7 rounded-md bg-[#FAF9F7] border border-black/[0.05] flex items-center justify-center shrink-0">
                        {getAutoIcon(auto.icon)}
                      </div>
                      <div className="min-w-0">
                        <button
                          onClick={() => navigateTo('builder')}
                          className="font-medium text-[#18181B] hover:text-[#2D44D8] text-left block truncate transition-colors"
                        >
                          {auto.title}
                        </button>
                        <span className="text-[11px] text-[#71717A] block truncate">
                          {auto.trigger}
                        </span>
                      </div>
                    </div>
                  </td>

                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <div className="inline-flex items-center gap-1.5 text-xs text-[#52525B]">
                      {auto.status === 'active' ? (
                        <>
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                          <span>Active</span>
                        </>
                      ) : auto.status === 'paused' ? (
                        <>
                          <span className="w-1.5 h-1.5 rounded-full bg-[#A1A1AA]" />
                          <span>Paused</span>
                        </>
                      ) : (
                        <>
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                          <span>Needs attention</span>
                        </>
                      )}
                    </div>
                  </td>

                  <td className="py-3.5 px-4 whitespace-nowrap text-[#71717A] font-mono text-[11px]">
                    {auto.lastRun}
                  </td>

                  <td className="py-3.5 px-4 whitespace-nowrap text-[#18181B] font-mono text-[11px]">
                    {auto.executions.toLocaleString()}
                  </td>

                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <span className="font-mono text-[11px] text-[#18181B]">
                      {auto.successRate}
                    </span>
                  </td>

                  <td className="py-3.5 px-4 whitespace-nowrap text-right">
                    <div className="flex items-center justify-end gap-1 text-[#71717A]">
                      <button
                        onClick={() => toggleAutomationStatus(auto.id)}
                        className={`p-1.5 rounded hover:bg-black/[0.05] transition-colors ${
                          auto.status === 'active'
                            ? 'hover:text-amber-600'
                            : 'hover:text-emerald-600'
                        }`}
                        title={auto.status === 'active' ? 'Pause automation' : 'Resume automation'}
                      >
                        {auto.status === 'active' ? (
                          <Pause className="w-3.5 h-3.5" />
                        ) : (
                          <Play className="w-3.5 h-3.5" />
                        )}
                      </button>
                      <button
                        onClick={() => duplicateAutomation(auto.id)}
                        className="p-1.5 rounded hover:bg-black/[0.05] hover:text-[#18181B] transition-colors"
                        title="Duplicate workflow"
                      >
                        <Copy className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => navigateTo('builder')}
                        className="p-1.5 rounded hover:bg-black/[0.05] hover:text-[#2D44D8] transition-colors"
                        title="Open in canvas"
                      >
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => setDeleteTargetId(auto.id)}
                        className="p-1.5 rounded hover:bg-black/[0.05] hover:text-red-600 transition-colors"
                        title="Delete workflow"
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
        <div className="fixed inset-0 z-50 bg-black/20 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-sm bg-white rounded-2xl p-6 border border-black/[0.08] shadow-xl text-left space-y-4">
            <h3 className="text-base font-semibold text-[#18181B]">
              Delete automation?
            </h3>
            <p className="text-xs text-[#71717A] leading-relaxed">
              This will permanently stop active listeners and remove this workflow from your cloud schedule. This action cannot be undone.
            </p>
            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setDeleteTargetId(null)}
                className="px-3 py-1.5 text-xs text-[#52525B] hover:bg-black/[0.04] rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  deleteAutomation(deleteTargetId);
                  setDeleteTargetId(null);
                }}
                className="px-3 py-1.5 text-xs font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg shadow-sm transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
