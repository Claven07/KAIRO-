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
  ShieldCheck,
  Cpu,
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
        return <Mail className="w-3.5 h-3.5 text-accent" />;
      case 'FileText':
        return <FileText className="w-3.5 h-3.5 text-slate-600" />;
      case 'FileSpreadsheet':
        return <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-600" />;
      case 'Calendar':
        return <Calendar className="w-3.5 h-3.5 text-amber-600" />;
      case 'MessageSquare':
        return <MessageSquare className="w-3.5 h-3.5 text-indigo-600" />;
      case 'Activity':
        return <Activity className="w-3.5 h-3.5 text-cyan-600" />;
      default:
        return <Zap className="w-3.5 h-3.5 text-slate-600" />;
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-black/[0.06] pb-5">
        <div>
          <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-slate-400">
            <span>REGISTRY</span>
            {/* <span>·</span>
            <span className="text-status-success flex items-center gap-1">
              <ShieldCheck className="w-3 h-3" />
              AIR-GAPPED COMPLIANT
            </span> */}
          </div>
          <h1 className="text-xl sm:text-2xl font-semibold tracking-tight text-graphite mt-1">
            Deployed Missions & Routines
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Sovereign agentic pipelines operating inside isolated enclave clusters.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-white rounded-md border border-black/[0.06] shadow-2xs font-mono text-xs text-slate-500">
            <Cpu className="w-3.5 h-3.5 text-accent" />
            <span>NODE-01 LOAD: 18.4%</span>
          </div>
          <button
            onClick={() => navigateTo('create')}
            className="pressable inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium text-white bg-graphite hover:bg-accent rounded-md shadow-2xs transition-all self-start sm:self-auto"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>New Mission</span>
          </button>
        </div>
      </div>

      {/* Filter and Search controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-1 bg-black/[0.03] p-1 rounded-md border border-black/[0.05]">
          <button
            onClick={() => setStatusFilter('all')}
            className={`pressable px-3 py-1 text-xs font-medium rounded transition-colors ${
              statusFilter === 'all'
                ? 'bg-white text-graphite shadow-2xs'
                : 'text-slate-500 hover:text-graphite'
            }`}
          >
            All <span className="text-[10px] font-mono text-slate-400 ml-1">[{automations.length}]</span>
          </button>
          <button
            onClick={() => setStatusFilter('active')}
            className={`pressable px-3 py-1 text-xs font-medium rounded transition-colors ${
              statusFilter === 'active'
                ? 'bg-white text-graphite shadow-2xs'
                : 'text-slate-500 hover:text-graphite'
            }`}
          >
            Active <span className="text-[10px] font-mono text-status-success ml-1">[{automations.filter(a => a.status === 'active').length}]</span>
          </button>
          <button
            onClick={() => setStatusFilter('paused')}
            className={`pressable px-3 py-1 text-xs font-medium rounded transition-colors ${
              statusFilter === 'paused'
                ? 'bg-white text-graphite shadow-2xs'
                : 'text-slate-500 hover:text-graphite'
            }`}
          >
            Paused <span className="text-[10px] font-mono text-slate-400 ml-1">[{automations.filter(a => a.status === 'paused').length}]</span>
          </button>
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search mission protocols..."
            className="w-full pl-8 pr-3 py-1.5 text-xs bg-white rounded-md border border-black/[0.08] focus:outline-none focus:border-accent text-graphite placeholder:text-slate-400 transition-colors font-mono"
          />
        </div>
      </div>

      {/* Directory List Table */}
      <div className="bg-white rounded-lg border border-black/[0.07] shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-black/[0.06] text-slate-400 font-mono text-[10.5px] uppercase tracking-wider bg-[#FAF9F7]">
                <th className="py-2.5 px-4 font-normal">Mission Protocol</th>
                <th className="py-2.5 px-4 font-normal">Runtime Status</th>
                <th className="py-2.5 px-4 font-normal">Last Executed</th>
                <th className="py-2.5 px-4 font-normal">Total Runs</th>
                <th className="py-2.5 px-4 font-normal">Integrity / SLA</th>
                <th className="py-2.5 px-4 font-normal text-right">Controls</th>
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
                      <div className="w-7 h-7 rounded bg-[#FAF9F7] border border-black/[0.06] flex items-center justify-center shrink-0">
                        {getAutoIcon(auto.icon)}
                      </div>
                      <div className="min-w-0">
                        <button
                          onClick={() => navigateTo('builder')}
                          className="font-medium text-graphite hover:text-accent text-left block truncate transition-colors"
                        >
                          {auto.title}
                        </button>
                        <span className="text-[11px] text-slate-400 font-mono block truncate">
                          {auto.trigger}
                        </span>
                      </div>
                    </div>
                  </td>

                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <div className="inline-flex items-center gap-1.5 text-xs font-mono">
                      {auto.status === 'active' ? (
                        <>
                          <span className="w-1.5 h-1.5 rounded-full bg-status-success animate-pulse" />
                          <span className="text-status-success font-medium">RUNNING</span>
                        </>
                      ) : auto.status === 'paused' ? (
                        <>
                          <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                          <span className="text-slate-500">PAUSED</span>
                        </>
                      ) : (
                        <>
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                          <span className="text-amber-700">ATTENTION</span>
                        </>
                      )}
                    </div>
                  </td>

                  <td className="py-3.5 px-4 whitespace-nowrap text-slate-500 font-mono text-[11px]">
                    {auto.lastRun}
                  </td>

                  <td className="py-3.5 px-4 whitespace-nowrap text-graphite font-mono text-[11px] font-medium">
                    {auto.executions.toLocaleString()}
                  </td>

                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <span className="font-mono text-[11px] text-graphite font-semibold">
                      {auto.successRate}
                    </span>
                  </td>

                  <td className="py-3.5 px-4 whitespace-nowrap text-right">
                    <div className="flex items-center justify-end gap-1 text-slate-400">
                      <button
                        onClick={() => toggleAutomationStatus(auto.id)}
                        className={`pressable p-1.5 rounded hover:bg-black/[0.05] transition-colors ${
                          auto.status === 'active'
                            ? 'hover:text-amber-600'
                            : 'hover:text-status-success'
                        }`}
                        title={auto.status === 'active' ? 'Pause routine' : 'Resume routine'}
                      >
                        {auto.status === 'active' ? (
                          <Pause className="w-3.5 h-3.5" />
                        ) : (
                          <Play className="w-3.5 h-3.5" />
                        )}
                      </button>
                      <button
                        onClick={() => duplicateAutomation(auto.id)}
                        className="pressable p-1.5 rounded hover:bg-black/[0.05] hover:text-graphite transition-colors"
                        title="Duplicate workflow"
                      >
                        <Copy className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => navigateTo('builder')}
                        className="pressable p-1.5 rounded hover:bg-black/[0.05] hover:text-accent transition-colors"
                        title="Inspect in canvas"
                      >
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => setDeleteTargetId(auto.id)}
                        className="pressable p-1.5 rounded hover:bg-black/[0.05] hover:text-red-600 transition-colors"
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
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-sm bg-white rounded-lg p-6 border border-black/[0.08] shadow-float text-left space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <h3 className="text-sm font-semibold text-graphite uppercase tracking-wide font-mono">
              Decommission Mission?
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              This will permanently dismantle listeners and revoke on-premise execution privileges for this workflow. This action is auditable and permanent.
            </p>
            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setDeleteTargetId(null)}
                className="pressable px-3 py-1.5 text-xs text-slate-600 hover:bg-black/[0.04] rounded transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  deleteAutomation(deleteTargetId);
                  setDeleteTargetId(null);
                }}
                className="pressable px-3 py-1.5 text-xs font-medium text-white bg-red-600 hover:bg-red-700 rounded shadow-2xs transition-colors"
              >
                Confirm Decommission
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
