import React, { useState } from 'react';
import { useAutomation } from '../../context/AutomationContext';
import {
  CheckCircle2,
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  ShieldCheck,
  Activity as ActivityIcon,
  Search,
} from 'lucide-react';

export const ActivityPage: React.FC = () => {
  const { activities } = useAutomation();
  const [filter, setFilter] = useState<'all' | 'success' | 'warning'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedId, setExpandedId] = useState<string | null>('act-1');

  const filteredActivities = activities.filter(a => {
    const matchesFilter = filter === 'all' || a.status === filter;
    const matchesSearch =
      a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.workflowName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const toggleExpand = (id: string) => {
    setExpandedId(prev => (prev === id ? null : id));
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-8 space-y-6 select-none">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-black/[0.06] pb-5">
        <div>
          <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-slate-400">
            <span>AUDIT TRAIL // 監査ログ</span>
            <span>·</span>
            <span className="text-status-success flex items-center gap-1">
              <ShieldCheck className="w-3 h-3" />
              CONFIDENTIAL LEDGER
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-semibold tracking-tight text-graphite mt-1">
            Enclave Execution Audit Log
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Cryptographic audit trail of autonomous mission runs, reasoning traces, and air gapped dispatches.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1 bg-black/[0.03] p-1 rounded-md border border-black/[0.05] self-start sm:self-auto font-mono text-xs">
          <button
            onClick={() => setFilter('all')}
            className={`pressable px-3 py-1 font-medium rounded transition-colors ${
              filter === 'all'
                ? 'bg-white text-graphite shadow-2xs'
                : 'text-slate-500 hover:text-graphite'
            }`}
          >
            All <span className="text-[10px] text-slate-400 ml-1">[{activities.length}]</span>
          </button>
          <button
            onClick={() => setFilter('success')}
            className={`pressable px-3 py-1 font-medium rounded transition-colors ${
              filter === 'success'
                ? 'bg-white text-graphite shadow-2xs'
                : 'text-slate-500 hover:text-graphite'
            }`}
          >
            Verified
          </button>
          <button
            onClick={() => setFilter('warning')}
            className={`pressable px-3 py-1 font-medium rounded transition-colors ${
              filter === 'warning'
                ? 'bg-white text-graphite shadow-2xs'
                : 'text-slate-500 hover:text-graphite'
            }`}
          >
            Attention
          </button>
        </div>
      </div>

      {/* Search Input */}
      <div className="relative">
        <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
        <input
          type="text"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          placeholder="Filter audit entries by mission or trigger signature..."
          className="w-full pl-8 pr-3 py-2 text-xs bg-white rounded-md border border-black/[0.08] focus:outline-none focus:border-accent text-graphite placeholder:text-slate-400 transition-colors font-mono"
        />
      </div>

      {/* Activity Timeline List */}
      <div className="space-y-3">
        {filteredActivities.map((act) => {
          const isExpanded = expandedId === act.id;
          const isSuccess = act.status === 'success';

          return (
            <div
              key={act.id}
              className="bg-white rounded-lg border border-black/[0.07] shadow-card overflow-hidden transition-all"
            >
              {/* Row Header */}
              <div
                onClick={() => toggleExpand(act.id)}
                className="p-4 sm:p-4.5 flex items-start justify-between gap-4 cursor-pointer hover:bg-black/[0.015] transition-colors"
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`w-6 h-6 rounded flex items-center justify-center shrink-0 mt-0.5 ${
                      isSuccess
                        ? 'bg-emerald-50 text-status-success border border-emerald-200/60'
                        : 'bg-amber-50 text-amber-600 border border-amber-200/60'
                    }`}
                  >
                    {isSuccess ? (
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    ) : (
                      <AlertTriangle className="w-3.5 h-3.5" />
                    )}
                  </div>

                  <div className="min-w-0">
                    <h4 className="text-xs sm:text-sm font-semibold text-graphite leading-snug">
                      {act.title}
                    </h4>
                    <div className="flex flex-wrap items-center gap-2 mt-1 text-[11px] text-slate-500 font-mono">
                      <span className="font-medium text-slate-700">
                        {act.workflowName}
                      </span>
                      <span>·</span>
                      <span>{act.timestamp}</span>
                      <span>·</span>
                      <span className="flex items-center gap-1 text-slate-600">
                        <ActivityIcon className="w-3 h-3 text-status-success" />
                        {act.duration}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 text-slate-400 shrink-0 font-mono text-[10.5px]">
                  <span className="hidden sm:inline">
                    {isExpanded ? 'COLLAPSE' : 'INSPECT TRACE'}
                  </span>
                  {isExpanded ? (
                    <ChevronUp className="w-3.5 h-3.5" />
                  ) : (
                    <ChevronDown className="w-3.5 h-3.5" />
                  )}
                </div>
              </div>

              {/* Expandable Trace Panel */}
              {isExpanded && (
                <div className="p-4 sm:p-5 bg-[#FAF9F7]/90 border-t border-black/[0.05] space-y-3 text-xs text-slate-600">
                  {/* Event Trigger */}
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block mb-1">
                      01 // Ingestion Event Signature
                    </span>
                    <div className="p-3 bg-white rounded border border-black/[0.06] font-mono text-[11px] text-graphite leading-relaxed">
                      {act.triggerEvent}
                    </div>
                  </div>

                  {/* AI Reasoning Chain */}
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block mb-1">
                      02 // Enclave Neural Reasoning & Verification
                    </span>
                    <div className="p-3 bg-white rounded border border-black/[0.06] text-graphite leading-relaxed text-xs">
                      {act.reasoningSummary}
                    </div>
                  </div>

                  {/* Action Dispatch */}
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block mb-1">
                      03 // Verified Action Dispatch Payload
                    </span>
                    <div className="p-3 bg-white rounded border border-black/[0.06] font-mono text-[11px] text-graphite">
                      {act.payloadSummary}
                    </div>
                  </div>

                  {/* Footer metadata */}
                  <div className="flex items-center justify-between pt-2 border-t border-black/[0.04] text-[10.5px] font-mono text-slate-400">
                    <span>PAYLOAD SIZE: {act.dataProcessed}</span>
                    <span className="text-slate-600 flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3 text-status-success" />
                      ENCLAVE SIG: SHA-256:0x4f92e718 · AUDIT PASS
                    </span>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
