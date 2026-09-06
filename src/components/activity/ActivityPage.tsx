import React, { useState } from 'react';
import { useAutomation } from '../../context/AutomationContext';
import { ActivityItem } from '../../types';
import {
  History,
  CheckCircle2,
  AlertTriangle,
  Clock,
  ChevronDown,
  ChevronUp,
  Cpu,
  ArrowRight,
  Filter,
} from 'lucide-react';

export const ActivityPage: React.FC = () => {
  const { activities } = useAutomation();
  const [filter, setFilter] = useState<'all' | 'success' | 'warning'>('all');
  const [expandedId, setExpandedId] = useState<string | null>('act-1');

  const filteredActivities = activities.filter(a => {
    if (filter === 'all') return true;
    return a.status === filter;
  });

  const toggleExpand = (id: string) => {
    setExpandedId(prev => (prev === id ? null : id));
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-8 space-y-8 select-none">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-blue-50 text-[#2547D0] border border-blue-100 mb-1">
            <History className="w-3 h-3 text-[#2547D0]" />
            <span>Audit Trail</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
            Live Activity
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Real-time execution log with input parameters and model reasoning traces.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1 bg-white p-1 rounded-control border border-black/[0.08] shadow-2xs self-start sm:self-auto">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1 text-xs font-medium rounded transition-colors ${
              filter === 'all'
                ? 'bg-slate-900 text-white'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            All Logs
          </button>
          <button
            onClick={() => setFilter('success')}
            className={`px-3 py-1 text-xs font-medium rounded transition-colors ${
              filter === 'success'
                ? 'bg-slate-900 text-white'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Successful
          </button>
          <button
            onClick={() => setFilter('warning')}
            className={`px-3 py-1 text-xs font-medium rounded transition-colors ${
              filter === 'warning'
                ? 'bg-slate-900 text-white'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Attention Needed
          </button>
        </div>
      </div>

      {/* Timeline List */}
      <div className="space-y-3">
        {filteredActivities.map((act, index) => {
          const isExpanded = expandedId === act.id;
          const isSuccess = act.status === 'success';

          return (
            <div
              key={act.id}
              className="bg-white rounded-card border border-black/[0.07] shadow-subtle overflow-hidden transition-all"
            >
              {/* Timeline Row Header */}
              <div
                onClick={() => toggleExpand(act.id)}
                className="p-4 sm:p-5 flex items-start justify-between gap-4 cursor-pointer hover:bg-slate-50/70 transition-colors"
              >
                <div className="flex items-start gap-3.5">
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                      isSuccess
                        ? 'bg-emerald-50 text-emerald-600 border border-emerald-200/60'
                        : 'bg-amber-50 text-amber-600 border border-amber-200/60'
                    }`}
                  >
                    {isSuccess ? (
                      <CheckCircle2 className="w-4 h-4" />
                    ) : (
                      <AlertTriangle className="w-4 h-4" />
                    )}
                  </div>

                  <div className="min-w-0">
                    <h4 className="text-sm font-semibold text-slate-900 leading-snug">
                      {act.title}
                    </h4>
                    <div className="flex items-center gap-2 mt-1 text-xs text-slate-600">
                      <span className="font-medium text-slate-700">
                        {act.workflowName}
                      </span>
                      <span>·</span>
                      <span>{act.timestamp}</span>
                      <span>·</span>
                      <span className="font-mono text-[11px] text-slate-600">
                        {act.duration}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-slate-600 shrink-0">
                  <span className="text-[11px] font-medium hidden sm:inline">
                    {isExpanded ? 'Hide Trace' : 'Inspect'}
                  </span>
                  {isExpanded ? (
                    <ChevronUp className="w-4 h-4" />
                  ) : (
                    <ChevronDown className="w-4 h-4" />
                  )}
                </div>
              </div>

              {/* Expandable Deep Inspection Panel */}
              {isExpanded && (
                <div className="p-5 bg-[#FAFBFD] border-t border-black/[0.05] space-y-4 text-xs text-slate-700 animate-in fade-in duration-150">
                  {/* Event Trigger */}
                  <div>
                    <span className="text-[10.5px] font-semibold text-slate-600 uppercase tracking-wider block mb-1">
                      Event Source & Ingest
                    </span>
                    <p className="p-2.5 bg-white rounded-control border border-black/[0.05] font-mono text-[11.5px] text-slate-800">
                      {act.triggerEvent}
                    </p>
                  </div>

                  {/* AI Reasoning Chain */}
                  <div>
                    <span className="text-[10.5px] font-semibold text-slate-600 uppercase tracking-wider block mb-1">
                      Neural Inference & Decision Logic
                    </span>
                    <p className="p-2.5 bg-white rounded-control border border-black/[0.05] text-slate-800 leading-relaxed">
                      {act.reasoningSummary}
                    </p>
                  </div>

                  {/* Output Delivery */}
                  <div>
                    <span className="text-[10.5px] font-semibold text-slate-600 uppercase tracking-wider block mb-1">
                      Action Dispatch
                    </span>
                    <p className="p-2.5 bg-white rounded-control border border-black/[0.05] text-slate-800">
                      {act.payloadSummary}
                    </p>
                  </div>

                  {/* Metadata line */}
                  <div className="flex items-center justify-between pt-2 border-t border-black/[0.04] text-[11px] text-slate-600">
                    <span>Processed: {act.dataProcessed}</span>
                    <span className="font-mono text-emerald-700">Checksum 0x4f92 Verified</span>
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
